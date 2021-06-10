### Waypoints API

An api built with go, using [chi](https://github.com/go-chi/chi) for routing and [pgx](https://github.com/jackc/pgx) as the postgres database connector.

#### Requirements

To get started, you will need to make sure you have [golang](https://golang.org/doc/install) (>=v1.16), postgres. If you're on mac, you can use the [Postgres APP](https://postgresapp.com/).
You'll also need the [golang-migrate](https://github.com/golang-migrate) library which is used to create the base table schemas.

Alternatively, you can just run `docker-compose up` in the root of the repository, which will use the Dockerfiles to make sure everything is installed in your containers.

#### Local setup

You'll need a few environment variables before getting started:

```
POSTGRES_DB=waypoints
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DB_URI=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB?sslmode=disable
```

After that, you can run the following commands:

```
go mod download

migrate -database $DB_URI -path db/migrations up

go build
./main
```

#### Code generation

The server code and data types are directly generated from the OpenAPI definitions, using the [oapi-codegen](https://github.com/deepmap/oapi-codegen) library. To regenerate the server, you will need to run the following command:

```
oapi-codegen -config ./config.yml ../http.yml
```

###  Architecture

The api is very lightweight, and is structured in a very simple way. It has the generated code in the `api` folder, custom route handlers in the `server` folder, and the database connector in the `db` folder. The api exposes the endpoints defined in the [http.yml](../-/blob/main/http.yml) file:

- `GET /api/v1/waypoints/{user}`: returns all saved waypoints based on a user's id
- `PUT /api/v1/waypoints/{user}`: updates the order of a user's waypoints
- `POST /api/v1/waypoint/{user}`: creates a new waypoint for a  user
- `DELETE /api/v1/waypoint/{user}?id={id}`: deletes a waypoint of a user

*NOTE*: The api currently supports 10 waypoints per user.
