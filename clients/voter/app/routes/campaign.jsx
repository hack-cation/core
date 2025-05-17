import { api } from '../api';
import { RankingsPage } from '../components/RankingsPage/RankingsPage';
import { VotePage } from '../components/VotePage/VotePage';
import { hasUniqueId } from '../utils/uniqueId';

export async function loader({params}) {
  try {
    const campaignId = params.campaignId;
    const campaignData = await api.getCampaign(campaignId);
    const projectData = await api.getCampaignProjects(campaignId);
    return {
      campaign: {...campaignData?.campaign},
      projects: [...projectData?.projects]
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
  return <div>Loading...</div>;
}

export default function CampaignPage({loaderData}) {
  const {campaign, projects, isReturningGuest} = loaderData;

  if (campaign.isActive) {
    return (
      <VotePage
        {...campaign}
        projects={projects}
        isReturningGuest={isReturningGuest}
      />
    );
  }

  return <RankingsPage {...campaign} projects={projects} />;
}


