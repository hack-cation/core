import {VotePage} from "../pages/VotePage/VotePage.jsx";
import {useNavigate} from "react-router";
import {useCallback, useEffect} from "react";
import {api} from "../api.js";
import {getHasVoted, setHasVoted} from "../utils/uniqueId.js";

export const meta = () => [
    { title: '.hack//voter' },
    { name: 'description', content: 'page to vote on your favorite projects' }
];

export async function loader({params}) {
    try {
        const campaignId = params.campaignId;
        const {campaign} = await api.getCampaign(campaignId)
        const {projects} = await api.getCampaignProjects(campaignId);
        return {
            campaign: campaign || {},
            projects: projects || []
        };
    } catch {
        return {
            campaign: {},
            projects: []
        };
    }
}

export async function clientLoader({serverLoader}) {
    const {campaign, projects} = await serverLoader();
    let hasVoted = false;
    if (campaign && campaign.id) {
        hasVoted = getHasVoted(campaign.id);
    }
    return {
        hasVoted,
        campaign,
        projects
    };
}

clientLoader.hydrate = true;

export function HydrateFallback() {
    return (
        <>
            <marquee>loading...</marquee>
        </>
    )
}

export default function VoteRoute({loaderData}) {
    const {hasVoted, campaign, projects} = loaderData;
    const navigate = useNavigate()

    useEffect(() => {
        if ((campaign && !campaign.isActive) || hasVoted) {
            navigate(`/campaign/${campaign.id}`)
        }
    }, [campaign, hasVoted, navigate])

    const onSubmitVotes = useCallback(async (votes) => {
        await api.postVotes(campaign.id, votes)
        setHasVoted(campaign.id);
        navigate(`/campaign/${campaign.id}`)
    }, [campaign.id, navigate]);

    return (
        <VotePage
            name={campaign.name}
            maxVotes={campaign.maxVotes}
            projects={projects}
            onSubmitVotes={onSubmitVotes}
        />
    );
}
