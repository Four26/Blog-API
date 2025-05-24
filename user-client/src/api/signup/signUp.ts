// import { URL } from "../URL";
// export const signUp = async () => {
//     try {
//         const response = await fetch(`${URL}/signup`, {
//             method: "POST",
//             credentials: "include",
//             body: JSON.stringify({})
//         });
//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message);
//         }
//         return data;
//     } catch (error) {
//         console.error(error);
//     }
// }