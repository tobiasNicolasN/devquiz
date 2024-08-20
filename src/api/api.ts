import { IFormData } from "../interfaces/types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const sendScoreData = async (data: IFormData) => {
  try {
    await fetch(`${BASE_URL}/scores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getScores = async () => {
  try {
    const res = await fetch(`${BASE_URL}/scores`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getQuestions = async () => {
  try {
    const res = await fetch(`${BASE_URL}/questions`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getResponses = async () => {
  try {
    const res = await fetch(`${BASE_URL}/responses`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
