import { ButtonAddFriend } from "../ButtonAddFriend";
import s from "./DisplayItemCard.module.scss";

type Props = {
  fieldForDisplay: string[];
  nameForField: string[];
  selectedThing: any; // Тип
  //ОК
};

function firstLetter(word: string): string {
  return word[0].toUpperCase(); // Строка может быть пустой же? Будет ошибка
  //АА. С точки зрения всевозможных вероятностей да. НО: selectedThing принимает либо выбранного человека (друга), а у него по определению
  //есть и то и другое, либо принимает null. Тогда, при диструктуризации значениям присваивается ".". Таки, не Должна она быть пустой  
}

export const DisplayItemCard = ({
  fieldForDisplay,
  nameForField,
  selectedThing,
}: Props) => {
  const { fName = ".", sName = "." } = { ...selectedThing }; // Зачем тут диструктуризация?
  //АА. Просто, чтобы не обращаться через selectedThing. Для наглядности
  const initials = firstLetter(fName) + firstLetter(sName);

  if (selectedThing === null) { // Вынеси эту проверку выше, перед тем как пытаешься читать из selectedThing
    //ОК
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
