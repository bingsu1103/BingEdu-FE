import { Toaster } from "sonner";
import AppFooter from "./components/layout/app.footer";
import AppHeader from "./components/layout/app.header";
import { Outlet } from "react-router";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <AppHeader />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default App;
