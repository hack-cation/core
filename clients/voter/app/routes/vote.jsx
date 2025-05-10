import { fetchEvent, hasUniqueId } from "../api";

export async function loader({params}) {
  const eventId = params.eventId;
  const data = await fetchEvent(eventId);
  return {
    ...data,
    eventId,
    eventName: 'FakeName for Pokedex',
    eventDate: '2025-05-24',
    min: 1,
    max: 1,
    items: [{name: 'Team 1', id: '1'},{name: 'Team 2', id: '2'},{name: 'Team 3', id: '3'}]
  };
}

export async function clientLoader({serverLoader}) {
  const serverData = await serverLoader();
  const isReturningGuest = hasUniqueId();
  console.log({serverData, isReturningGuest})
  return {...serverData, isReturningGuest};
}

clientLoader.hydrate = true;

// export function action() {
//   // TODO - form submission
// }


export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Vote({loaderData}) {
  return (
    <>
      <div>
        Voting Poll for {loaderData?.eventName}
      </div>

      <pre>{JSON.stringify(loaderData, null, '    ')}</pre>
    </>
  )
}