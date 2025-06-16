import { URL } from "./URL"

export const deletePost = async (id: number) => {
    const response = await fetch(`${URL}/deletePost/${id}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) return data.message;

    return data;
}
