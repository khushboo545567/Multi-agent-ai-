import React from "react";
import api from "../../utils/axios";

async function sendMessage(payload) {
  try {
    const { data } = await api.post("/agent/api/v1/agent/chat", payload);
    console.log(payload);
    return data;
  } catch (error) {
    console.log(error);
  }
}
export default sendMessage;
