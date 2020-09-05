import localStore from "./localStore";
import { DUMMY_TASKS_2, DUMMY_TASKS_3, DUMMY_TASKS_4 } from "./stubs";
import If from "./If";
const populateDummyData = (override) => {
  const data = localStore.get("two_column");
  if (data && !override) return;
  localStore.update("two_column", DUMMY_TASKS_2);
  localStore.update("three_column", DUMMY_TASKS_3);
  localStore.update("four_column", DUMMY_TASKS_4);
};

export { If, populateDummyData, localStore };
