package voter

import "errors"

var (
	ErrCampaignNotLive              = errors.New("this campaign is not live")
	ErrCampaignNotFound             = errors.New("campaign not found")
	ErrProjectNotFound              = errors.New("project not found")
	ErrVotesAreForMultipleCampaigns = errors.New("votes are for multiple campaigns")
)
