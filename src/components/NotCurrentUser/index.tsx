import { Link } from "react-router-dom";
import s from "./NotCurrentUser.module.scss";

export const NotCurrentUser = () => {
  return (
    <div className={s.layout}>
      <div>
        <div>Сначала необходимо</div>
        <br />
        <Link to="/Profile">
          <span>авторизироваться</span>
        </Link>
      </div>
    </div>
  );
};
