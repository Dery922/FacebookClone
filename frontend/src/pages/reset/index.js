import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { Formik, Form, useField } from "formik";
import { useState } from "react";
import LoginInput from "../../components/inputs/loginInput/index";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";
import { useMediaQuery } from "react-responsive";

export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [conf_password, setConf_Password] = useState();
  const [visible, setVisible] = useState(0);
  const [code, setCode] = useState("");
  const [userInfos, setUserInfos] = useState();

  // const [field, meta] = useField(props);
  // const desktopView = useMediaQuery({
  //   query: "(min-width:850px)",
  // });

  // const view1050 = useMediaQuery({
  //   query: "(min-width:850px)",
  // });

  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  console.log(userInfos);

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            error={error}
            setLoading={setLoading}
            setError={setError}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}

        {visible === 1 && userInfos && (
          <SendEmail
            setError={setError}
            userInfos={userInfos}
            setVisible={setVisible}
            setLoading={setLoading}
            email={email}
            error={error}
          />
        )}

        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            setError={setError}
            error={error}
            userInfos={userInfos}
            setVisible={setVisible}
            setLoading={setLoading}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setConf_Password={setConf_Password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            setLoading={setLoading}
            setVisible={setVisible}
            userInfos={userInfos}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
