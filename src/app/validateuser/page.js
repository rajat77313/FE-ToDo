'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react"
import {url_prefix} from "@/app/utils/constants"

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
    <div>validateuser</div>
  )
}

export default validateuser