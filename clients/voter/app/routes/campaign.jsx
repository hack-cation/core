import {api} from '../api';
import {RankingsPage} from '../pages/RankingsPage/RankingsPage';
import {hasUniqueId} from '../utils/uniqueId';
import {useEffect, useState} from "react";

export const meta = () => [
    {title: '.hack//voter'},
    {name: 'description', content: 'page to view the rankings of a campaigns projects'}
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
    const serverData = await serverLoader();
    const isReturningGuest = hasUniqueId();
    return {...serverData, isReturningGuest};
}

clientLoader.hydrate = true;

export function HydrateFallback() {
    return <marquee>Loading...</marquee>;
}

export default function CampaignRoute({loaderData}) {
    const {campaign: campaignData, projects: projectData, isReturningGuest} = loaderData;

    const [campaign, setCampaign] = useState(campaignData);
    const [projects, setProjects] = useState(projectData.sort((a, b) => b.votes - a.votes));

    useEffect(() => {
        let intervalId
        let isMounted = true;
        const worker = async () => {
            try {
                const {campaign: camp} = await api.getCampaign(campaign.id);
                const {projects: projs} = await api.getCampaignProjects(campaign.id);

                if (isMounted) {
                    setProjects(projs.sort((a, b) => b.votes - a.votes));
                }

                if (isMounted && !camp.isActive) {
                    setCampaign(camp);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error("Error fetching campaign data: ", error);
            }
        };

        if (campaign && campaign.isActive) {
            intervalId = setInterval(worker, 1000);
        }

        return () => {
            isMounted = false;
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, []);

    return <RankingsPage {...campaign} projects={projects}/>;
}


