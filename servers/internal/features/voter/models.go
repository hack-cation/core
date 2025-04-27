package voter

import (
	"github.com/google/uuid"
	"time"
)

type Campaign struct {
	Id        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	IsActive  bool      `json:"isActive"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

type Project struct {
	Id         uuid.UUID `json:"id"`
	CampaignId uuid.UUID `json:"campaignId"`
	Author     string    `json:"author"`
	Votes      int       `json:"votes"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}
