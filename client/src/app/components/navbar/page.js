import Link from "next/link";
import React from "react";
import "./navbar.css";

const Navbar = () => {
  const navItems = [
    {
      id: 1,
      itemName: "Past Purchases",
    },
    {
      id: 2,
      itemName: "Deals",
    },
    {
      id: 3,
      itemName: "Fruits & Vegetables",
      url: "/pages/shop-by-category/fruits-vegetables",
    },
    {
      id: 4,
      itemName: "Rice, Atta & Dal",
      url: "/pages/shop-by-category/rice-atta-dal",
    },
    {
      id: 5,
      itemName: "Oil, Masala & Sauces",
      url: "/pages/shop-by-category/oil-masala-sauces",
    },
    {
      id: 6,
      itemName: "Snacks & Biscuits",
      url: "/pages/shop-by-category/snacks-biscuits",
    },
    {
      id: 7,
      itemName: "Eggs, Meat & Fish",
      url: "/pages/shop-by-category/egg-meat-fish",
    },
    {
      id: 8,
      itemName: "Health & Nutrition",
      url: "/pages/shop-by-category/health-nutrition",
    },
    {
      id: 9,
      itemName: "Cleaning & Household",
      url: "/pages/shop-by-category/cleaning-household",
    },
    {
      id: 10,
      itemName: "Hygiene & Personal Care",
      url: "/pages/shop-by-category/hygiene-personal-care",
    },
  ];

  return (
    <>
      <section
        className="flex justify-center items-center w-full navbar"
        style={{ border: "1px solid gray" }}
      >
        <div className="flex justify-between items-center w-[95%] py-4">
          <div>
            <h3 className="text-2xl font-semibold" style={{ color: "#77BC1F" }}>
              fresh
            </h3>
          </div>
          {navItems.map((item) => {
            return (
              <div key={item.id}>
                <Link
                  href={`${item.url}`}
                  className="text-xs font-medium hover:text-orange-800 duration-300"
                >
                  {item.itemName}
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Navbar;
