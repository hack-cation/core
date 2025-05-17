package voter

import "errors"

var (
	ErrCampaignNotLive     = errors.New("this campaign is not live")
	ErrCampaignNotFound    = errors.New("campaign not found")
	ErrProjectNotFound     = errors.New("project not found")
	ErrVotesNotForCampaign = errors.New("votes aren't for the associated campaign")
)
