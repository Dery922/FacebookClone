import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./style.css";
import LoginInput from "../../components/home/Inputs/loginInput/index";
import { useState } from "react";

const logininfos = {
  email: "",
  password: "",
};

export default function Login() {
  const [login, setLogin] = useState(logininfos);

  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string().required(),
  });

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>Franklin Facebook Clone From Beginning to Expect</span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidation}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      name="email"
                      type="email"
                      placeholder="Enter your Email"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      name="password"
                      type="password"
                      placeholder="Enter your Password"
                      onChange={handleLoginChange}
                    />
                    <button type="Submit" className="blue_btn">
                      Log In
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                forgotten Password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              Create a Page for a celebrity, brand or business
            </Link>
          </div>
        </div>
      </div>
      <div className="register">Register</div>
    </div>
  );
}
