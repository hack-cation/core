let API_BASE_URL;

if (import.meta.env.SSR) {
  API_BASE_URL = import.meta.env.VITE_LOCAL_SERVER_API_URL;
  if (!API_BASE_URL) {
    throw new Error(
        'Server-side API base URL (VITE_LOCAL_SERVER_API_URL) is not defined.'
    );
  }
} else {
  API_BASE_URL = import.meta.env.MODE === 'development'
      ? import.meta.env.VITE_DEV_API_URL
      : import.meta.env.VITE_PROD_API_URL;

  if (!API_BASE_URL) {
    const mode = import.meta.env.MODE;
    throw new Error(
        `Client-side API base URL is not defined for mode: ${mode}. `
    );
  }
}

export async function api(path, init) {
  const url = `${API_BASE_URL}/${path}`
  console.log(`api: ${url}`)
  const response = await fetch(url, init);
  console.log(`api: ${url} response: ${response.status}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
}

// For using with your local docker environment and production
api.getCampaigns = () => api('campaigns');
api.getCampaign = (campaignId) => api('campaigns/' + campaignId);
api.getCampaignProjects = (campaignId) => api(`campaigns/${campaignId}/projects`);
api.postVotes = (campaignId, projectIds) => api(`campaigns/${campaignId}/votes`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({projectIds: projectIds})
})


// mock api definitions
//   /**********\
//   |          |
//   | mock api |
//   |          |
//   \**********/
//
// const activeOne = {
//   "id": "active-example",
//   "name": "Spring Hackathon 2025",
//   "maxVotes": 3,
//   "eventDate": "2025-05-24T20:00:00Z",
//   "isActive": true,
//   "createdAt": "2025-03-01T12:00:00Z",
//   "updatedAt": "2025-05-17T12:00:00Z"
// };
//
//
// const inactiveOne = {
//   "id": "inactive-example",
//   "name": "Proto Hackathon 2025",
//   "maxVotes": 3,
//   "eventDate": "2025-04-24T20:00:00Z",
//   "isActive": false,
//   "createdAt": "2025-03-01T12:00:00Z",
//   "updatedAt": "2025-04-17T12:00:00Z"
// };
//
//
// const fakeOne = {
//   [activeOne.id]: activeOne,
//   [inactiveOne.id]: inactiveOne
// };
//
// const fakeProject1 =  {
//   "id": "fake-project-1",
//   "author": "string",
//   "title": "Fake Project 1",
//   "votes": 1,
//   "gitUrl": "string",
// };
//
// const fakeProject2 =  {
//   "id": "fake-project-2",
//   "author": "string",
//   "title": "Fake Project 2",
//   "votes": 2,
//   "gitUrl": "string",
// };
//
//
// /** mock getCampaigns */
// api.getCampaigns = async () => ({campaigns: [activeOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne]})
//
// /** mock getCampaign */
// api.getCampaign = async (campaignId) => ({campaign: fakeOne[campaignId]});
//
// /** mock getCampaignProjects */
// api.getCampaignProjects = async (campaignId) => ({
//   projects: [
//     {...fakeProject1, campaignId},
//     {...fakeProject2, campaignId}
//   ]
// });
