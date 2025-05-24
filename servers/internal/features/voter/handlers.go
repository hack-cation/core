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
	GetCampaignById(ctx context.Context, id uuid.UUID) (*Campaign, error)
	GetProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error)
	InsertVotes(ctx context.Context, campaignId uuid.UUID, projectIds []uuid.UUID) error
	InsertCampaign(ctx context.Context, dto *InsertCampaignDto) (*Campaign, error)
	InsertProject(ctx context.Context, campaignId uuid.UUID, dto *InsertProjectDto) (*Project, error)
	UpdateCampaign(ctx context.Context, id uuid.UUID, dto *InsertCampaignDto) (*Campaign, error)
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

func (h *Handler) GetCampaignById() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		v := validator.New()
		id := api.ReadUUIDPath(r, "id", v)
		if !v.Valid() {
			api.FailedValidationResponse(w, r, h.logger, v.Errors)
			return
		}

		campaign, err := h.service.GetCampaignById(ctx, id)
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

		err = api.WriteJson(w, http.StatusOK, api.Envelope{"campaign": campaign}, nil)
		if err != nil {
			api.ServerErrorResponse(w, r, h.logger, err)
		}
	})
}

func (h *Handler) InsertVotes() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		v := validator.New()
		campaignId := api.ReadUUIDPath(r, "id", v)
		if !v.Valid() {
			api.FailedValidationResponse(w, r, h.logger, v.Errors)
			return
		}

		var input InsertVotesDto
		err := api.ReadJSON(w, r, &input)
		if err != nil {
			api.BadRequestResponse(w, r, h.logger, err)
			return
		}

		err = h.service.InsertVotes(ctx, campaignId, input.ProjectIds)
		if err != nil {
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.Is(err, ErrVotesNotForCampaign):
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

func (h *Handler) InsertCampaign() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		var input InsertCampaignDto
		err := api.ReadJSON(w, r, &input)
		if err != nil {
			api.BadRequestResponse(w, r, h.logger, err)
			return
		}

		campaign, err := h.service.InsertCampaign(ctx, &input)
		if err != nil {
			var vErr validator.ErrFailedValidation
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.As(err, &vErr):
				api.FailedValidationResponse(w, r, h.logger, vErr.Reasons)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		err = api.WriteJson(w, http.StatusCreated, api.Envelope{"campaign": campaign}, nil)
		if err != nil {
			api.ServerErrorResponse(w, r, h.logger, err)
		}
	})
}

func (h *Handler) InsertProject() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		v := validator.New()
		campId := api.ReadUUIDPath(r, "id", v)
		if !v.Valid() {
			api.BadRequestResponse(w, r, h.logger, validator.NewErrFailedValidation(v.Errors))
			return
		}

		var input InsertProjectDto
		err := api.ReadJSON(w, r, &input)
		if err != nil {
			api.BadRequestResponse(w, r, h.logger, err)
			return
		}

		project, err := h.service.InsertProject(ctx, campId, &input)
		if err != nil {
			var vErr validator.ErrFailedValidation
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.As(err, &vErr):
				api.FailedValidationResponse(w, r, h.logger, vErr.Reasons)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		err = api.WriteJson(w, http.StatusCreated, api.Envelope{"project": project}, nil)
		if err != nil {
			return
		}
	})
}

func (h *Handler) UpdateCampaign() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), api.DefaultContextTimeout)
		defer cancel()

		v := validator.New()
		campId := api.ReadUUIDPath(r, "id", v)
		if !v.Valid() {
			api.BadRequestResponse(w, r, h.logger, validator.NewErrFailedValidation(v.Errors))
			return
		}

		var input InsertCampaignDto
		err := api.ReadJSON(w, r, &input)
		if err != nil {
			api.BadRequestResponse(w, r, h.logger, err)
			return
		}

		campaign, err := h.service.UpdateCampaign(ctx, campId, &input)
		if err != nil {
			var vErr validator.ErrFailedValidation
			switch {
			case errors.Is(err, context.DeadlineExceeded):
				api.TimeoutResponse(w, r, h.logger)
				return
			case errors.As(err, &vErr):
				api.FailedValidationResponse(w, r, h.logger, vErr.Reasons)
				return
			default:
				api.ServerErrorResponse(w, r, h.logger, err)
				return
			}
		}

		err = api.WriteJson(w, http.StatusOK, api.Envelope{"campaign": campaign}, nil)
		return
	})
}
