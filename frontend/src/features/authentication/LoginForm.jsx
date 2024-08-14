import { Link, useNavigate } from "react-router-dom";
import useTitleTab from "../../Utility/TitleTab";
import { useTheme } from "../../ui/useThemetoggler";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useLogin from "../../hooks/auth/useLogin";

function LoginForm() {
  const { theme } = useTheme;
  const { login, isPending, error } = useLogin();
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    document.documentElement.setAttribute("data-theme", theme || "dark");
  }, [theme, isAuthenticated, navigate]);

  //to give the title of the currentPage on the Tab
  useTitleTab("Comfy Store");

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    const formData = {
      email: form.get("email"),
      password: form.get("password"),
    };
    login(formData);
  }

  return (
    <div className="grid place-items-center h-screen mx-10">
      <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  dark:border-gray-300">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-2xl text-center bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold ">
            Sign in
          </h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium ">
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
              placeholder="user email"
            />
            {error?.email && <span>{error.email}</span>}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium "
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
              required
            />
          </div>
          <div className="flex items-start">
            <a
              href="#"
              className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none  focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login to your Account"
            )}
          </button>
          <div className="text-sm font-medium text-gray-500 ">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
