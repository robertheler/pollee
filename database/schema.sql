DROP DATABASE IF EXISTS ratemyrestaurant;
DROP DATABASE IF EXISTS pollee;

CREATE DATABASE pollee;

\c pollee;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS polls;


CREATE TABLE users(
   id BIGINT NOT NULL PRIMARY KEY,
   first VARCHAR(255) NOT NULL,
   last VARCHAR(255) NOT NULL,
   phone BIGINT CHECK (phone BETWEEN 1000000000 AND 9999999999) NOT NULL,
   email VARCHAR(255) NOT NULL,
   friends BIGINT[]
);

CREATE TABLE polls(
   id SERIAL PRIMARY KEY,
   user BIGINT NOT NULL,
   timestamp TIMESTAMP NOT NULL,
   question VARCHAR(255) NOT NULL,
   first_answer VARCHAR(255) NOT NULL,
   second_answer VARCHAR(255) NOT NULL,
   third_answer VARCHAR(255),
   fourth_answer VARCHAR(255),
   first_votes INTEGER DEFAULT 0,
   second_votes INTEGER DEFAULT 0,
   third_votes INTEGER DEFAULT 0,
   fourth_votes INTEGER DEFAULT 0,
   users BIGINT[]
);

COPY users (name, address, phone, website, costrating, review, opens, closes, reservationslot) FROM '/db/restaurants.csv' DELIMITER ',' CSV HEADER;

COPY polls (restaurant_id, capacity) FROM '/db/tables.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX ON users(id);
CREATE INDEX ON polls(id);
CREATE INDEX ON polls(user);
CREATE INDEX ON polls(timestamp);

ALTER TABLE polls
ADD CONSTRAINT polls_foreign FOREIGN KEY (user) REFERENCES users (id);
