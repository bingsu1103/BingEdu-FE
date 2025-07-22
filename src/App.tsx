import AppFooter from "./components/layout/app.footer";
import AppHeader from "./components/layout/app.header";
import { Outlet } from "react-router";

const App = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default App;
