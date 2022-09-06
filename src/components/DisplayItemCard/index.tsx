import { ButtonAddFriend } from "../ButtonAddFriend";
import s from "./DisplayItemCard.module.scss";

type Props = {
  fieldForDisplay: string[];
  nameForField: string[];
  selectedThing: any; // Тип
};

function firstLetter(word: string): string {
  return word[0].toUpperCase(); // Строка может быть пустой же? Будет ошибка
}

export const DisplayItemCard = ({
  fieldForDisplay,
  nameForField,
  selectedThing,
}: Props) => {
  const { fName = ".", sName = "." } = { ...selectedThing }; // Зачем тут диструктуризация?
  const initials = firstLetter(fName) + firstLetter(sName);

  if (selectedThing === null) { // Вынеси эту проверку выше, перед тем как пытаешься читать из selectedThing
    return (
      <div className={s.message}>
        Тут будут сведения о вашем потенциальном друге
      </div>
    );
  }
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
