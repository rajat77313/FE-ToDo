'use client'
import styles from "@/app/styles/header.module.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Space_Grotesk } from 'next/font/google'
const font = Space_Grotesk({ subsets: ['latin'], weight: '400' })

const Header = () => {
  const router = useRouter();
  const [loggedIn, userStatus] = useState('')

  const handleLogout = async () => {
    localStorage.clear();
    router.push('/login')
  }

  return (
    <>
      <div className={styles.main_box}>
        <div>
          <Link href="/">
            <Image
              style={{ borderRadius: "10px" }}
              src="/logo_new.png"
              alt="App logo"
              width={140}
              height={100}
              className={styles.header_image}
            />
          </Link>
          {/* <span>TRACKER</span> */}
        </div>
        <div className={styles.contact_us}>
          {usePathname() == '/todo' ? (<>
            <span className={font.className} onClick={() => handleLogout()}>Logout</span>
          </>) : (<></>)}
        </div>
      </div>
    </>
  );
};

export default Header;
