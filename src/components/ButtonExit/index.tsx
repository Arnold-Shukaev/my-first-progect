import { Dispatch, SetStateAction } from "react";

type Props = {
  setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>;
};
export const ButtonExit = ({ setActiveProperty }: Props): JSX.Element => {
  return <button onClick={() => setActiveProperty(null)}>Выход</button>;
};
