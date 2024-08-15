import { useState } from "react";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useTheme } from "../../ui/useThemetoggler";

import Spinner from "../../ui/Spinner";
import ProductList from "./ProductLists";
import ProductGrid from "./ProductGrids";
import ProductRange from "./ProductRange";
import Pagination from "../../ui/Pagination";
import useProduct from "../../hooks/products/useProduct";

function Product() {
  const { dark } = useTheme();
  console.log(dark);
  const [layout, setLayout] = useState("list");

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { productData: data, isLoading } = useProduct({
    maxPrice: searchParams.get("maxPrice"),
    shipping: searchParams.get("shipping"),
    search: searchParams.get("search") || "",
  });
  console.log(data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newSearchParams = {
      search: formData.get("search"),
      maxPrice: formData.get("price"),
      shipping: formData.get("shipping") === "on" ? true : false,
    };

    const queryString = new URLSearchParams(newSearchParams).toString();
    const newUrl = `${window.location.pathname}?${queryString}`;

    navigate(newUrl);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        method="POST"
        className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 ${
          dark ? "dark:bg-gray-900 " : "bg-slate-300 "
        }  p-8 gap-14 rounded-lg bg-opacity-30`}
      >
        <div>
          <label className="form-control  max-w-full ">
            <div className="label">
              <span className="label-text">Search</span>
            </div>
            <input
              type="text"
              name="search"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-full"
            />
          </label>
        </div>
        <div>
          <ProductRange />
        </div>
        <div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <span className="label-text">Free shipping</span>
              <input
                type="checkbox"
                name="shipping"
                className="checkbox checkbox-accent"
              />
            </label>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-sm  btn-success w-full">
            Search
          </button>
        </div>
        <div>
          <button type="reset" className="btn btn-sm  btn-warning w-full">
            Reset
          </button>
        </div>
      </Form>

      <div className="mt-10">
        <div className="flex justify-between">
          <h1 className=" font-inter ">22 products </h1>
          <div className="flex gap-3">
            <BsFillGridFill
              className="h-8 w-8 rounded-full p-1 hover:bg-gray-500"
              onClick={() => setLayout("list")}
            />
            <BsList
              className="h-8 w-8 rounded-full p-1 hover:bg-gray-500"
              onClick={() => setLayout("grid")}
            />
          </div>
        </div>
        <hr className="mb-20 mt-5 border-gray-200 dark:border-gray-700" />
        {layout === "list" ? (
          <ProductGrid productData={data.products} />
        ) : (
          <ProductList productData={data.products} />
        )}
      </div>
      <Pagination productData={data} />
    </>
  );
}

export default Product;
