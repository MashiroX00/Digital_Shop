import axios from "axios";

export async function getProducts () {
    const api = process.env.NEXT_PUBLIC_API_URL;
    const apiUrl = api+"products/";
    const response = await axios.get(apiUrl);
    const data = response.data;
    return Array.isArray(data.data) ? data.data : [];
}