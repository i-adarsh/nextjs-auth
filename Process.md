## POST
curl -X POST -H "Content-Type: application/json" -d '{"name":"user1", "email":"test@iadarsh.in"}' http://localhost:3000/api/user
curl -X POST -H "Content-Type: application/json" -d '{"name":"user2", "email":"test2@iadarsh.in"}' http://localhost:3000/api/user
curl -X POST -H "Content-Type: application/json" -d '{"name":"user3", "email":"test3@iadarsh.in"}' http://localhost:3000/api/user

## GET

curl -X GET http://localhost:3000/api/user