import { atom } from "recoil";

export const isHistoryBack = atom<boolean>({
  key: "isHistoryBack",
  default: false,
});
