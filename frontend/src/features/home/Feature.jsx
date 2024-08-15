import { Link } from "react-router-dom";
import useProduct from "../../hooks/products/useProduct";
import Card from "../../ui/Card";
import Spinner from "../../ui/Spinner";

function Feature() {
  const { isLoading, productData } = useProduct("products");

  if (isLoading) return <Spinner />;

  const limitedProductData = productData.products.slice(1, 4);

  return (
    <div>
      <section className="z-40 relative  md:mt-20 ">
        <div className="mx-auto ">
          <h2 className="text-3xl mb-4 font-light sm:text-4xl lg:text-5xl">
            Our
            <span className="w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-500 lg:inline">
              {" "}
              Products
            </span>{" "}
          </h2>
          <p className="mb-10 text-lg ">
            Comes directly from the desk of engineers, creators and managers at
          </p>
          <hr className="my-10 border-gray-200 dark:border-gray-700" />

          <div className=" ">
            <ul className="grid grid-cols-1 md:grid-cols-2 standard:grid-cols-3 gap-14">
              {limitedProductData?.map((item) => (
                <li key={item._id} className=" ">
                  <Link to={`product/${item._id}?name=${item.title}`}>
                    <Card
                      title={item.title}
                      price={item.price}
                      image={item.image}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Feature;
