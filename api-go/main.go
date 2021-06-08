package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"

  db "github.com/vacuumdreams/waypoints/db"
	api "github.com/vacuumdreams/waypoints/api"
	server "github.com/vacuumdreams/waypoints/server"
	middleware "github.com/deepmap/oapi-codegen/pkg/chi-middleware"
)

func main() {
	var port = flag.Int("port", 8080, "Port for test HTTP server")
	flag.Parse()

	swagger, err := api.GetSwagger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}

	// Clear out the servers array in the swagger spec, that skips validating
	// that server names match. We don't know how this thing will be run.
	swagger.Servers = nil

  db_user, db_password, db_name :=
      os.Getenv("DB_USER"),
      os.Getenv("DB_PASSWORD"),
      os.Getenv("DB")

  database, err := db.Initialize(db_user, db_password, db_name)
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

	// We now register our server as the handler for the interface
	api.HandlerFromMux(s, r)

	app := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", *port),
	}

	// And we serve HTTP until the world ends.
	log.Fatal(app.ListenAndServe())
}
