import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import style from "./Router.module.scss";

type Props = {
  descriptionRoute: {
    pathInBrowser: string;
    nameInMenu: string;
    componentForVisualisation: JSX.Element;
  }[];
};
// {pathInBrowser, nameInMenu, componentForVisialization}

export const Router = ({ descriptionRoute }: Props) => {
  return (
    <BrowserRouter>
      <ul className={style.router}>
        {descriptionRoute.map(({ pathInBrowser, nameInMenu }, id) => (
          <li key={id}>
            <Link to={pathInBrowser}>
              <span>{nameInMenu}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Routes>
        {descriptionRoute.map(
          ({ pathInBrowser, componentForVisualisation }, id) => (
            <Route
              key={id}
              path={pathInBrowser}
              element={componentForVisualisation}
            />
          )
        )}
      </Routes>
    </BrowserRouter>
  );
};
