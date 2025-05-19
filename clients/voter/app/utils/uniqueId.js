
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

export function getHasVoted(campaignId) {
  const id = uniqueId();
  const hasVoted = window.localStorage.getItem(`voted-${id}-${campaignId}`);
  return Boolean(hasVoted)
}

export function setHasVoted(campaignId) {
  const id = uniqueId();
  window.localStorage.setItem(`voted-${id}-${campaignId}`, 'true')
}