 
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import axios from "axios";
import "./topnavbar.css";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
 
 
const TopNavbar = () => {  
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  // const cartItemsCount = useSelector(selectCartItemsCount);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
 

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://api.marasimpex.com/api/user-data"
        );
        setUser(response.data.Data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    axios
      .post("https://api.marasimpex.com/api/logout-user")
      .then((response) => {
        if (response.data.Status === "Success") {
          localStorage.clear();
          router.push("/pages/signin");
        }
      })
      .catch((error) =>
        console.error("Error occurred while logging out user: " + error)
      );
  };

  const navItems = [
 
    {
      id: 2,
      itemName: "Milk",
    },
    {
      id: 3,
      itemName: "Fruits & Vegetables",
      url: "/",
    },
    {
      id: 4,
      itemName: "Grocery",
      url: "/",
    },
    {
      id: 10,
      itemName: "Book Attended",
      url: "",
    },
    {
      id: 11,
      itemName: "Book Hotel",
      url: "/",
    },
    {
      id: 11,
      itemName: "Book Cab",
      url: "/",
    },
    
    {
      id: 12,
      itemName: "Plan A Trip",
      url: "",
    },
    {
      id: 13,
      itemName: "School Items",
      url: "/",
    },
    {
      id: 14,
      itemName: "Register Empoyee & Partners",
      url: "/pages/adminsignintwo",
    },
    {
      id: 15,
      itemName: "Register Products",
      url: "/pages/adminsignin",
    },
  ];

  return (
    <>
      <section
        style={{
          backgroundColor: "#131921",
          borderBottom: "8px solid #77BC1F",
        }}
        className="flex flex-col items-center w-full"
      >
        <div className="flex justify-between items-center w-[95%] py-3 flex_row">
          <div className="flex items-center">
            <div
            style={{marginLeft:'10px'}}
              className="text-white text-2xl pr-4 hamburger_menu cursor-pointer"
              onClick={toggleMenu}
            >
              <GiHamburgerMenu />
            </div>
            <Link href="/" className="text-white font-bold text-2xl">
              Maras
            </Link>
          </div>
          <div className="flex items-center">
            <div className="px-3">
              {user ? (
                <div className="flex items-center text-white text-sm">
                  Hello, <span>{user.username}</span>
                  <button
                    type="button"
                    className="text-white text-2xl font-bold px-1"
                    title="Logout"
                    onClick={handleLogout}
                  >
                    <IoIosLogOut />
                  </button>
                </div>
              ) : (
                <span className="text-white text-sm">
                  Hello, <Link href="/pages/signin">sign in</Link>
                </span>
              )}
            </div>
            <div className="relative cart-icon">
              <span className="text-white text-lg flex items-center">
                <Link href="/pages/carts" title="Cart">
                  <FaCartArrowDown />
                </Link>
                <span className="px-1">{0}</span>
              </span>
            </div>
          </div>
        </div>
    
      </section>
      {menuOpen && (
        <section
          className="w-[30%] h-screen bg-white absolute top-0 z-10 overflow-auto sidebar_menu"
          style={{ borderRight: "1px solid lightgrey" }}
        >
          <div>
            <div className="flex justify-between p-4">
              <h3
                className="text-4xl font-semibold"
                style={{ color: "#77BC1F" }}
              >
                fresh
              </h3>
              <div className="text-2xl cursor-pointer" onClick={toggleMenu}>
                <ImCross />
              </div>
            </div>
            {navItems.map((item) => (
              <div key={item.id} className="px-5 py-3">
                <Link
                  href={`${item.url}`}
                  className="text-base font-medium hover:text-orange-800 duration-300"
                >
                  {item.itemName}
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default TopNavbar;
