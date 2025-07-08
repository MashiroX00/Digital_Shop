"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/Components/loading";
import { getProduct } from "@/app/api/products/getProduct";
import Image from "next/image";
import Link from "next/link";
import {
  faCartShopping,
  faBoxesStacked,
  faBahtSign,
  faMoneyBill,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ProductDetailPage() {
  // initialize variable
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const checkoutUrl = '/products/checkout/' + params.id;
  useEffect(() => {
    // initialize function to fetch data
    async function fetching() {
      const response = await getProduct(params.id);
      if (response instanceof Error) {
        console.error("Error fetching product:", response);
        setIsLoading(false);
      } else {
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
      }
    }
    // call the function
    fetching();
    // cleanup function

    return () => {
      setIsLoading(true);
      setProduct(null);
    };
  }, [params.id]);
  return (
    <div className="flex flex-col mx-5 my-5 md:mx-10 md:my-10 lg:mx-20 lg:my-20">
      <Link href="/" className="text-lg md:text-xl font-bold w-fit hover:underline underline-offset-4 transition-all duration-200"><FontAwesomeIcon icon={faArrowLeft}/> Back</Link>
      <h1 className="text-lg md:text-xl font-bold">Product Detail</h1>
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
              <p className="text-xl md:text-base lg:text-2xl mt-4 break-words font-bold bg-amber-50/20 rounded-xl p-3">
                <FontAwesomeIcon icon={faBahtSign} /> {product.price} Baht
              </p>
              <p className="text-sm md:text-base lg:text-2sm mt-2 break-words font-bold bg-amber-50/10 rounded-xl p-3">
                <FontAwesomeIcon icon={faCartShopping} /> {product.sell} Sold
              </p>
              <p className="text-sm md:text-base lg:text-2sm mt-2 break-words font-bold bg-amber-50/10 rounded-xl p-3">
                <FontAwesomeIcon icon={faBoxesStacked} /> {product.stock} Item
              </p>
              {product.stock == 0 ? (
                <div>
                  <p className="text-sm md:text-base lg:text-2sm mt-2 break-words font-bold bg-yellow-500/20 rounded-xl p-3">
                    Product isn't available
                  </p>
                </div>
              ) : (
                <Link href={checkoutUrl}>
                  <div className="mt-3 font-bold rounded-xl p-3 bg-[var(--gold)]/80 w-2/3 hover:scale-110 transition-all duration-300 hover:bg-[var(--gold)]/90 hover:text-background delay-50">
                    <FontAwesomeIcon icon={faMoneyBill} /> Buy
                  </div>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
