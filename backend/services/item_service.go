package services

import (
	"backend/models"
	"backend/repositories"
)

type ItemService struct {
	repo *repositories.ItemRepository
}

func NewItemService(repo *repositories.ItemRepository) *ItemService {
	return &ItemService{repo: repo}
}

func (s *ItemService) GetAllItems() ([]models.Item, error) {
	return s.repo.GetAll()
}

func (s *ItemService) CreateItem(item *models.Item) error {
	return s.repo.Create(item)
}

func (s *ItemService) GetItemByID(id uint) (*models.Item, error) {
	return s.repo.GetByID(id)
}

func (s *ItemService) UpdateItem(id uint, updated *models.Item) error {
	return s.repo.Update(id, updated)
}

func (s *ItemService) DeleteItem(id uint) error {
	return s.repo.Delete(id)
}

