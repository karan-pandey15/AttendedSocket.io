import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5"; 
import { FaWhatsapp } from "react-icons/fa";
import "./footerstyle.css";
import { FaBasketShopping } from "react-icons/fa6"; 
import { GrUserWorker } from "react-icons/gr";  
import { BiCategory } from "react-icons/bi";
const Footer = () => {
  return (
    <div style={{ backgroundColor: "#fff" }}>
      <div className="footer_main_container">
        <footer className="footer_container">
          <div className="footer_heading_container">
            <div className="">
              <h1 className="footer_main_heading">MARAS</h1>
              <p className="footer_main_para">
                Welcome to Maras, your ultimate destination for convenient and reliable online shopping. At Maras, we pride ourselves on offering a diverse range of high-quality products that cater to all your needs. Whether you&apos;re looking for the latest in fashion, electronics, home essentials, or unique gifts, we&apos;ve got you covered.
              </p>
            </div>
          </div>
          <div className="link_container">
            <h5
              style={{
                color: "#111",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              About
            </h5>
            <ul className="ul_link">
              <li className="">
                <Link href="#" className="">
                  About Us
                </Link>
              </li>
              <li className="">
                <Link href="/pages/privacypage" className="">
                  Privacy Policy
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/termscond" className=" ">
                  Term&Condition
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/productform" className="">
                  adminsignin
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/partnerLogin" className="">
                  Partner Login
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/RegisterForm" className="">
                  Attended Register
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/cartdata" className="">
                  Attended 
                </Link>
              </li>
            </ul>
          </div>

          <div className="link_container">
            <h5
              style={{
                color: "#111",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              Shop
            </h5>
            <ul className="ul_link">
              <li className="">
                <Link href="/pages/fruitsvegetables" className="">
                  Fruits & Vegetables
                </Link>
              </li>
              <li className="">
                <Link href="/pages/dairyproducts" className="">
                  Dairy Products
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/snacks" className=" ">
                  Snacks
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/beverages" className=" ">
                  Beverages
                </Link>
              </li>
            </ul>
          </div>

          <div className="link_container">
            <h5
              style={{
                color: "#111",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
            </h5>
            <ul className="ul_link">
              <li className="">
                <Link href="/pages/fruitsvegetables" className="">
                  Fruits & Vegetables
                </Link>
              </li>
              <li className="">
                <Link href="/pages/dairyproducts" className="">
                  Dairy Products
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/snacks" className=" ">
                  Snacks
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/beverages" className=" ">
                  Beverages
                </Link>
              </li>
            </ul>
          </div>

          <div className="link_container">
            <h5
              style={{
                color: "#111",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              More Categories
            </h5>
            <ul className="ul_link">
              <li className="">
                <Link href="/pages/spices" className="">
                  Spices & Condiments
                </Link>
              </li>
              <li className="">
                <Link href="/pages/grains" className=" ">
                  Grains & Pulses
                </Link>
              </li>
              <li className="">
                <Link href="/pages/bakery" className="">
                  Bakery
                </Link>
              </li>
              <li className="">
                <Link href="/pages/instantfoods" className="">
                  Instant Foods
                </Link>
              </li>
              <li className="">
                <Link href="/pages/personalcare" className="">
                  Personal Care
                </Link>
              </li>
            </ul>

            <ul className="ul_link">
              <li className=" ">
                <Link href="/pages/cancellationandrefund" className="">
                  Cancellation & Refund
                </Link>
              </li>
              <li className=" ">
                <Link href="/pages/shippinganddelivery" className="">
                  Shipping & Delivery  
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
      <div className="small_footer_main_container">
        <div className="small_footer_child_container">
          <Link href="/">
            <div className="small_container">
              <IoHomeOutline />
              <p className="small_footer_para">HOME</p>
            </div>
          </Link>

          <Link href="/">
            <div className="small_container">
              <BiCategory />
              <p className="small_footer_para">Category</p>
            </div>
          </Link>

          <Link href="/">
            <div className="small_container">
              <FaBasketShopping />
              <p className="small_footer_para">BASKET</p>
            </div>
          </Link>

          <Link href="/pages/cartdata">
            <div className="small_container">
              <GrUserWorker />
              <p className="small_footer_para">Attended</p>
            </div>
          </Link>

          <Link
            href="https://wa.me/9999781282"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="small_container"> 
              <FaWhatsapp />
              <p className="small_footer_para">Chat</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
