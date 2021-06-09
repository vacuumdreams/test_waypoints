package migrations

import (
    "github.com/golang-migrate/migrate/v4"
    _ "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/github"
)

func main() {
  db_host, db_user, db_password, db_name :=
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB")

  db_uri := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
    username, password, host, PORT, database)

  m, err := migrate.New(
      "github.com/vacuumdreams/waypoints/db/migrations",
      db_uri)
    
  m.Steps(2)
}
