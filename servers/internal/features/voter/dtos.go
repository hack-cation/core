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
	v.Check(dto.MaxVotes > 0, "maxVotes", "must be greater than 0")
	v.Check(dto.MaxVotes < 10, "maxVotes", "must be less than 10")
	v.Check(dto.EventDate.After(time.Now()), "eventDate", "must be in the future")
}

func (dto InsertCampaignDto) ToCampaign(id uuid.UUID) Campaign {
	return Campaign{
		Id:        id,
		Name:      dto.Name,
		IsActive:  dto.IsActive,
		MaxVotes:  dto.MaxVotes,
		EventDate: dto.EventDate,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

type InsertProjectDto struct {
	Author string `json:"author"`
	Name   string `json:"name"`
	GitUrl string `json:"gitUrl"`
}

func (dto InsertProjectDto) Validate(v *validator.Validator) {
	v.Check(len(dto.Name) > 0, "name", "must be provided")
	v.Check(len(dto.Name) <= 100, "name", "must be less than or equal to 100 characters")
	v.Check(len(dto.Author) > 0, "author", "must be provided")
	v.Check(len(dto.Author) <= 50, "author", "must be less than or equal to 50 characters")
	v.Check(len(dto.GitUrl) > 0, "gitUrl", "must be provided")
	v.Check(len(dto.GitUrl) < 255, "gitUrl", "must be less than or equal to 255 characters")
}

func (dto InsertProjectDto) ToProject(id, campaignID uuid.UUID) Project {
	return Project{
		Id:         id,
		CampaignId: campaignID,
		Name:       dto.Name,
		Author:     dto.Author,
		GitUrl:     dto.GitUrl,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}
}
