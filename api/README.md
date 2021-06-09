### Waypoints API

An api built with go, using [chi](https://github.com/go-chi/chi) for routing and [pgx](https://github.com/jackc/pgx) as the postgres database connector.

#### Requirements

To get started, you will need to make sure you have [golang](https://golang.org/doc/install) (>=v1.16), postgres and postgis. If you're on mac, you can use the [Postgres APP](https://postgresapp.com/), which has postgis built in by default.
You'll also need the [golang-migrate](https://github.com/golang-migrate) library which is used to create the base table schemas.

Alternatively, you can just run `docker-compose up` in the root of the repository, which will use the Dockerfiles to make sure everything is installed in your containers.

#### Local setup

```
go mod download

migrate -database ${DB_URI} -path db/migrations up

go build
./main
```

#### Code generation

The server code and data types are directly generated from the OpenAPI definitions, using the [oapi-codegen](https://github.com/deepmap/oapi-codegen) library. To regenerate the server, you will need to run the following command:

```
oapi-codegen -config ./config.yml ../http.yml
```
