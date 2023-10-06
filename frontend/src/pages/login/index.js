import "./style.css";
import LoginForm from "../../components/login/LoginForm";
import LoginFooter from "../../components/login/LoginFooter";
import RegisterForm from "../../components/login/RegisterForm";
import { useState } from "react";

export default function Login() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm setVisible={setVisible} />
        {visible && <RegisterForm setVisible={setVisible} />}
        <LoginFooter />
      </div>
    </div>
  );
}
