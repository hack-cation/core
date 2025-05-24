package main

import (
	"api.hackcation.dev/internal/api"
	"api.hackcation.dev/internal/database"
	"api.hackcation.dev/internal/env"
	"api.hackcation.dev/internal/features/voter"
	"api.hackcation.dev/internal/vcs"
	"context"
	"errors"
	"log"
	"os"
	"os/signal"
)

type application struct {
	config      *api.Config
	apiKey      string
	voteHandler *voter.Handler
}

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

	app, err := newApplication(db)
	if err != nil {
		return err
	}

	server := app.newServer()

	err = app.config.Serve(ctx, server)

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

func newApplication(db *database.Db) (*application, error) {
	port := env.IntEnv(os.Getenv, "PORT", 8080)
	config := api.NewDefaultConfig(port, os.Getenv("ENV"), vcs.Version())

	vh := voter.NewHandler(config.Logger, voter.NewService(voter.NewPgRepository(db)))

	apiKey, ok := os.LookupEnv("API_KEY")
	if !ok {
		return nil, errors.New("API_KEY not set")
	}

	return &application{
		config:      config,
		apiKey:      apiKey,
		voteHandler: vh,
	}, nil
}
