import api from "../utils/axios.js";

const getCurrUser = async () => {
  try {
    const { data } = await api.get("/auth/get-current-user");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export default getCurrUser;
