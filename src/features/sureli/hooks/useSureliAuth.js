import { useDispatch, useSelector } from "react-redux";
import { clearAuth, setCredentials } from "../../../redux/reducers/authReducer";
import { resetGame } from "../../../redux/slices/sureli/sureliSlice";

export function useSureliAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = (name, email) => {
    dispatch(
      setCredentials({
        accessToken: "sureli-demo-token",
        user: {
          name: name?.trim() || "Ar Raihan",
          email: email?.trim() || "arraihan815@gmail.com",
          avatar: "profile",
        },
      }),
    );
  };

  const logout = () => {
    dispatch(clearAuth());
    dispatch(resetGame());
  };

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    login,
    logout,
  };
}
