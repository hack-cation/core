package voter

import (
	"api.hackcation.dev/internal/database"
	"context"
	"errors"
	"fmt"
	"github.com/google/uuid"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type PgRepository struct {
	db *database.Db
}

func NewPgRepository(db *database.Db) *PgRepository {
	return &PgRepository{db: db}
}

func (r *PgRepository) getCampaigns(ctx context.Context) ([]Campaign, error) {
	query := `SELECT id, name, is_active, event_date, max_votes, created_at, updated_at
              FROM campaigns`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, database.CheckPostgresError(err)
	}

	res := make([]Campaign, 0)
	for rows.Next() {
		var campaign Campaign
		err := rows.Scan(&campaign.Id, &campaign.Name, &campaign.IsActive, &campaign.EventDate, &campaign.MaxVotes,
			&campaign.CreatedAt, &campaign.UpdatedAt)
		if err != nil {
			return nil, database.CheckPostgresError(err)
		}
		res = append(res, campaign)
	}

	if err := rows.Err(); err != nil {
		return nil, database.CheckPostgresError(err)
	}

	return res, nil
}

func (r *PgRepository) getCampaignById(ctx context.Context, id uuid.UUID) (*Campaign, error) {
	query := `SELECT id, name, is_active, event_date, max_votes, created_at, updated_at
              FROM campaigns
              WHERE id = $1`

	var res Campaign
	err := r.db.QueryRowContext(ctx, query, id).Scan(&res.Id, &res.Name, &res.IsActive, &res.EventDate, &res.MaxVotes,
		&res.CreatedAt, &res.UpdatedAt)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrRecordNotFound) {
			return nil, ErrCampaignNotFound
		}
		return nil, err
	}

	return &res, nil
}

func (r *PgRepository) getProjectById(ctx context.Context, id uuid.UUID) (*Project, error) {
	query := `SELECT p.id, p.campaign_id, p.author, p.git_url, p.created_at, p.updated_at, COUNT(v.id) as vote_count
              FROM projects p
              LEFT JOIN votes v ON v.project_id = p.id
              WHERE p.id = $1
              GROUP BY p.id, p.campaign_id, p.author, p.created_at, p.updated_at`

	var res Project
	err := r.db.QueryRowContext(ctx, query, id).Scan(&res.Id, &res.CampaignId, &res.Author, &res.GitUrl,
		&res.CreatedAt, &res.UpdatedAt, &res.Votes)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrRecordNotFound) {
			return nil, ErrProjectNotFound
		}
		return nil, err
	}

	return &res, nil
}

func (r *PgRepository) getProjectsForCampaign(ctx context.Context, id uuid.UUID) ([]Project, error) {
	query := `SELECT 
    				p.id, 
    				p.campaign_id, 
    				p.name,
    				p.author,
    				p.git_url,
    				p.created_at,
    				p.updated_at,
    				COUNT(v.id) as vote_count
              FROM projects p
              LEFT JOIN votes v ON v.project_id = p.id
              WHERE p.campaign_id = $1
              GROUP BY p.id, p.campaign_id, p.author, p.created_at, p.updated_at`

	rows, err := r.db.QueryContext(ctx, query, id)
	if err != nil {
		return nil, database.CheckPostgresError(err)
	}

	res := make([]Project, 0)
	for rows.Next() {
		var project Project
		err := rows.Scan(&project.Id, &project.CampaignId, &project.Name, &project.Author, &project.GitUrl,
			&project.CreatedAt, &project.UpdatedAt, &project.Votes)
		if err != nil {
			return nil, database.CheckPostgresError(err)
		}

		res = append(res, project)
	}

	if err := rows.Err(); err != nil {
		return nil, database.CheckPostgresError(err)
	}

	return res, nil
}

func (r *PgRepository) insertVotes(ctx context.Context, projectIds []uuid.UUID) error {
	if len(projectIds) == 0 {
		return nil
	}

	query := `
       INSERT INTO votes (id, project_id)
       SELECT uuid_generate_v4(), pid
       FROM unnest($1::uuid[]) AS pid`

	_, err := r.db.ExecContext(ctx, query, projectIds)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrForeignKeyViolation) {
			return ErrProjectNotFound
		}
		return fmt.Errorf("error inserting votes in repository: %w", err)
	}

	return nil
}

func (r *PgRepository) insertCampaign(ctx context.Context, campaign *Campaign) error {
	query := `INSERT INTO campaigns (id, name, is_active, event_date, max_votes, created_at, updated_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7)`

	_, err := r.db.ExecContext(ctx, query, campaign.Id, campaign.Name, campaign.IsActive, campaign.EventDate, campaign.MaxVotes,
		campaign.CreatedAt, campaign.UpdatedAt)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrUniqueViolation) {
			return ErrCampaignAlreadyExists
		}
		return fmt.Errorf("error inserting campaign in repository: %w", err)
	}

	return nil
}

func (r *PgRepository) insertProject(ctx context.Context, project *Project) error {
	query := `INSERT INTO projects (id, campaign_id, name, author, git_url, created_at, updated_at)
              VALUES ($1, $2, $3, $4, $5, $6, $7)`

	_, err := r.db.ExecContext(ctx, query, project.Id, project.CampaignId, project.Name, project.Author, project.GitUrl,
		project.CreatedAt, project.UpdatedAt)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrUniqueViolation) {
			return ErrProjectAlreadyExists
		}
		return fmt.Errorf("error inserting project in repository: %w", err)
	}

	return nil
}

func (r *PgRepository) updateCampaign(ctx context.Context, campaign *Campaign) error {
	query := `UPDATE campaigns
              SET name = $2,
                  is_active = $3,
                  event_date = $4,
                  max_votes = $5,
                  updated_at = $6
              WHERE id = $1
              RETURNING created_at`

	err := r.db.QueryRowContext(ctx, query, campaign.Id, campaign.Name, campaign.IsActive, campaign.EventDate, campaign.MaxVotes,
		campaign.UpdatedAt).Scan(&campaign.CreatedAt)
	if err != nil {
		err = database.CheckPostgresError(err)
		if errors.Is(err, database.ErrRecordNotFound) {
			return ErrCampaignNotFound
		}
		return fmt.Errorf("error updating campaign in repository: %w", err)
	}

	return nil
}
