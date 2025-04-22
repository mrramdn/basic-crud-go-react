package main

import (
	"backend/config"
	"backend/handlers"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {
	// Load env
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found or error loading .env")
	}

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
