const { Pool, Client } = require("pg");
const moment = require("moment"); // require
moment().format();
const each = require("async/each");

const pool = new Pool({
  host: "ec2-3-221-234-184.compute-1.amazonaws.com",
  //host: "postgres", // change from local to postgres for deploying
  database: "ratemyrestaurant",
  user: "postgres",
  password: "",
  port: 5432,
  prepared_statements: true,
  reconnect: true,
  prepare_threshold: 0,
  server_prepare_mode: "transaction"
});

//GET api/restaurants/:id
const getRestaurant = (id, callback) => {
  pool.query(`SELECT * FROM restaurants WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

//POST api/restaurants
const postRestaurant = (restaurant, callback) => {
  query = `INSERT INTO
            restaurants(name, address, phone, website, costrating, review, opens, closes, reservationslot)
          VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  values = [
    restaurant.name,
    restaurant.address,
    restaurant.phone,
    restaurant.website,
    restaurant.costrating,
    restaurant.review,
    restaurant.opens,
    restaurant.closes,
    restaurant.reservationslot
  ];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//DELETE api/restaurants/:id
const deleteRestaurant = (id, callback) => {
    pool.query(
      `DELETE FROM availability
                WHERE table_id IN (
                SELECT id FROM tables WHERE restaurant_id = ${id})`,
      (err, res) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          pool.query(
            `DELETE FROM tables WHERE restaurant_id = ${id}`,
            (err, res) => {
              if (err) {
                console.log(err);
                callback(err);
              } else {
                pool.query(
                  `DELETE FROM restaurants WHERE id = ${id}`,
                  (err, res) => {
                    if (err) {
                      console.log(err);
                      callback(err);
                    } else {
                      callback(null, res);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
};

//PATCH api/restaurants/:id
const patchRestaurant = (id, updates, callback) => {
  each(
    Object.keys(updates),
    function(update, resolve) {
      pool.query(
        `UPDATE restaurants SET ${update} = $1 WHERE id = $2`,
        [updates[update], id],
        (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve();
          }
        }
      );
    },
    function(err) {
      callback();
    }
  );
};

//GET api/tables/:id
const getTable = (id, callback) => {
  pool.query(`SELECT * FROM tables WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows[0]);
    }
  });
};

//POST api/tables
const postTable = (table, callback) => {
  query = `INSERT INTO tables(restaurant_id, capacity) VALUES($1, $2)`;

  values = [table.restaurant_id, table.capacity];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//DELETE api/table/:id
const deleteTable = (id, callback) => {
  pool.query(`DELETE FROM availability WHERE table_id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      pool.query(`DELETE FROM tables WHERE id = ${id}`, (err, res) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

//PATCH api/tables/:id
const patchTable = (id, updates, callback) => {
  each(
    Object.keys(updates),
    function(update, resolve) {
      pool.query(
        `UPDATE tables SET ${update} = $1 WHERE id = $2`,
        [updates[update], id],
        (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve();
          }
        }
      );
    },
    function(err) {
      callback();
    }
  );
};

//GET api/availability/:id
const getAvailability = (id, callback) => {
    pool.query(`SELECT * FROM availability WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        callback(null, res.rows[0]);
      }
    });
};

//POST api/availability
const postAvailability = (availability, callback) => {
    query = `INSERT INTO availability(table_id, date, times) VALUES($1, $2, $3)`;
    values = [availability.table_id, availability.date, availability.times];
    pool
      .query(query, values)
      .then(results => callback(null, results))
      .catch(err => {
        console.log(err);
        callback(err);
      });
};

//DELETE api/availability/:id
const deleteAvailability = (id, callback) => {
  pool.query(`DELETE FROM availability WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

//PATCH api/availability/:id
const patchAvailability = (id, updates, callback) => {
  each(
    Object.keys(updates),
    function(update, resolve) {
      pool.query(
        `UPDATE availability SET ${update} = $1 WHERE id = $2`,
        [updates[update], id],
        (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          } else {
            resolve();
          }
        }
      );
    },
    function(err) {
      callback();
    }
  );
};

//GET api/restaurants/:id
const getAllAvailability = (id, callback) => {
  pool.query(`SELECT name FROM restaurants WHERE id = ${id}`, (err, name) => {
    if (err) {
      callback(err);
    } else if (name.rows.length === 0) {
      callback(null, {});
    } else {
      pool.query(
        `SELECT * FROM availability INNER JOIN tables ON (availability.table_id = tables.id) WHERE tables.restaurant_id = ${id}`,
        (err, res) => {
          if (err) {
            callback(err);
          } else {
            let result = {
              id: id,
              name: name.rows[0].name,
              dates: {}
            };
            for (var i = 0; i < res.rows.length; i++) {
              let date = moment(res.rows[i].date).format("MM/DD/YYYY");
              if (!result.dates[date]) {
                result.dates[date] = [
                  {
                    id: res.rows[i].table_id,
                    capacity: res.rows[i].capacity,
                    times: res.rows[i].times
                  }
                ];
              } else {
                result.dates[date].push({
                  id: res.rows[i].table_id,
                  capacity: res.rows[i].capacity,
                  times: res.rows[i].times
                });
              }
            }
            callback(err, result);
          }
        }
      );
    }
  });
};


//GET /api/restaurants/:id/:date/:size
const getSpecificAvailability = (id, date, size, callback) => {
  // pool.query(`SELECT name FROM restaurants WHERE id = ${id}`, (err, name) => {
  // if (err) {
  //       callback(err);
  //     } else if (name.rows.length === 0) {
  //       callback(null, {});
  //     } else {
        pool.query(
          // `SELECT *
          //   FROM availability
          //   WHERE date::date = '${date}'
          //   AND
          //   table_id IN (SELECT id
          //                 FROM tables
          //                 WHERE restaurant_id = ${id}
          //                 AND capacity >= ${size})`,
          `SELECT *
            FROM availability INNER JOIN tables
            ON (availability.table_id = tables.id)
            WHERE tables.restaurant_id = ${id}
            AND tables.capacity >= ${size}
            AND availability.date::date = '${date}'`,
          (err, res) => {
            if (err) {
              callback(err);
            } else {
              let result = {
                id: id,
                //name: name.rows[0].name,
                date: date,
                tables: []
              };
              for (var i = 0; i < res.rows.length; i++) {
                result.tables.push({
                  id: res.rows[i].table_id,
                  capacity: res.rows[i].capacity,
                  times: res.rows[i].times
                });
              }
              callback(err, result);
            }
          }
        );

    // });
};

module.exports.pool = pool;
module.exports.getRestaurant = getRestaurant;
module.exports.postRestaurant = postRestaurant;
module.exports.deleteRestaurant = deleteRestaurant;
module.exports.patchRestaurant = patchRestaurant;

module.exports.getTable = getTable;
module.exports.postTable = postTable;
module.exports.deleteTable = deleteTable;
module.exports.patchTable = patchTable;

module.exports.getAvailability = getAvailability;
module.exports.postAvailability = postAvailability;
module.exports.deleteAvailability = deleteAvailability;
module.exports.patchAvailability = patchAvailability;

module.exports.getAllAvailability = getAllAvailability;
module.exports.getSpecificAvailability = getSpecificAvailability;
