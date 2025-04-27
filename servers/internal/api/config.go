package api

import (
	"log/slog"
	"os"
	"sync"
)

type Config struct {
	Port        int
	Env         string
	Version     string
	Wg          sync.WaitGroup
	Logger      *slog.Logger
	CorsOptions *Cors
}

type Cors struct {
	TrustedOrigins []string
}

func NewDefaultConfig(port int, env, version string, cors []string) *Config {
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
		CorsOptions: &Cors{
			TrustedOrigins: cors,
		},
	}
}
