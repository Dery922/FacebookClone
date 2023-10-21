import { Formik, Form } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput/index";
import * as Yup from "yup";

export default function ChangePassword({
  password,
  setPassword,
  conf_password,
  setConf_Password,
  error,
}) {
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and puntuation marks(such ! and &&"
      )
      .min(6, "Password must be atleast 6 characters")
      .max(36, "Password cant be more than 36 characters"),

    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Please Enter New Password</div>
      <Formik
        enableReinitialize
        initialValues={{ password, conf_password }}
        validationSchema={validatePassword}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_Password(e.target.value)}
              placeholder="Confirm New Password"
              bottom
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
