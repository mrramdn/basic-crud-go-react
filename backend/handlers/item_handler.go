package handlers

import (
	"encoding/json"
	"net/http"
	"backend/config"
	"backend/repositories"
	"backend/services"
	"backend/models"
	"github.com/go-chi/chi/v5"
)

var itemService *services.ItemService

func RegisterRoutes(r chi.Router) {
	db, err := config.ConnectDB()
	if err != nil {
		panic(err)
	}
	db.AutoMigrate(&models.Item{})
	repo := repositories.NewItemRepository(db)
	itemService = services.NewItemService(repo)

	r.Route("/api/items", func(r chi.Router) {
		r.Get("/", GetAllItems)
		r.Post("/", CreateItem)
	})
}

func GetAllItems(w http.ResponseWriter, r *http.Request) {
	items, err := itemService.GetAllItems()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to fetch items"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func CreateItem(w http.ResponseWriter, r *http.Request) {
	var item models.Item
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request body"))
		return
	}
	if err := itemService.CreateItem(&item); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to create item"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}
