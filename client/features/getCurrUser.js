import api from "../utils/axios.js";

const getCurrUser = async () => {
  try {
    const { data } = await api.get("/auth/get-current-user");
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export default getCurrUser;
