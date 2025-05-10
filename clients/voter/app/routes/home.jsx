import { Text } from '@phxjs/ui/Text/Text';
import Logo from '../components/logo/logo';
import { hasUniqueId } from '../api';

export const meta = () => [
  { title: '.hack//voter' },
  { name: 'description', content: 'main voter page of .hack//cation' }
];

export async function loader() {
  // fetch polls

  return {
    polls: [
      {eventId: 1, eventName: 'Pokedex', eventDate: '2025-05-24'},
      {eventId: 3, eventName: 'To Be Announced!', eventDate: '2025-10-25'}
    ]
  };
}

export async function clientLoader({serverLoader}) {
  const {polls} = await serverLoader();
  const isReturningGuest = hasUniqueId();
  return {isReturningGuest, polls};
}

export default function Home({loaderData}) {
  const {isReturningGuest, polls} = loaderData;

  return (
    <>
      <h1>
        <Logo />
      </h1>
      {isReturningGuest && 
        <marquee>
          <Text content="Welcome back!" />
        </marquee>
      }
      
      <h2>Join the Polls</h2>

      <ul>
        {polls.map(({eventId, eventName, eventDate}) => (
          <li key={`event_${eventId}`}>
            <a href={`/vote/${eventId}`}>
              <span>{eventName}</span>
              <div>{eventDate}</div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
