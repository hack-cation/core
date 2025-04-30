package main

import "net/http"

func (app *application) newServer() http.Handler {
	mux := http.NewServeMux()
	mux.Handle("/ping", ping())

	return mux
}

func ping() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})
}
