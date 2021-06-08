package db

import (
	"context"
	"fmt"
	"github.com/jackc/pgx/v4/pgxpool"
	"log"
)

const (
	HOST = "localhost"
	PORT = "5432"
)

type Database struct {
	Conn *pgxpool.Pool
}

func Initialize(username, password, database string) (Database, error) {
	db := Database{}

	db_uri := fmt.Sprintf("postgres://%s:%s@%s:%s/%s",
		username, password, HOST, PORT, database)

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
