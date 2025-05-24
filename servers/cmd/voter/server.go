package main

import (
	"api.hackcation.dev/internal/middleware/cors"
	"api.hackcation.dev/internal/middleware/logger"
	"api.hackcation.dev/internal/middleware/recoverer"
	"api.hackcation.dev/internal/middleware/requestid"
	"net/http"
)

func (app *application) newServer() http.Handler {
	mux := http.NewServeMux()
	mux.Handle("/ping", ping())

	v1Mux := http.NewServeMux()
	app.addRoutes(v1Mux)
	mux.Handle("/v1/", http.StripPrefix("/v1", v1Mux))

	loggerF := logger.Logger(app.config.Logger, []string{"/ping"})
	recovererF := recoverer.RecoverPanic(app.config.Logger)
	corsF := cors.Cors(nil)

	var handler http.Handler = mux
	handler = loggerF(handler)
	handler = requestid.RequestID(handler)
	handler = corsF(handler)
	handler = recovererF(handler)
	return handler
}

func ping() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}
