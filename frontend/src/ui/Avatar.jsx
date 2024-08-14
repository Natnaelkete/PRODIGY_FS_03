import { useDispatch } from "react-redux";
import useLogout from "../hooks/auth/useLogout";
import { removeCredentials } from "../features/authentication/userSlice";

function Avatar() {
  const dispatch = useDispatch();
  const { logout } = useLogout();

  function handleClick() {
    dispatch(removeCredentials());
    logout();
  }

  return (
    <span>
      <div>
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button">
            <div className="avatar">
              <div className="w-8 mr-3 text-center rounded-full ring  ring-success ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3  z-50 card card-compact dropdown-content w-30 bg-base-100 shadow"
          >
            <div className="card-body">
              <span>Profile</span>
              <div className="card-actions">
                <button
                  onClick={handleClick}
                  className="btn btn-sm btn-warning "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
}

export default Avatar;
