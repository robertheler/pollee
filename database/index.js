const { Pool, Client } = require("pg");

const pool = new Pool({
  //host: "ec2-3-221-234-184.compute-1.amazonaws.com",
  host: "localhost",
  database: "pollee",
  user: "postgres",
  password: "",
  port: 5432,
  prepared_statements: true,
  reconnect: true,
  prepare_threshold: 0,
  server_prepare_mode: "transaction"
});

//GET api/poll/:user
const getPoll = (by, callback) => {
  pool.query(`SELECT * FROM polls WHERE by = $1`, ["" + by], (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, res.rows);
    }
  });
};

//arrays should look like this "{This is answer number 1, This is answer number 2}"
//POST api/polls
const postPoll = (poll, callback) => {
  query = `INSERT INTO
            polls(by, question, answers, results)
          VALUES($1, $2, $3, $4)`;

  values = [poll.by, poll.question, poll.answers, "{0,0,0,0}"];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//api/polls/:id/:user/:vote
const patchPoll = (id, user, vote, callback) => {
  pool.query(`UPDATE polls SET results[$1] = results[$1] + 1, voters = array_cat(voters, $3) WHERE id = $2`,[vote, id, `{${user}}`])
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

//arrays should look like this "{This is answer number 1, This is answer number 2}"
//POST api/user
const postUsers = (user, callback) => {
  query = `INSERT INTO
            users(id, first, last, email, friends)
          VALUES($1, $2, $3, $4, $5)`;

  values = [user.id, user.first, user.last, user.email, user.friends];

  pool
    .query(query, values)
    .then(results => callback(null, results))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

module.exports.pool = pool;
module.exports.getPoll = getPoll;
module.exports.postPoll = postPoll;
module.exports.patchPoll = patchPoll;

module.exports.postUsers = postUsers;