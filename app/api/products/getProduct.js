import axios from "axios";
import Swal from "sweetalert2";

export async function getProduct(id) {
    if (!id) return new Error("Product ID is required");
    const api = process.env.NEXT_PUBLIC_API_URL;
    const url = api + `products/${id}`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }else {
            return Swal.fire({icon: "error", title: "Error Getting Information of Product.", text: "please try again later.",timer: 3000, showConfirmButton: false});
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return Swal.fire({icon: "error", title: "Error Getting Information of Product.", text: "please try again later.",timer: 3000, showConfirmButton: false});
    }
}