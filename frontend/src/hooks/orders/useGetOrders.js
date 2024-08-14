import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getOrdersApi } from "../../services/apiOrders";

function useGetOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrdersApi,
    onError: (err) => toast.error(err.response.data.message),
  });

  return { orders, isLoading };
}

export default useGetOrders;
