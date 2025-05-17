
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