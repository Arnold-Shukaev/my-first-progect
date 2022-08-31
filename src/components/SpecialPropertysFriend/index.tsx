import { Dispatch, SetStateAction, useEffect } from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import { InputWithActivatingState } from "../InputWithActivatingState";
import { Stars } from "../Stars";
import s from "./SpecialPropertysFriend.module.scss";

type Props = {
  idThing: string | null;
  activeProperty: HTMLDivElement | null;
  setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>;
  listThings: FriendsListType;
  dispatchListThings: Dispatch<ActionType>;
};

//Настройка блоков (index listLabel должен соответствовать index listPropertyName)
const listLabel: string[] = [
  "Что любит",
  "Что не любит",
  "Назначенные встречи",
];
const listPropertyName: string[] = ["Like", "NotLike", "Meetings"];

export const SpecialPropertyFriend = ({
  idThing,
  activeProperty,
  setActiveProperty,
  listThings,
  dispatchListThings,
}: Props) => {
  useEffect(() => {
    if (activeProperty) activeProperty.classList.add(s.activeElement);

    return () => {
      if (activeProperty) activeProperty.classList.remove(s.activeElement);
    };
  }, [activeProperty]);

  if (!idThing) return <></>;
  return (
    <div className={s.additionally}>
      {activeProperty ? null : (
        <div className={s.specialProperty}>
          <h4 className={s.myScore}>Моя оценка</h4>
          <Stars/>
        </div>
      )}

      {listLabel
        .map((label, id) => {
          return (
            <div
              key={id}
              data-special-property-name={listPropertyName[id]}
              data-special-property-label={label}
              className={s.specialProperty}
            >
              <InputWithActivatingState
                label={label}
                propertyName={listPropertyName[id]}
                idThing={idThing}
                activeProperty={activeProperty}
                setActiveProperty={setActiveProperty}
                listThings={listThings}
                dispatchListThings={dispatchListThings}
              />
            </div>
          );
        })
        .filter((elem) => {
          if (!activeProperty) return true;
          if (
            elem.props["data-special-property-name"] ===
            activeProperty.dataset.specialPropertyName
          )
            return true;
          return false;
        })}
    </div>
  );
};
