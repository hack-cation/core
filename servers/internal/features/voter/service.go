package voter

import (
	"context"
	"fmt"
	"github.com/google/uuid"
)

type Repository interface {
	getCampaigns(ctx context.Context) ([]Campaign, error)
	getCampaignById(ctx context.Context, id uuid.UUID) (*Campaign, error)
	getProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	getProjectById(ctx context.Context, id uuid.UUID) (*Project, error)
	insertVotes(ctx context.Context, projectIds []uuid.UUID) error
	//insertCampaign(ctx context.Context, campaign *Campaign) error
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

func (s *Service) GetCampaignById(ctx context.Context, id uuid.UUID) (*Campaign, error) {
	return s.repo.getCampaignById(ctx, id)
}

func (s *Service) GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error) {
	return s.repo.getProjectsForCampaign(ctx, campaignId)
}

func (s *Service) InsertVotes(ctx context.Context, campaignId uuid.UUID, projectIds []uuid.UUID) error {
	campaign, err := s.repo.getCampaignById(ctx, campaignId)
	if err != nil {
		return fmt.Errorf("error retrieving campaign by id: %w", err)
	}
	if !campaign.IsActive {
		return ErrCampaignNotLive
	}

	for _, projectId := range projectIds {
		proj, err := s.repo.getProjectById(ctx, projectId)
		if err != nil {
			return fmt.Errorf("error retrieving project by id: %w", err)
		}
		if proj.CampaignId != campaignId {
			return ErrVotesNotForCampaign
		}
	}

	return s.repo.insertVotes(ctx, projectIds)
}

//func (s *Service) InsertCampaign(ctx context.Context, campaign *Campaign) error {
//
//	return s.repo.insertCampaign(ctx, campaign)
//}
