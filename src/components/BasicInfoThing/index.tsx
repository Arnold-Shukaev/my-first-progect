import s from "./BasicInfoThing.module.scss";

type Props = {
  thing: { [prop: string]: string } | null;
  paramForDisplay: string[];
  nameParamForDisplay: string[];
};

export const BasicInfoThing = ({
  thing,
  paramForDisplay,
  nameParamForDisplay,
}: Props): JSX.Element => {
  if (thing === null) return <></>;
  return (
    <div className={s.basicInfo}>
      {paramForDisplay.map((param, id) => (
        <div key={id}>
          <span>{nameParamForDisplay[id]}:</span> {thing[param]}
        </div>
      ))}
    </div>
  );
};
