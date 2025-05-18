import { NavLink } from 'react-router';
import { Text } from '@phxjs/ui/Text/Text';
import { api } from '../api';
import { hasUniqueId } from '../utils/uniqueId';

export const meta = () => [
  { title: '.hack//voter' },
  { name: 'description', content: 'main voter page of .hack//cation' }
];

export async function loader() {
  try {
    const  {campaigns} = await api.getCampaigns(true);
    return {campaigns: campaigns || []};
  } catch {
    return {campaigns: []};
  }
}

export async function clientLoader({serverLoader}) {
  const {campaigns} = await serverLoader();
  const isReturningGuest = hasUniqueId();
  return {
    isReturningGuest,
    campaigns
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

export default function HomeRoute({loaderData}) {
  const {isReturningGuest, campaigns} = loaderData;

  return (
    <main className="home-page" data-guest={isReturningGuest}>
      {isReturningGuest && 
        <marquee>
          <Text content="Welcome back!" />
        </marquee>
      }
      
      <h2>Join the Campaigns</h2>

      <ul className="campaigns-list">
        {campaigns.map(({id, name, eventDate, isActive}, index) => (
          <li key={`campaign_${id}_${index}`}>
            <NavLink
                to={isActive ? `/campaign/${id}/vote` : `/campaign/${id}`}
                className={'campaign-item ' + (isActive && 'campaign-item--active')}
            >
              <div>
                <span className="campaign-item__name">{name}</span>
                <div className="campaign-item__date">{(new Date(eventDate)).toDateString()}</div>
              </div>
              <div className="campaign-item__status">{isActive ? 'VOTE NOW' : 'View Rankings'}</div>
            </NavLink>
          </li>
        ))}
      </ul>
    </main>
  );
}
