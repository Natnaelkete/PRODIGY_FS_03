import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createOrdersApi } from "../../services/apiOrders";

function useCreateOrders() {
  const queryClient = useQueryClient();
  const { mutate: order, isPending } = useMutation({
    mutationFn: (newOrder) => createOrdersApi(newOrder),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orders", data]);
      toast.success("Orders will arrive soon");
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { order, isPending };
}

export default useCreateOrders;
