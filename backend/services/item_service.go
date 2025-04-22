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
