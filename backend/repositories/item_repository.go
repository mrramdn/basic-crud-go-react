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

func (r *ItemRepository) GetByID(id uint) (*models.Item, error) {
	var item models.Item
	err := r.DB.First(&item, id).Error
	if err != nil {
		return nil, err
	}
	return &item, nil
}

func (r *ItemRepository) Update(id uint, updated *models.Item) error {
	return r.DB.Model(&models.Item{}).Where("id = ?", id).Updates(updated).Error
}

func (r *ItemRepository) Delete(id uint) error {
	return r.DB.Delete(&models.Item{}, id).Error
}

