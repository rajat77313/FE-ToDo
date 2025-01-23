'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import {url_prefix} from "@/app/utils/constants"
import styles from "@/app/styles/login.module.css"
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const validateuser = () => {
  const router = useRouter();
  const fetchItems = async () => {
    try {
      const response = await fetch(`${url_prefix}/checkUser`)
      const data = await response.json();
      localStorage.setItem('user_data', JSON.stringify(data.user));
      router.push('/todo')
    } catch (error) {
      router.push('/login')
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchItems()
  }, [])

  return (
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
  )
}

export default validateuser