package main

import (
	"strconv"
	"strings"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"

	middleware "github.com/deepmap/oapi-codegen/pkg/chi-middleware"
	api "github.com/vacuumdreams/waypoints/api"
	db "github.com/vacuumdreams/waypoints/db"
	server "github.com/vacuumdreams/waypoints/server"
)

func parseURL (url string) (int, string) {
	chunks := strings.Split(url, ":")
	chunks = strings.Split(chunks[2], "/")
	port, err := strconv.Atoi(chunks[0])

	if err  !=  nil {
		port =  8080
	}

	return port, "/" + strings.Join(chunks[1:], "/")
}

func main() {
	swagger, err := api.GetSwagger()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error loading swagger spec\n: %s", err)
		os.Exit(1)
	}

	port_number, base_url := parseURL(swagger.Servers[0].URL)

	var port = flag.Int("port", port_number, "Port for test HTTP server")
	flag.Parse()

	db_user, db_password, db_name :=
		os.Getenv("POSTGRES_USER"),
		os.Getenv("POSTGRES_PASSWORD"),
		os.Getenv("POSTGRES_DB")

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
	api.HandlerFromMuxWithBaseURL(s, r, base_url)

	waypoints_api := &http.Server{
		Handler: r,
		Addr:    fmt.Sprintf("0.0.0.0:%d", *port),
	}

	// And we serve HTTP until the world ends.
	log.Fatal(waypoints_api.ListenAndServe())
}
