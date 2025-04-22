package models

type Item struct {
	ID          uint   `gorm:"primaryKey" json:"id"`
	Name        string `json:"name"`
	Category    string `json:"category"`
	Stock       int    `json:"stock"`
	Description string `json:"description"`
}
