DROP DATABASE IF EXISTS pollee;

CREATE DATABASE pollee;

\c pollee;
DROP TABLE IF EXISTS polls;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
   id VARCHAR(255) NOT NULL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255),
   friends VARCHAR(255)[]
);

CREATE TABLE polls(
   id SERIAL PRIMARY KEY,
   by VARCHAR(255) NOT NULL REFERENCES users(id),
   created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   question VARCHAR(255) NOT NULL,
   answers VARCHAR(255)[] NOT NULL,
   results INTEGER[],
   voters VARCHAR(255)[]
);

-- COPY users (id, first, last, phone, email, friends) FROM '/database/users.csv' DELIMITER ',' CSV HEADER;

-- COPY polls (by, timestamp, question, first_answer, second_answer, third_answe, fourth_answer, first_votes, second_votes, third_votes, fourth_votes, voters) FROM '/database/polls.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX ON users(id);
CREATE INDEX ON polls(id);
CREATE INDEX ON polls(by);
CREATE INDEX ON polls(created);

