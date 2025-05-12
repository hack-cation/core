-- +goose Up
-- +goose StatementBegin

ALTER TABLE IF EXISTS campaigns
ADD COLUMN max_votes INT DEFAULT 1;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd
