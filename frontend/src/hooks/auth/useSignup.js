import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { signupApi } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authentication/userSlice";
import { useNavigate } from "react-router-dom";

function useSignup() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending,
    error,
  } = useMutation({
    mutationFn: (formData) => signupApi(formData),
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], data);
      toast.success("Account created successfully");
      dispatch(setCredentials(data));
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { signup, isPending, error };
}

export default useSignup;
