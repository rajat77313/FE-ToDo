import styles from "@/app/styles/login.module.css";
import { redirect } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
import {url_prefix} from "../utils/constants"
const font = Space_Grotesk({ subsets: ["latin"], weight: "400" });
import Form from "../component/form"

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
      <Form/>
        </div>
      </div>
    </>
  );
};

export default Login;
