import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logoutApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../../features/authentication/userSlice";

function useLogout() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logged in successfully");
      dispatch(removeCredentials());
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { logout, isPending };
}

export default useLogout;
