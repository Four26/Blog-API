import { URL } from "./URL"

export const getUserPosts = async () => {
    const response = await fetch(`${URL}/getUserPosts`, {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) return data.message;

    return data;
};