package apikey

import (
	"api.hackcation.dev/internal/api"
	"log/slog"
	"net/http"
)

const (
	Header = "X-API-Key"
)

func ApiKey(key string, logger *slog.Logger) func(next http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get(Header)
			if apiKey != key {
				api.UnauthorizedResponse(w, r, "X-API-Key header is missing or invalid", logger)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
