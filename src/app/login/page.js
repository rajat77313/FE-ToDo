import styles from "@/app/styles/login.module.css";
import { redirect } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import {url_prefix} from "../utils/constants"
const font = Space_Grotesk({ subsets: ["latin"], weight: "400" });

async function handleForm(formData) {
  "use server";
  const action = formData.get("formType");
  const url = `${url_prefix}/${action}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
    cache: "no-store",
  });

  if (response.ok) {
    console.log("response is okay");
    redirect("/validateuser");
  }

  return { error: "Authentication failed" };
}

const Login = () => {
  return (
    <>
      <div className={styles.class1}>
        <div className={styles.title_container}>
          <h2 className={`${font.className} ${styles.welcome_txt}`}>
            Welcome to ToDo Tracker.{" "}
          </h2>
          <div className={styles.website_description}>
            <h3 className={font.className}>
              <span style={{ color: "#D7E9B9" }}>Create</span>Todo.{" "}
            </h3>
            <h3 className={font.className}>
              <span style={{ color: "#FFE15D" }}>Edit</span> Todo.
            </h3>
            <h3 className={font.className}>
              <span style={{ color: "#DC3535" }}>Delete</span> Todo.
            </h3>
          </div>
        </div>
        <div className={styles.class2}>
          <div className={styles.form_parent}>
            <h4>Sign In</h4>
            <form className={styles.form_align} action={handleForm}>
              <input type="hidden" name="formType" value="login" />
              <input
                type="text"
                name="email"
                placeholder="Email"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                id=""
              />
              <button className={styles.button}>Sign In</button>
            </form>
          </div>
          <h2 className={styles.or_btn}>OR</h2>
          <div className={styles.form_parent}>
            <h4>Sign Up</h4>
            <form className={styles.form_align} action={handleForm}>
              <input type="hidden" name="formType" value="createUser" />
              <input name="username" type="text" placeholder="User Name" />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                id=""
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                id=""
              />
              <button className={styles.button}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
