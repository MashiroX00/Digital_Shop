"use client";
import { LoginContext } from "@/app/layout";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useContext, useMemo } from "react";
import Swal from "sweetalert2";
import Loading from "@/app/Components/loading";
import { getProduct } from "@/app/api/products/getProduct";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { debounce } from "lodash";
import {
  faArrowLeft,
  faTag,
  faBahtSign,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function CheckoutPage() {
  const { isLogin, isAuth } = useContext(LoginContext);
  const params = useParams();
  const id = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [copon, setCopon] = useState("");
  const router = useRouter();

  const discountChecking = useMemo(
    () =>
      debounce((value) => {
        console.log(value);
      }, 500),
    []
  );

  function coponFieldHandler(e) {
    const value = e.target.value;
    setCopon(value);
    discountChecking(value);
  }

  useEffect(() => {
    if (isAuth) {
      if (!isLogin) {
        Swal.fire({
          icon: "info",
          title: "You must login first.",
          text: "Redirect to home page in 3s.",
          timer: 3000,
        }).then(
          setTimeout(() => {
            router.push("/");
          }, 3000)
        );
      }
    }
  }, [isAuth, isLoading]);

  useEffect(() => {
    async function getinfo() {
      try {
        const response = await getProduct(id);
        //set product info
        setProduct({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          stock: 1,
          sell: response.data.selled,
          imgUrl:
            process.env.NEXT_PUBLIC_API_PICTURE_URL + response.data.imgUrl ||
            "exampleItem.png",
        });
        setIsLoading(false);
      } catch (error) {
        Swal.fire({ icon: "error", title: "Something went wrongs" });
      }
    }
    if (isLogin) {
      getinfo();
    }
  }, [isAuth, isLogin]);
  return (
    <div className="flex flex-col h-screen mx-5 my-5 md:mx-10 md:my-10 lg:mx-20 lg:my-20">
      <Link
        href="/"
        className="text-lg md:text-xl font-bold w-fit hover:underline underline-offset-4 transition-all duration-200"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h1 className="text-lg md:text-xl font-bold">Checkout</h1>
      <div className="mt-5 bg-amber-50/20 w-full px-5 py-5 rounded-lg">
        {isLoading ? (
          <div className="flex h-full">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full max-w-lg h-82 overflow-hidden rounded-lg">
              <Image
                src={product.imgUrl}
                alt={product.name}
                width={350}
                height={350}
                className="object-cover w-full h-full"
                priority={false}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mt-4 break-words">
                {product.name}
              </h2>
              <p className="text-sm md:text-base lg:text-2sm mt-2 break-words text-gray-300">
                {product.description}
              </p>
              <div className="text-sm md:text-base lg:text-lg mt-2 break-words font-bold bg-amber-50/10 rounded-xl p-3">
                <FontAwesomeIcon icon={faTag} className="mr-2" />
                <span>Discount:</span>
                <input
                  className="mx-1 outline-none bg-amber-50/30 rounded-xl pl-2"
                  onChange={coponFieldHandler}
                />
              </div>
              <p className="text-xl md:text-base lg:text-2xl mt-2 break-words font-bold bg-amber-50/5 rounded-xl p-3 text-end">
                Total <FontAwesomeIcon icon={faBahtSign} />
                {product.price} Baht
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
