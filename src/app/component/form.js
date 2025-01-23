"use client";
import styles from "@/app/styles/login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { url_prefix } from "../utils/constants";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Form = () => {
  const router = useRouter();
  localStorage.clear();
  const [showLoader, showLoaderFn] = useState(false);
  const [formName, setForm] = useState("login");
  const [msg_alert, msgFn] = useState({
    message: "",
    type: "",
  });
  const [user, userData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const setFormFn = (txt) => {
    userData({
      email: "",
      password: "",
      username: "",
    });
    setForm(txt);
  };

  const handleFieldChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    userData({
      ...user,
      [field]: value,
    });
  };

  const formSubmit = async (e, name) => {
    showLoaderFn(true);
    e.preventDefault();
    const url = `${url_prefix}/${formName}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user }),
      });
      const result = await response.json();
      showLoaderFn(false);
      if (response.ok) {
        router.push("/validateuser");
      } else if (response.status === 401) {
        msgFn({ message: result.message, type: "F" });
        setTimeout(() => {
          msgFn({ type: "" });
        }, 3000);
      }
    } catch (error) {}
  };

  return (
    <>
      {showLoader ? (
        <>
          <div className={styles.loader}>
            <BeatLoader
              color="#1B1833"
              loading={true}
              cssOverride={override}
              size={45}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : null}

      {msg_alert.type == "S" || msg_alert.type == "F" ? (
        <>
          <div
            className={
              msg_alert.type == "F"
                ? styles.user_msg_block_fail
                : styles.user_msg_block_pass
            }
          >
            <h3>{msg_alert.message}</h3>
          </div>
        </>
      ) : (
        <></>
      )}

      {formName == "login" ? (
        <div className={styles.form_parent}>
          <h4>Sign In</h4>
          <form
            className={styles.form_align}
            onSubmit={(e) => formSubmit(e, "login")}
          >
            <input type="hidden" name="formType" value="login" />
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={handleFieldChange}
              placeholder="Email (required)"
            />
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleFieldChange}
              placeholder="Password (required)"
              id=""
            />
            <button
              disabled={!user.email || !user.password}
              className={styles.button}
            >
              Sign In
            </button>
            <span className={styles.sign_up_prompt}>
              Don't have an account yet?{" "}
              <b
                onClick={() => setFormFn("createUser")}
                style={{ cursor: "pointer" }}
              >
                Sign up
              </b>
            </span>
          </form>
        </div>
      ) : (
        <div className={styles.form_parent}>
          <h4>Sign Up</h4>
          <form
            className={styles.form_align}
            onSubmit={(e) => formSubmit(e, "createUser")}
          >
            <input type="hidden" name="formType" value="createUser" />
            <input
              name="username"
              type="text"
              value={user.username}
              onChange={handleFieldChange}
              placeholder="User Name (required)"
            />
            <input
              name="email"
              type="email"
              value={user.email}
              onChange={handleFieldChange}
              placeholder="Email Address (required)"
              id=""
              required
            />
            <input
              name="password"
              type="password"
              value={user.password}
              onChange={handleFieldChange}
              placeholder="Password (required)"
              id=""
              required
            />
            <button
              disabled={!user.username || !user.email || !user.password}
              className={styles.button}
            >
              Sign Up
            </button>
            <span className={styles.sign_up_prompt}>
              Already have an account?{" "}
              <b
                onClick={() => setFormFn("login")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </b>
            </span>
          </form>
        </div>
      )}
    </>
  );
};

export default Form;
