import { URL } from "./URL"

export const userBlogs = async () => {
    const response = await fetch(`${URL}/myBlogs`, {
        method: "GET",
        credentials: "include"
    });

    const data = await response.json();

    if (!response.ok) {
        return data.message;
    }

    return data;
}