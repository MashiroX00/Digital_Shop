import axios from "axios";
import Swal from "sweetalert2";

export async function getUserInfo() {
    try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "auth/me";
        // The token should be sent in headers, not as a GET body
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const result = response.data;
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.data));
        return response.data;
    } catch (error) {
        localStorage.clear();
        Swal.fire({
            icon: "error",
            title: "Oops..",
            text: error?.response?.data?.message || error.message || String(error)
        });
        return [];
    }
}