package voter

import (
	"api.hackcation.dev/internal/database"
	"context"
	"github.com/google/uuid"
)

type pgRepository struct {
	db *database.Db
}

func (r *pgRepository) getCampaigns(ctx context.Context) ([]Campaign, error) {
	query := `SELECT id, name, is_active, created_at, updated_at
              FROM campaigns`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, database.CheckPostgresError(err)
	}

	res := make([]Campaign, 0)
	for rows.Next() {
		var campaign Campaign
		err := rows.Scan(&campaign.Id, &campaign.Name, &campaign.IsActive, &campaign.CreatedAt, &campaign.UpdatedAt)
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

func (r *pgRepository) getCampaignById(ctx context.Context, uuid2 uuid.UUID) (*Campaign, error) {
	query := `SELECT id, name, is_active, created_at, updated_at
              FROM campaigns
              WHERE id = $1`

	var res Campaign
	err := r.db.QueryRowContext(ctx, query).Scan(&res.Id, &res.Name, &res.IsActive, &res.CreatedAt, &res.UpdatedAt)
	if err != nil {
		return nil, database.CheckPostgresError(err)
	}

	return &res, nil
}

func (r *pgRepository) getProjectsForCampaign(ctx context.Context, campaignId uuid.UUID) ([]Project, error) {
	query := `SELECT 
    				p.id, 
    				p.campaign_id, 
    				p.author, 
    				p.created_at,
    				p.updated_at,
    				COUNT(v.id) as vote_count
              FROM projects p
              LEFT JOIN votes v ON v.project_id = p.id
              WHERE p.campaign_id = $1
              GROUP BY p.id, p.campaign_id, p.author, p.created_at, p.updated_at `

	rows, err := r.db.QueryContext(ctx, query, campaignId)
	if err != nil {
		return nil, database.CheckPostgresError(err)
	}

	res := make([]Project, 0)
	for rows.Next() {
		var project Project
		err := rows.Scan(&project.Id, &project.CampaignId, &project.Author, &project.CreatedAt, &project.UpdatedAt,
			&project.Votes)
		if err != nil {
			return nil, database.CheckPostgresError(err)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, database.CheckPostgresError(err)
	}

	return res, nil
}

func (r *pgRepository) insertVote(ctx context.Context, projectId uuid.UUID) error {
	query := `INSERT INTO votes (id, project_id) VALUES (uuid_generate_v4(), $2)`

	_, err := r.db.ExecContext(ctx, query, projectId)
	if err != nil {
		return database.CheckPostgresError(err)
	}

	return nil
}
