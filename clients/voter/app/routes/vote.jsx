import {VotePage} from "../pages/VotePage/VotePage.jsx";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import {api} from "../api.js";
import {hasUniqueId} from "../utils/uniqueId.js";

export const meta = () => [
    { title: '.hack//voter' },
    { name: 'description', content: 'page to vote on your favorite projects' }
];

export async function loader({params}) {
    try {
        const campaignId = params.campaignId;
        const {campaign} = await api.getCampaign(true, campaignId)
        const {projects} = await api.getCampaignProjects(true, campaignId);
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
    const isReturningGuest = hasUniqueId();
    return {
        isReturningGuest,
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
    const {isReturningGuest, campaign, projects} = loaderData;
    const navigate = useNavigate()

    useEffect(() => {
        if (!campaign.isActive) {
            navigate(`/campaign/${campaign.id}`)
        }
    }, [campaign.isActive, navigate])

    return (
        <VotePage
            {...campaign}
            projects={projects}
            isReturningGuest={isReturningGuest}
        />
    );
}
