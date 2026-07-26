import api from "../../utils/axios";

export const updateConversation = async (payload) => {
  try {
    const { data } = await api.put("/chat/api/v1/chat/update-conv", payload);
    console.log("updated conversation", data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
