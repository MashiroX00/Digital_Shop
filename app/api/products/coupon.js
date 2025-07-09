import axios from "axios";
import Swal from "sweetalert2";

export async function proceedDiscout(cpname, pid) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "coupon/";
    const response = await axios.get(url, {
      params: {
        cpname,
        pid,
      },
    });
    const result = response.data;
    Swal.fire({
      icon: "success",
      title: result.message,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
    return result;
  } catch (error) {
     Swal.fire({
        icon: "error",
        title: error.response.data.message,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
  }
  return false;
}
