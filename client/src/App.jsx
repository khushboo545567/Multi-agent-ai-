import { useEffect } from "react";
import Home from "./pages/Home";
import getCurrUser from "../features/getCurrUser";

function App() {
  useEffect(() => {
    const getUser = async () => {
      getCurrUser();
    };
    getUser();
  }, []);
  return (
    <>
      <Home />
    </>
  );
}

export default App;
