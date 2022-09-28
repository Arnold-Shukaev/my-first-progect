import s from "./UpdateImageUser.module.scss";

type Props = {
  stateUpdate: boolean;
  onStarted: (data: boolean) => void;
};

export const UpdateImageUser = ({
  stateUpdate,
  onStarted,
}: Props): JSX.Element => {
  if (!stateUpdate) {
    return <></>;
  }

  return (
    <div className={s.userImage}>
      Функция работы с изображением требует работы с сервером!!!
      <br />
      <br />
      Данный блок нне функционирует
      <form method="post" encType="multipart/form-data">
        <input type="file" accept="image/*" />
        <input type="submit" />
      </form>
      <br />
      <br />
      <button onClick={() => onStarted(false)}>Жмем, чтобы покинуть</button>
    </div>
  );
};
