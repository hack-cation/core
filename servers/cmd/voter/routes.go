package main

import (
	"api.hackcation.dev/internal/middleware/apikey"
	"net/http"
)

func (app *application) addRoutes(mux *http.ServeMux) {

	keyM := apikey.ApiKey(app.apiKey, app.config.Logger)

	mux.Handle("GET /campaigns", app.voteHandler.GetCampaigns())
	mux.Handle("GET /campaigns/{id}", app.voteHandler.GetCampaignById())
	mux.Handle("GET /campaigns/{id}/projects", app.voteHandler.GetProjectsForCampaign())

	mux.Handle("POST /campaigns", keyM(app.voteHandler.InsertCampaign()))
	mux.Handle("POST /campaigns/{id}/projects", keyM(app.voteHandler.InsertProject()))
	mux.Handle("POST /campaigns/{id}/votes", app.voteHandler.InsertVotes())

	mux.Handle("PUT /campaigns/{id}", keyM(app.voteHandler.UpdateCampaign()))

}
