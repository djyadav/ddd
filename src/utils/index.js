import localStore from "./localStore";
import { DUMMY_TASKS } from "./stubs";
import If from "./If";
const populateDummyData = (override) => {
  const data = localStore.get("tasks");
  if (data && !override) return;
  localStore.update("tasks", DUMMY_TASKS);
};

export { If, populateDummyData, localStore };
