package migrations

import (
    "github.com/golang-migrate/migrate/v4"
    _ "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/github"
)

func main() {
  db_user, db_password, db_name :=
    os.Getenv("POSTGRES_USER"),
    os.Getenv("POSTGRES_PASSWORD"),
    os.Getenv("POSTGRES_DB")

  m, err := migrate.New(
      "github.com/vacuumdreams/waypoints/db/migrations",
      "postgres://localhost:5432/database?sslmode=enable")
  m.Steps(2)
}
