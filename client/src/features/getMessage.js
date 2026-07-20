import React from "react";
import api from "../../utils/axios";

async function getMessage(id) {
  try {
    const { data } = await api.get(`/chat/api/v1/chat/get-message/${id}`);

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
