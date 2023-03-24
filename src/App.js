import { useRoutes } from "react-router";
import Routes from "./routes/Routes";

const App = () => {
  const appRoutes = useRoutes(Routes());

  return appRoutes;
};

export default App;
