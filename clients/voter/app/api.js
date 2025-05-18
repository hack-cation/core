import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.NODE_ENV === 'development' ? process.env.DEV_API : process.env.PROD_API;
export const ON_SERVER_URL = process.env.LOCAL_SERVER_API

export async function api(onServer, path, init) {
  const url = `${onServer ? ON_SERVER_URL : API_URL}/${path}`
  console.log(`making api request to ${url}`)
  const response = await fetch(url, init);
  console.log(`got response from ${url} with status ${response.status}`)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// For using with your local docker environment and production
api.getCampaigns = (onServer) => api(onServer, 'campaigns');
api.getCampaign = (onServer, campaignId) => api(onServer,'campaigns/' + campaignId);
api.getCampaignProjects = (onServer, campaignId) => api(onServer,`campaigns/${campaignId}/projects`);
api.postVotes = (onServer, campaignId, projectIds) => api(onServer, `campaigns/${campaignId}/votes`, {
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
