import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authentication/userSlice";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: (formData) => loginApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", data]);
      toast.success("Logged in successfully");
      dispatch(setCredentials(data));
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { login, isPending, error };
}

export default useLogin;
