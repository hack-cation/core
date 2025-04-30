package voter

import (
	"context"
	"github.com/google/uuid"
	"log/slog"
)

type voterService interface {
	GetCampaigns(ctx context.Context) ([]Campaign, error)
	GetCampaignById(ctx context.Context, uuid uuid.UUID) (*Campaign, error)
	GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	InsertVote(ctx context.Context, projectId uuid.UUID) error
}

type Handler struct {
	logger  *slog.Logger
	service Service
}
