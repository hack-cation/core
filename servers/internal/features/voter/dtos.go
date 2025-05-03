package voter

import "github.com/google/uuid"

type InsertVotesDto struct {
	ProjectIds []uuid.UUID `json:"projectIds"`
}
