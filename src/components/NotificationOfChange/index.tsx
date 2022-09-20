import s from "./NotificationOfChange.module.scss";
type Props = {
  propertyValue: boolean;
};

export const NotificationOfChange = ({ propertyValue }: Props): JSX.Element => {
  const handlerMove = () => {};
//TODO: Что это?
  return (
    <>
      {!propertyValue ? null : (
        <div
          className={s.notificationOfChange}
          onPointerMove={() => handlerMove()}
        ></div>
      )}
    </>
  );
};
