import { URL } from "./URL"

export const getComments = async (id: number) => {
    const response = await fetch(`${URL}/getComments?id=${id}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) return data.message;

    return data;
}