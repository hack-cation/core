import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.NODE_ENV === 'development' ? process.env.DEV_API : process.env.PROD_API;

export async function api(path, init) {
  const response = await fetch(`${API_URL}/${path}`, init);
  const data = await response.json();
  return data;
}

if (process.env.NODE_ENV !== 'development'){
  api.getCampaigns = () => api('campaigns');
  api.getCampaign = (campaignId) => api('campaigns/' + campaignId);
  api.getCampaignProjects = (campaignId) => api(`campaigns/${campaignId}/projects`);
} else {
  /**********\
  |          |
  | mock api |
  |          |
  \**********/

  const activeOne = {
    "id": "active-example",
    "name": "Spring Hackathon 2025",
    "maxVotes": 3,
    "eventDate": "2025-05-24T20:00:00Z",
    "isActive": true,
    "createdAt": "2025-03-01T12:00:00Z",
    "updatedAt": "2025-05-17T12:00:00Z"
  };


  const inactiveOne = {
    "id": "inactive-example",
    "name": "Proto Hackathon 2025",
    "maxVotes": 3,
    "eventDate": "2025-04-24T20:00:00Z",
    "isActive": false,
    "createdAt": "2025-03-01T12:00:00Z",
    "updatedAt": "2025-04-17T12:00:00Z"
  };


  const fakeOne = {
    [activeOne.id]: activeOne,
    [inactiveOne.id]: inactiveOne
  };

  const fakeProject1 =  {
    "id": "fake-project-1",
    "author": "string",
    "title": "Fake Project 1",
    "votes": 1,
    "gitUrl": "string",
  };

  const fakeProject2 =  {
    "id": "fake-project-2",
    "author": "string",
    "title": "Fake Project 2",
    "votes": 2,
    "gitUrl": "string",
  };

  
  /** mock getCampaigns */
  api.getCampaigns = async () => ({campaigns: [activeOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne, inactiveOne]})

  /** mock getCampaign */
  api.getCampaign = async (campaignId) => ({campaign: fakeOne[campaignId]});
  
  /** mock getCampaignProjects */
  api.getCampaignProjects = async (campaignId) => ({
    projects: [
      {...fakeProject1, campaignId}, 
      {...fakeProject2, campaignId}
    ]
  });
}
