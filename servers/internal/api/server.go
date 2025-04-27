package api

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"time"
)

func (config *Config) Serve(ctx context.Context, handler http.Handler) error {
	srv := &http.Server{
		Addr:     fmt.Sprintf(":%d", config.Port),
		Handler:  handler,
		ErrorLog: slog.NewLogLogger(config.Logger.Handler(), slog.LevelError),
	}

	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	errCh := make(chan error)

	go func() {
		<-ctx.Done()
		config.Logger.Info("shutting down server")

		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := srv.Shutdown(shutdownCtx); err != nil {
			errCh <- fmt.Errorf("failed to shutdown http server: %w", err)
		}
		errCh <- nil
	}()

	config.Logger.Info("starting server", "addr", srv.Addr, "env", config.Env, "version", config.Version)

	err := srv.ListenAndServe()
	if !errors.Is(err, http.ErrServerClosed) {
		cancel()
		<-errCh
		return err
	}

	err = <-errCh
	if err != nil {
		return err
	}

	config.Logger.Info("server stopped")

	return nil
}
