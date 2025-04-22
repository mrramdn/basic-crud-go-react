package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"backend/config"
	"backend/repositories"
	"backend/services"
	"backend/models"
	"github.com/go-chi/chi/v5"
)

var itemService *services.ItemService

func GetItemByID(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid ID"))
		return
	}
	item, err := itemService.GetItemByID(uint(id))
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Item not found"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

func UpdateItem(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid ID"))
		return
	}
	var updated models.Item
	if err := json.NewDecoder(r.Body).Decode(&updated); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request body"))
		return
	}
	if err := itemService.UpdateItem(uint(id), &updated); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to update item"))
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updated)
}

func DeleteItem(w http.ResponseWriter, r *http.Request) {
	idParam := chi.URLParam(r, "id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid ID"))
		return
	}
	err = itemService.DeleteItem(uint(id))
	if err != nil {
		logMsg := fmt.Sprintf("Failed to delete item with id %d: %v", id, err)
		fmt.Println(logMsg)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Failed to delete item: " + err.Error()))
		return
	}
	fmt.Printf("Deleted item with id %d\n", id)
	w.WriteHeader(http.StatusNoContent)
}

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
		r.Get("/{id}", GetItemByID)
		r.Put("/{id}", UpdateItem)
		r.Delete("/{id}", DeleteItem)
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
