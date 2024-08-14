import { useSelector } from "react-redux";
import { formatCurrency } from "../../Utility/helpers";
import { useNavigate } from "react-router-dom";
import useGetOrders from "../../hooks/orders/useGetOrders";

function Order() {
  // const checkout = useSelector((state) => state.checkout.info);
  // const cart = useSelector((state) => state.cart.orders);
  const { orders } = useGetOrders();
  console.log(orders);

  const { info } = JSON.parse(localStorage.getItem("info")) || {
    info: [],
    address: "",
  };

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  if (!isAuthenticated) return navigate("/");

  return (
    <div>
      <div className="overflow-x-auto">
        {orders?.length === 0 || info.length === 0 ? (
          <h1 className="text-xl">No orders yet</h1>
        ) : (
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Address</th>
                <th>Products</th>
                <th>Cost</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((item) => (
                <tr key={item._id}>
                  <td></td>
                  <td>{item.user.name}</td>
                  <td>{item.address}</td>
                  <td>{item.cart.map((prod) => prod.title).join(", ")}</td>
                  <td>
                    {formatCurrency(
                      item.cart
                        .map((prod) => prod.price)
                        .reduce((acc, curr) => acc + curr, 0)
                    )}
                  </td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Order;
