async function fakeFetch(url, {method = 'POST', body = JSON.stringify({fake: 'data'})}) {
  await new Promise((resolve) => setTimeout(resolve), 250);
  return {ok: true, data: {url, method, body}};
}
export async function fetchEvent(eventId) {
  const response = await fakeFetch('/vote', {method: 'GET', body: JSON.stringify({eventId})})
  return response;
}

const KEY_UUID = 'uuid-voter';

export function uniqueId() {
  let id = window.localStorage.getItem(KEY_UUID);
  if (!id) {
    id = self.crypto.randomUUID();
    window.localStorage.setItem(KEY_UUID, id);
  }
  return id;
}

export function hasUniqueId() {
  const id = window.localStorage.getItem(KEY_UUID);
  return Boolean(id);
}