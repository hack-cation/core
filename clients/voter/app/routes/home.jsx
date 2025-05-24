import {NavLink} from 'react-router';
import {Text} from '@phxjs/ui/Text/Text';
import {api} from '../api';
import {getHasVoted, hasUniqueId} from '../utils/uniqueId';

export const meta = () => [
    {title: '.hack//voter'},
    {name: 'description', content: 'main voter page of .hack//cation'}
];

export async function loader() {
    try {
        console.log('loading campaigns');
        const {campaigns} = await api.getCampaigns();
        console.log('loaded campaigns', campaigns);
        return {campaigns: campaigns || []};
    } catch (error) {
        console.error('error loading campaigns: ', error);
        return {campaigns: []};
    }
}

export async function clientLoader({serverLoader}) {
    console.log('loading campaigns on client');
    const {campaigns} = await serverLoader();
    console.log('loaded campaigns on client', campaigns);
    const isReturningGuest = hasUniqueId();
    console.log('isReturningGuest', isReturningGuest);
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
    console.log('home route loaderData', loaderData);
    const {isReturningGuest, campaigns} = loaderData;

    return (
        <main className="home-page container mx-auto" data-guest={isReturningGuest}>
            {isReturningGuest &&
                <marquee>
                    <Text content="Welcome back!"/>
                </marquee>
            }

            <h2>Join the Campaigns</h2>

            <ul className="campaigns-list">
                {campaigns.map(({id, name, eventDate, isActive}, index) => (
                    <li key={`campaign_${id}_${index}`}>
                        <NavLink
                            to={isActive && !getHasVoted(id) ? `/campaign/${id}/vote` : `/campaign/${id}`}
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
