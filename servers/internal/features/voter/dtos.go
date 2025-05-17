package voter

import (
	"api.hackcation.dev/internal/validator"
	"github.com/google/uuid"
	"time"
)

type InsertVotesDto struct {
	ProjectIds []uuid.UUID `json:"projectIds"`
}

type InsertCampaignDto struct {
	Name      string    `json:"name"`
	IsActive  bool      `json:"isActive"`
	MaxVotes  int       `json:"maxVotes"`
	EventDate time.Time `json:"eventDate"`
}

func (dto InsertCampaignDto) Validate(v *validator.Validator) {
	v.Check(len(dto.Name) > 0, "name", "must be provided")
	v.Check(len(dto.Name) < 100, "name", "must be less than 100 characters")

}

func (dto InsertCampaignDto) ToCampaign(id uuid.UUID) Campaign {
	return Campaign{
		Id:        id,
		Name:      dto.Name,
		IsActive:  dto.IsActive,
		MaxVotes:  dto.MaxVotes,
		EventDate: dto.EventDate,
	}
}
