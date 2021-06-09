package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
)

type Database struct {
	Conn *pgxpool.Pool
}

func Initialize(host, port, username, password, database string) (Database, error) {
	db := Database{}

	db_uri := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
		username, password, host, port, database)

	conn, err := pgxpool.Connect(context.Background(), db_uri)
	if err != nil {
		return db, err
	}
	db.Conn = conn
	err = db.Conn.Ping(context.Background())

	if err != nil {
		return db, err
	}
	log.Println("Database connection established")
	return db, nil
}
