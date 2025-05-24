-- +goose Up
-- +goose StatementBegin
ALTER TABLE projects
ADD COLUMN name VARCHAR(100) DEFAULT '';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin

-- +goose StatementEnd
