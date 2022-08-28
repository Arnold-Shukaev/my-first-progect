import "./App.scss";
import { Router } from "./components/Router";
import { Authorization } from "./pages/Authorization";
import { Friends } from "./pages/Friends";
import { Home } from "./pages/Home";

const descriptionRoute = [
  {
    pathInBrowser: "/",
    nameInMenu: "Home",
    componentForVisualisation: <Home />,
  },
  {
    pathInBrowser: "/friends",
    nameInMenu: "Friends",
    componentForVisualisation: <Friends />,
  },
  {
    pathInBrowser: "/authorization",
    nameInMenu: "Authorization",
    componentForVisualisation: <Authorization />,
  },
];

function App() {
  return <Router descriptionRoute={descriptionRoute}></Router>;
}

export default App;
