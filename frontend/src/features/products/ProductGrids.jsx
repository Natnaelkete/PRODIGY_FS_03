import { Link } from "react-router-dom";
import Card from "../../ui/Card";

function ProductGrid({ productData }) {
  return (
    <div>
      <ul className="grid grid-cols-1 standard:grid-cols-3 gap-4">
        {productData?.map((item) => (
          <li key={item._id}>
            <Link to={`${item._id}?name=${item.title}`}>
              <Card title={item.title} price={item.price} image={item.image} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductGrid;
