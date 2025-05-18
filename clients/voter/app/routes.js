import {index, route} from '@react-router/dev/routes';

export default [
    index('./routes/home.jsx'),
    route('dvd', './routes/dvd.jsx'),
    route('campaign/:campaignId', './routes/campaign.jsx'),
    route('campaign/:campaignId/vote', './routes/vote.jsx')
];
