package voter

import (
	"api.hackcation.dev/internal/api"
	"api.hackcation.dev/internal/validator"
	"context"
	"errors"
	"github.com/google/uuid"
	"log/slog"
	"net/http"
)

type voterService interface {
	GetCampaigns(ctx context.Context) ([]Campaign, error)
	GetCampaignById(ctx context.Context, uuid uuid.UUID) (*Campaign, error)
	GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	InsertVotes(ctx context.Context, projectIds []uuid.UUID) error
}

type Handler struct {
	logger  *slog.Logger
	service voterService
}

func NewHandler(logger *slog.Logger, service voterService) *Handler {
	return &Handler{
		logger:  logger,
		service: service,
	}
}

func (h *Handler) GetCampaigns() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		campaigns, err := h.service.GetCampaigns(ctx)
		if err != nil {
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		err = api.WriteJson(w, http.StatusOK, api.Envelope{"campaigns": campaigns}, nil)
		if err != nil {
			api.ServerErrorResponse(w, r, h.logger, err)
		}
	})
}

func (h *Handler) InsertVotes() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		var input InsertVotesDto
		err := api.ReadJSON(w, r, &input)
		if err != nil {
			api.BadRequestResponse(w, r, h.logger, err)
			return
		}

		err = h.service.InsertVotes(ctx, input.ProjectIds)
		if err != nil {
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.Is(err, ErrVotesAreForMultipleCampaigns):
				api.UnprocessableEntityResponse(w, r, h.logger, err)
				return
			case errors.Is(err, ErrCampaignNotLive):
				api.UnprocessableEntityResponse(w, r, h.logger, err)
				return
			case errors.Is(err, ErrProjectNotFound):
				api.NotFoundResponse(w, r, h.logger)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	})
}

func (h *Handler) GetProjectsForCampaign() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		v := validator.New()
		campaignId := api.ReadUUIDPath(r, "id", v)
		if !v.Valid() {
			api.FailedValidationResponse(w, r, h.logger, v.Errors)
			return
		}

		projects, err := h.service.GetProjectsForCampaign(ctx, campaignId)
		if err != nil {
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.Is(err, ErrCampaignNotFound):
				api.NotFoundResponse(w, r, h.logger)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		err = api.WriteJson(w, http.StatusOK, api.Envelope{"projects": projects}, nil)
		if err != nil {
			api.ServerErrorResponse(w, r, h.logger, err)
		}
	})
}
