import "./App.scss";
import { Router } from "./components/Router";
import { Profile } from "./pages/Profile";
import { Friends } from "./pages/Friends";
import { Home } from "./pages/Home";
import { useState } from "react";
import { CurrentUserContext } from "./shared";

function App() {
  const [currentUser, setCurrentUser] = useState<null | number>(null);

  const descriptionRoute = [
    {
      pathInBrowser: "/",
      nameInMenu: "Home",
      componentForVisualization: <Home />,
    },
    {
      pathInBrowser: "/friends",
      nameInMenu: "Friends",
      componentForVisualization: <Friends />,
    },
    {
      pathInBrowser: "/profile",
      nameInMenu: "Profile",
      componentForVisualization: <Profile />,
    },
  ];
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router descriptionRoute={descriptionRoute}></Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
