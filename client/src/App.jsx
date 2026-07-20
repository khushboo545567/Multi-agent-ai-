import { useEffect } from "react";
import Home from "./pages/Home";
import getCurrUser from "./features/getCurrUser";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./redux/slice/auth.slice";

function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const data = await getCurrUser();

      if (data) {
        dispatch(setUserData(data));
      }
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
