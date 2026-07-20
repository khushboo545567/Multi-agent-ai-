import api from "../../utils/axios";

const getConversation = async () => {
  try {
    const { data } = await api.get("/chat/api/v1/chat/get-conv");
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export default getConversation;
