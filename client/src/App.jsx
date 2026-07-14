import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";

function App() {
  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/auth/api/v1/user/login", { token });
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = async () => {
    const data = await signInWithPopup(auth, googleProvider);

    const token = await data.user.getIdToken();

    await handleLogin(token);
  };
  return (
    <div className="text-green-800  px-6 py-3">
      <button onClick={googleLogin} className="bg-green-300 px-6 py-3">
        Continue with google
      </button>
    </div>
  );
}

export default App;
