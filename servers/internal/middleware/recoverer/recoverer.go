package recoverer

import (
	"api.hackcation.dev/internal/middleware/requestid"
	"log/slog"
	"net/http"
)

func RecoverPanic(logger *slog.Logger) func(handler http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					requestId, _ := requestid.GetRequestID(r)
					logger.Error("panic encountered", requestid.LogString, requestId, "error", err)
					w.Header().Set("Connection", "close")
					w.WriteHeader(http.StatusInternalServerError)
				}
			}()

			next.ServeHTTP(w, r)
		})
	}
}
