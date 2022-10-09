import { RefObject, useEffect, useRef } from "react";
import { atom, useRecoilState } from "recoil";

const memoScrollLeftAtom = atom<number>({
  key: "memoScrollLeft",
  default: 0,
});

export const memoScrollLeft = (
  elm: RefObject<HTMLDivElement>
): [number, () => void, () => void] => {
  const [atom, setAtom] = useRecoilState(memoScrollLeftAtom);
  const amount = useRef<number>(0);

  const updateAmount = () => {
    amount.current = elm.current!.scrollLeft;
  };

  const customSetAtom = () => {
    setAtom(amount.current);
  };

  const doScroll = () => {
    elm.current!.scrollLeft = atom;
  };
  useEffect(() => {
    elm.current?.addEventListener("scroll", updateAmount);
    return elm.current?.removeEventListener("scroll", updateAmount);
  }, []);

  return [atom, customSetAtom, doScroll];
};
