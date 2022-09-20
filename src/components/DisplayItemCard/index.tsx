import { ButtonAddFriend } from "../ButtonAddFriend";
import s from "./DisplayItemCard.module.scss";

type Props = {
  fieldForDisplay: string[];
  nameForField: string[];
  selectedThing: Record<string, string> | null;
};

function firstLetter(word: string): string {
  if (word === "") return ".";
  return word[0].toUpperCase();
}

export const DisplayItemCard = ({
  fieldForDisplay,
  nameForField,
  selectedThing,
}: Props): JSX.Element => {
  if (selectedThing === null) {
    return (
      <div className={s.message}>
        Тут будут сведения о вашем потенциальном друге
      </div>
    );
  }

  const initials =
    firstLetter(selectedThing.fName) + firstLetter(selectedThing.sName);
  return (
    <>
      <ButtonAddFriend selectedThing={selectedThing} />
      <div className={s.imageThing}>
        <div>{initials}</div>
      </div>

      {fieldForDisplay.map((nameField, id) => (
        <div key={id} className={s.paramThing}>
          <span>{nameForField[id]}:</span> {selectedThing[nameField]}
        </div>
      ))}
    </>
  );
};
