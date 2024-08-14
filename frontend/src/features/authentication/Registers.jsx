import { Link } from "react-router-dom";
import useTitleTab from "../../Utility/TitleTab";
import useSignup from "../../hooks/auth/useSignup";

function Registers() {
  const { signup, isPending, error } = useSignup();

  //to give the title of the currentPage on the Tab
  useTitleTab("Comfy Store");

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const formData = {
      username: form.get("username"),
      email: form.get("email"),
      password: form.get("password"),
    };
    console.log(formData);
    signup(formData);
  }

  return (
    <div>
      <div className="grid place-items-center h-screen mx-10">
        <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8  dark:border-gray-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-2xl text-center bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-semibold ">
              Sign up
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium "
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="Username"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
                placeholder="username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-500  "
                placeholder="email"
                required
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

            <button
              type="submit"
              disabled={isPending}
              className="text-white w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none  focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "REGISTER"
              )}
            </button>
            <div className="text-sm text-center font-medium text-gray-500 ">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registers;
