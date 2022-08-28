import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ActionType, FriendsListType } from "../../pages/Friends";
import { ButtonsForSpecialProperty } from "../ButtonsForSpecialProperty";
import s from "./InputWithActivatingState.module.scss";

type Props = {
  label: string;
  propertyName: string;
  idThing: string;
  activeProperty: HTMLDivElement | null; //!!!!!!!!!!!!!!!
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
  const [textBeginEdited, setTextBeginEdited] = useState<boolean>(false);
  const [editableValue, setEditableValue] = useState<string>("");

  //TODO: на сколько корректно так делать?
  //Я создал отдельный state и слушатель, чтобы делать перерендер компонента при изменении размера экрана
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

  // Сокращение длинны текста в блоке при превышении
  useEffect(() => {
    if (revText.current === null) return;
    if (checkSelectThis) return;

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
  let checkSelectThis = false;

  if (refAllBlock.current) {
    checkSelectThis = activeProperty === refAllBlock.current!.parentNode;
  }

  useEffect(() => {
    if (checkSelectThis) {
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

  const arr: any = [
    { textBeginEdited },
    {
      ["listThings[idThing][propertyName]"]: listThings[idThing][propertyName],
    },
  ];
  console.log(arr);

  //TODO: ID наверное не рекомендууется использовать вообще?
  return (
    <>
      <label htmlFor={propertyName + "InputWithActivatingState"}>
        <h4>{label}</h4>
      </label>
      <div
        className={s.textProperty}
        ref={refAllBlock}
        id={propertyName + "InputWithActivatingState"}
        onClick={() => {
          if (!checkSelectThis)
            setActiveProperty(
              refAllBlock.current!.parentNode as HTMLDivElement
            );
        }}
      >
        <div ref={revText} className={s.textBlock}>
          <textarea
            id={idThing + propertyName}
            readOnly={!textBeginEdited}
            className={s.plaseForText}
            onChange={(e) => setEditableValue(e.target.value)}
            value={
              textBeginEdited
                ? editableValue
                : listThings[idThing][propertyName] || ""
            }
          />
        </div>
        <div className={s.moreText}></div>
        {checkSelectThis && (
          <ButtonsForSpecialProperty
            idThing={idThing}
            nameProperty={propertyName}
            editableValue={editableValue}
            setActiveProperty={setActiveProperty}
            setTextBeginEdited={setTextBeginEdited}
            textBeginEdited={textBeginEdited}
            setEditableValue={setEditableValue}
            listThings={listThings}
            dispatchListThings={dispatchListThings}
          />
        )}
      </div>
    </>
  );
};
