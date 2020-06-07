# from the local terminal
docker exec -t -i reservations_postgres_1 /bin/bash

#from the container terminal
mkdir db
exit

#from the local terminal or the main docker-machiene teminal
docker cp /Users/robertheler/Desktop/Hack\ Reactor/SDC/reservations/database/data/availability1.csv reservations_postgres_1:/db

docker cp /Users/robertheler/Desktop/Hack\ Reactor/SDC/reservations/database/data/availability2.csv reservations_postgres_1:/db

docker cp /Users/robertheler/Desktop/Hack\ Reactor/SDC/reservations/database/data/restaurants.csv reservations_postgres_1:/db

docker cp /Users/robertheler/Desktop/Hack\ Reactor/SDC/reservations/database/data/tables.csv reservations_postgres_1:/db

docker cp /Users/robertheler/Desktop/Hack\ Reactor/SDC/reservations/database/postgres/schema-container.sql reservations_postgres_1:/db

#from the db folder inside the container
docker exec -t -i reservations_postgres_1 /bin/bash
psql -U postgres < schema-container.sql

#delete data after seeding
rm availability1.csv  availability2.csv  restaurants.csv tables.csv