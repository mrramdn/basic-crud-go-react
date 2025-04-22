package main

import (
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"

	"backend/config"
	"backend/handlers"
)

func main() {
	// Load env
	_ = godotenv.Load()

	// Setup router
	r := chi.NewRouter()
	r.Use(config.LoggingMiddleware, config.RecoveryMiddleware, config.CorsMiddleware)

	handlers.RegisterRoutes(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server running at :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
