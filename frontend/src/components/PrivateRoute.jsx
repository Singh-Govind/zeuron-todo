import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";

function PrivateRoute({ children }) {
  const { user } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);

  return children;
}

export default PrivateRoute;
