package database

import (
	"context"
	"embed"
	"github.com/pressly/goose/v3"
	"time"
)

const (
	DialectPostgres = "postgres"
)

//go:embed migrations/*.sql
var embedMigrations embed.FS

func (db *Db) RunMigrations(dialect string) error {
	goose.SetBaseFS(embedMigrations)

	if err := goose.SetDialect(dialect); err != nil {
		return err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := goose.UpContext(ctx, db.DB, "migrations"); err != nil {
		return err
	}

	return nil
}
