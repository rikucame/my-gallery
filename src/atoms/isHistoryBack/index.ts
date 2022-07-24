import { atom, useRecoilState } from "recoil";

const isHistoryBackAtom = atom<boolean>({
  key: "isHistoryBack",
  default: false,
});

export const isHistoryBack = (): [boolean, () => void] => {
  const [atom, setAtom] = useRecoilState(isHistoryBackAtom);
  const customSetAtom = () => {
    !atom && setAtom(true);
  };
  return [atom, customSetAtom];
};
