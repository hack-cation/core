package voter

import (
	"context"
	"github.com/google/uuid"
)

type Repository interface {
	getCampaigns(ctx context.Context) ([]Campaign, error)
	getCampaignById(ctx context.Context, uuid2 uuid.UUID) (*Campaign, error)
	getProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	getProjectById(ctx context.Context, uuid2 uuid.UUID) (*Project, error)
	insertVote(ctx context.Context, projectId uuid.UUID) error
}

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) GetCampaigns(ctx context.Context) ([]Campaign, error) {
	return s.repo.getCampaigns(ctx)
}

func (s *Service) GetCampaignById(ctx context.Context, uuid uuid.UUID) (*Campaign, error) {
	return s.repo.getCampaignById(ctx, uuid)
}

func (s *Service) GetLiveCampaigns(ctx context.Context) ([]Campaign, error) {
	campaigns, err := s.repo.getCampaigns(ctx)
	if err != nil {
		return nil, err
	}

	res := make([]Campaign, 0)
	for _, campaign := range campaigns {
		if campaign.IsActive {
			res = append(res, campaign)
		}
	}

	return res, nil
}

func (s *Service) GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error) {
	return s.repo.getProjectsForCampaign(ctx, campaignId)
}

func (s *Service) InsertVote(ctx context.Context, projectId uuid.UUID) error {
	proj, err := s.repo.getProjectById(ctx, projectId)
	if err != nil {
		return err
	}

	camp, err := s.repo.getCampaignById(ctx, proj.CampaignId)
	if err != nil {
		return err
	}
	if !camp.IsActive {
		return ErrCampaignNotLive
	}

	return s.repo.insertVote(ctx, projectId)
}
