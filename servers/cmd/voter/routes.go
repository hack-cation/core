package main

import "net/http"

func (app *application) addRoutes(mux *http.ServeMux) {

	mux.Handle("GET campaigns/", app.voteHandler.GetLiveCampaigns())
	mux.Handle("GET campaigns/{id}/projects", app.voteHandler.GetProjectsForCampaign())
	mux.Handle("POST projects/vote", app.voteHandler.InsertVotes())

}
