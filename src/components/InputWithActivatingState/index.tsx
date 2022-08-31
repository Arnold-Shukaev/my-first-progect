import {
  Dispatch,
  Reducer,
  SetStateAction,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import { ButtonsForSpecialProperty } from "../ButtonsForSpecialProperty";
import { NotificationOfChange } from "../NotificationOfChange";
import s from "./InputWithActivatingState.module.scss";

type Props = {
  label: string;
  propertyName: string;
  idThing: string;
  activeProperty: HTMLDivElement | null;
  setActiveProperty: Dispatch<SetStateAction<HTMLDivElement | null>>;
  listThings: FriendsListType;
  dispatchListThings: Dispatch<ActionType>;
};
function checkingElemHeightMoreParent(elem: HTMLDivElement): boolean {
  if (elem.parentNode === null) {
    console.log(
      "Неверное применение checkingElemHeightMoreParent() в компоненте InputWithActivatingState. Нет родительского узла."
    );
    return false;
  }
  return (
    parseInt(getComputedStyle(elem).height) >
    parseInt(getComputedStyle(elem.parentNode as HTMLElement).height)
  );
}
function shortenText(elem: HTMLDivElement): void {
  if (elem.parentNode === null) {
    console.log(
      "Неверное применение shortenText() в компоненте InputWithActivatingState. Нет родительского узла."
    );
    return;
  }

  const parentParam = getComputedStyle(elem.parentNode as HTMLElement);
  const height = parseFloat(parentParam.height);
  const fontSize = parseFloat(getComputedStyle(elem).fontSize) * 1.25;
  const countString = Math.floor(height / fontSize);
  const resultHight = (countString - 1) * fontSize + "px";

  elem.style.height = resultHight;
  elem.nextElementSibling!.textContent = "Есть еще...";
}
export type StateButtonType = {
  beginEdited: boolean;
  readingNotSavedData: boolean;
  thisNotSaved: boolean;
};
const initialStateButton: StateButtonType = {
  beginEdited: false,
  readingNotSavedData: false,
  thisNotSaved: true,
};
export type ActionButtonType = {
  key: "beginEdited" | "readingNotSavedData" | "thisNotSaved";
  value: boolean;
};
const reducerStateButton: Reducer<StateButtonType, ActionButtonType[]> = (
  state,
  action
): StateButtonType => {
  action.forEach((rule) => {
    const { key, value } = rule;
    state[key] = value;
  });
  return { ...state };
};

export const InputWithActivatingState = ({
  label,
  propertyName,
  idThing,
  activeProperty,
  setActiveProperty,
  listThings,
  dispatchListThings,
}: Props) => {
  const revText = useRef<HTMLDivElement>(null);
  const refAllBlock = useRef<HTMLDivElement>(null);
  const [editableValue, setEditableValue] = useState<string>("");
  const [stateButton, dispatchStateButton] = useReducer(
    reducerStateButton,
    initialStateButton
  );
  const { beginEdited, readingNotSavedData, thisNotSaved } = stateButton;

  //TODO: на сколько корректно так делать?
  //Я создал отдельный state и слушатель, чтобы делать ререндер компонента при изменении размера экрана
  const [state, setState] = useState({
    h: document.documentElement.clientHeight,
    w: document.documentElement.clientWidth,
  });
  useEffect(() => {
    function listener() {
      setState({
        h: document.documentElement.clientHeight,
        w: document.documentElement.clientWidth,
      });
    }
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  });

  const textMode = () => {
    if (beginEdited) return editableValue;
    if (readingNotSavedData && !thisNotSaved)
      return listThings[idThing][propertyName] || "";
    if (readingNotSavedData && thisNotSaved)
      return listThings[idThing][propertyName + "NotSaved"];
    return listThings[idThing][propertyName] || "";
  };

  // Сокращение длинны текста в блоке при превышении
  useEffect(() => {
    if (revText.current === null) return;
    if (selectThisProperty) return;

    let textarea = revText.current.children[0];
    (textarea as HTMLTextAreaElement).style.height =
      textarea.scrollHeight + "px";
    if (checkingElemHeightMoreParent(revText.current)) {
      shortenText(revText.current);
    }

    return () => {
      if (revText.current === null) return;
      (textarea as HTMLTextAreaElement).style.height = "100%";
      revText.current!.style.height = "auto";
      revText.current!.nextElementSibling!.textContent = "";
    };
  });

  let selectThisProperty = false;
  if (refAllBlock.current) {
    selectThisProperty = activeProperty === refAllBlock.current.parentNode;
  }
  useEffect(() => {
    if (selectThisProperty) {
      refAllBlock.current!.classList.add(s.activeDiv);
      revText.current!.children[0].classList.add(s.activeTextarea);
    }

    return () => {
      if (refAllBlock.current) {
        refAllBlock.current!.classList.remove(s.activeDiv);
        revText.current!.children[0].classList.remove(s.activeTextarea);
      }
    };
  });

  //TODO: ID наверное не рекомендуется использовать вообще?
  return (
    <>
      <label htmlFor={propertyName + "InputWithActivatingState"}>
        <h4 className={s.labelProperty}>
          <NotificationOfChange
            propertyValue={Boolean (listThings[idThing][propertyName + 'NotSaved'])}
          />
          {label}
        </h4>
      </label>
      <div
        className={s.textProperty}
        ref={refAllBlock}
        id={propertyName + "InputWithActivatingState"}
        onClick={() => {
          if (!selectThisProperty)
            setActiveProperty(
              refAllBlock.current!.parentNode as HTMLDivElement
            );
        }}
      >
        <div ref={revText} className={s.textBlock}>
          <textarea
            id={idThing + propertyName}
            readOnly={!beginEdited}
            className={s.placeForText}
            onChange={(e) => setEditableValue(e.target.value)}
            value={textMode()}
          />
        </div>

        <div className={s.moreText}></div>

        {selectThisProperty && (
          <ButtonsForSpecialProperty
            idThing={idThing}
            listThings={listThings}
            nameProperty={propertyName}
            editableValue={editableValue}
            setActiveProperty={setActiveProperty}
            dispatchStateButton={dispatchStateButton}
            stateButton={stateButton}
            setEditableValue={setEditableValue}
            dispatchListThings={dispatchListThings}
            readingNotSavedData={readingNotSavedData}
            setReadingNotSavedData={setReadingNotSavedData}
          />
        )}
      </div>
    </>
  );
};
