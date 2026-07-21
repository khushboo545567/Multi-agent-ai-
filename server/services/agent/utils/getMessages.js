export const getMessages = async (conversationId) => {
  try {
    const { data } = await axios.get(
      `${process.env.CHAT_SERVICE_URL}/api/v1/chat/get-message/${conversationId}`,
    );
    console.log("all the messages are here :", data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
