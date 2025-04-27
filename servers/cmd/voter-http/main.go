package main

import (
	"api.hackcation.dev/internal/database"
	"api.hackcation.dev/internal/env"
	"context"
	"errors"
	_ "github.com/jackc/pgx/v5/stdlib"
	"log"
	"os"
	"os/signal"
)

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, os.Kill)
	defer cancel()

	db, err := openDb(ctx)
	if err != nil {
		return err
	}
	defer db.Close()

	return nil
}

func openDb(ctx context.Context) (*database.Db, error) {
	dbUser, ok := os.LookupEnv("DB_USER")
	if !ok {
		return nil, errors.New("DB_USER not set")
	}
	dbPassword, ok := os.LookupEnv("DB_PASSWORD")
	if !ok {
		return nil, errors.New("DB_PASSWORD not set")
	}
	dbHost, ok := os.LookupEnv("DB_HOST")
	if !ok {
		return nil, errors.New("DB_HOST not set")
	}
	dbName, ok := os.LookupEnv("DB_NAME")
	if !ok {
		return nil, errors.New("DB_NAME not set")
	}

	dbConfig := database.New(database.ConnectionInfo{
		User:       dbUser,
		Password:   dbPassword,
		Host:       dbHost,
		Port:       env.IntEnv(os.Getenv, "DB_PORT", 5432),
		DbName:     dbName,
		SslEnabled: env.BoolEnv(os.Getenv, "DB_SSL_ENABLED", false),
	})

	db, err := dbConfig.OpenDB(ctx)
	if err != nil {
		return nil, err
	}

	err = db.RunMigrations(database.DialectPostgres)
	if err != nil {
		return nil, err
	}

	return db, nil
}
