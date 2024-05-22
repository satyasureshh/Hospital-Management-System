// Desc: Private route for the application
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/feature/alertSlice";
import { setUser } from "../redux/feature/userSlice";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUser",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        console.log("it dont works");
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoute;
