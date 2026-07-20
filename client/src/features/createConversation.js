import api from "../../utils/axios";

const createConversation = async () => {
  try {
    const { data } = await api.post("/chat/api/v1/chat/create-conv");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default createConversation;
