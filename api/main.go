package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"

	middleware "github.com/deepmap/oapi-codegen/pkg/chi-middleware"
	api "github.com/vacuumdreams/waypoints/api"
	db "github.com/vacuumdreams/waypoints/db"
	server "github.com/vacuumdreams/waypoints/server"
)

func main() {
	swagger, err := api.GetSwagger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}

	swagger.Servers = nil

	var port = flag.Int("port", 8001, "Port for test HTTP server")
	flag.Parse()

	db_host, db_port, db_user, db_password, db_name :=
		os.Getenv("POSTGRES_HOST"),
		os.Getenv("POSTGRES_PORT"),
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB")

	database, err := db.Initialize(db_host, db_port, db_user, db_password, db_name)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error connecting to database\n: %s", err)
		os.Exit(1)
	}
	defer database.Conn.Close()

	// Create an instance of our handler which satisfies the generated interface
	s := server.NewStore(database)

	// This is how you set up a basic chi router
	r := chi.NewRouter()

	// Use our validation middleware to check all requests against the
	// OpenAPI schema.
	r.Use(middleware.OapiRequestValidator(swagger))

	r.Use(cors.Handler(cors.Options{
		// going to allow everything for now for simplicity
    AllowedOrigins:   []string{"https://*", "http://*"},
    AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
    AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
    AllowCredentials: false,
    MaxAge:           300,
  }))

	// We now register our server as the handler for the interface
	api.HandlerFromMux(s, r)

	waypoints_api := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", *port),
	}

	// And we serve HTTP until the world ends.
	log.Fatal(waypoints_api.ListenAndServe())
}
