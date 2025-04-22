package repositories

import (
	"gorm.io/gorm"
	"backend/models"
)

type ItemRepository struct {
	DB *gorm.DB
}

func NewItemRepository(db *gorm.DB) *ItemRepository {
	return &ItemRepository{DB: db}
}

func (r *ItemRepository) GetAll() ([]models.Item, error) {
	var items []models.Item
	err := r.DB.Find(&items).Error
	return items, err
}

func (r *ItemRepository) Create(item *models.Item) error {
	return r.DB.Create(item).Error
}
