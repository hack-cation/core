-- +goose Up
-- +goose StatementBegin

ALTER TABLE campaigns
ADD COLUMN event_date timestamptz NOT NULL DEFAULT NOW();

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
-- +goose StatementEnd
