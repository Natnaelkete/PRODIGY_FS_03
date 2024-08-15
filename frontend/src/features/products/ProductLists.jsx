import { Link } from "react-router-dom";
// import useProduct from "../../Utility/useProduct";
import { formatCurrency } from "../../Utility/helpers";

function ProductList({ productData }) {
  return (
    <div>
      <ul className="grid grid-row standard:grid-row gap-14 ">
        {productData?.map((item) => (
          <li key={item._id}>
            <Link to={`${item._id}?name=${item.title}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shadow-lg rounded-lg p-4">
                <img
                  src={item.image}
                  className="h-[200px] sm:h-[150px] sm:w-[200px] w-full rounded-md"
                />
                <div className="mr-20">
                  <div>{item.title}</div>
                  <div>{item.company}</div>
                </div>

                <div className="flex mt-5 md:justify-end">
                  {formatCurrency(item.price)}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
