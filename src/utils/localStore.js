const localStore = {};
localStore.update = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
  return true;
};
localStore.get = (key) => {
  const value = window.localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return false;
};

export default localStore;
