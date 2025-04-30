package api

import (
	"log/slog"
	"os"
	"sync"
)

type Config struct {
	Port    int
	Env     string
	Version string
	Wg      sync.WaitGroup
	Logger  *slog.Logger
}

func NewDefaultConfig(port int, env, version string) *Config {
	jsonHandler := slog.NewJSONHandler(
		os.Stdout,
		&slog.HandlerOptions{
			Level:     slog.LevelInfo,
			AddSource: true,
		},
	)

	return &Config{
		Port:    port,
		Env:     env,
		Version: version,
		Wg:      sync.WaitGroup{},
		Logger:  slog.New(jsonHandler),
	}
}
