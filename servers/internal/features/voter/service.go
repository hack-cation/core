package voter

import (
	"context"
	"fmt"
	"github.com/google/uuid"
)

type Repository interface {
	getCampaigns(ctx context.Context) ([]Campaign, error)
	getCampaignById(ctx context.Context, uuid2 uuid.UUID) (*Campaign, error)
	getProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	getProjectById(ctx context.Context, uuid2 uuid.UUID) (*Project, error)
	insertVotes(ctx context.Context, projectIds []uuid.UUID) error
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

func (s *Service) GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error) {
	return s.repo.getProjectsForCampaign(ctx, campaignId)
}

func (s *Service) InsertVotes(ctx context.Context, projectIds []uuid.UUID) error {
	projs := make([]*Project, 0)
	for _, projectId := range projectIds {
		proj, err := s.repo.getProjectById(ctx, projectId)
		if err != nil {
			return fmt.Errorf("error retrieving project by id: %w", err)
		}
		projs = append(projs, proj)
	}

	camps := make([]*Campaign, 0)
	for _, proj := range projs {
		camp, err := s.repo.getCampaignById(ctx, proj.CampaignId)
		if err != nil {
			return err
		}
		camps = append(camps, camp)
	}

	if len(camps) == 0 {
		return ErrCampaignNotFound
	}

	prevCampId := camps[0].Id
	for _, camp := range camps {
		if camp.Id != prevCampId {
			return ErrVotesAreForMultipleCampaigns
		}
		if !camp.IsActive {
			return ErrCampaignNotLive
		}
	}

	return s.repo.insertVotes(ctx, projectIds)
}
