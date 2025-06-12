import { URL } from "./URL";

export const getPosts = async () => {
    const response = await fetch(`${URL}/getPost`, {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        return data.message;
    }
    return data;
}