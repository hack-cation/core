-- +goose Up
-- +goose StatementBegin

ALTER TABLE IF EXISTS projects
ADD COLUMN git_url TEXT DEFAULT ''

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd
