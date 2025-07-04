import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export async function updateUserInfo(displayname,email) {
    const user = JSON.parse(localStorage.getItem('user'));
    const name = displayname || user.displayname;
    const {id,updatedAt} = user;
    const em = email || user.email;
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL + "users/";
        const response = await axios.put(apiUrl, {id,"displayname": name, "email" : em,updatedAt});
        const result = response.data
        localStorage.setItem('token',result.token);
        localStorage.setItem('user',JSON.stringify(result.data));
        Swal.fire({
            icon: "success",
            title: "Changed successfully",
            toast: true,
            position: "top-end",
            timer: 1500,
            showConfirmButton: false
        })
        return result;
    } catch (error) {
        console.error({name,em},"error",error);
        Swal.fire({
            icon: "error",
            title: "Changed failed.",
            toast: true,
            position: "top-end",
            timer: 1500,
            showConfirmButton: false
        })
        return []
    }
}