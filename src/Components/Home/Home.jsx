// Home.jsx
import Navbar from "../Navbar/Nabar";
import HomeHeroImg from "./hero-img-.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "./carousel-lg-1.webp";
import Img2 from "./carousel-lg-2.webp";
import Img3 from "./carousel-lg-3.webp";
import Img4 from "./carousel-lg-4.webp";

import Img5 from "./carousel-sm-1.webp";
import Img6 from "./carousel-sm-2.webp";
import Img7 from "./carousel-sm-3.webp";
import Img8 from "./carousel-sm-4.webp";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-white text-black py-2 md:py-4 lg:py-4 hover:bg-gray-400/90 rounded-tl rounded-bl"
  >
    <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-white text-black py-2 md:py-4 lg:py-4 hover:bg-gray-400/90 rounded-tr rounded-br"
  >
    <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
  </button>
);

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const navigate = useNavigate()

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[url('/hero-bg.webp')] bg-cover bg-center pb-10 max-h-screen bg-[#F24445] ">
        <Navbar textColor="text-white" />

        <div className="flex flex-col-reverse md:flex-row items-center md:justify-between gap-10 px-5 md:px-20  md:py-7 lg:py-10">
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left lg:space-y-6 sm:space-y-6 space-y-3 max-w-md md:max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold ">
              Upgrade Your Gear. Experience Ultimate Fun.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Discover the latest gadgets, wearables, and accessories — all in
              one place. Hot deals, premium quality, delivered fast.
            </p>
            <button className="w-xs mt-2 py-2 font-semibold text-white bg-[#F24445] rounded-lg hover:bg-red-600 transition">
              Subscribe
            </button>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <img
              className="[filter:drop-shadow(0_20px_15px_rgba(0,0,0,0.20))] w-11/12 sm:w-80 md:w-96 lg:w-[500px] h-auto object-contain"
              src={HomeHeroImg}
              alt="Hero"
            />
          </div>
        </div>
      </div>

      {/* Large Screen Carousel */}
      <div className="m-5 mb-0 lg:mb-0 lg:mt-15 lg:m-10 relative hidden lg:block">
        <Slider {...settings}>
          <div>
            <img src={Img1} alt="Banner 1" className="" />
          </div>
          <div>
            <img src={Img2} alt="Banner 2" className="" />
          </div>
          <div>
            <img src={Img3} alt="Banner 3" className="" />
          </div>
          <div>
            <img src={Img4} alt="Banner 4" className="" />
          </div>
        </Slider>
      </div>

      {/* Small Screen Carousel */}
      <div className="m-5 mb-0 lg:mb-0 lg:mt-15 lg:m-10 relative block lg:hidden">
        <Slider {...settings}>
          <div>
            <img src={Img5} alt="Banner 1" className="" />
          </div>
          <div>
            <img src={Img6} alt="Banner 2" className="" />
          </div>
          <div>
            <img src={Img7} alt="Banner 3" className="" />
          </div>
          <div>
            <img src={Img8} alt="Banner 4" className="" />
          </div>
        </Slider>
      </div>

      {/* About Section */}
      <section id="about" className="w-full px-6 py-16 bg-white lg:px-20">
        <div className="max-w-4xl mx-auto sm:space-y-6 space-y-3 lg:space-y-8 text-center">
          <h2 className="text-3xl font-bold text-[#F24445] sm:text-4xl">
            About Us
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            At <span className="font-semibold">Qivo</span>, we believe
            electronics are more than just gadgets — they’re tools that power
            your lifestyle. Our collection brings you premium products curated
            from trusted brands, ensuring performance and reliability.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            From wireless headphones to smartwatches, gaming keyboards to
            powerbanks, we handpick gadgets that combine innovation with
            quality. Every product is carefully selected to guarantee durability
            and exceptional user experience.
          </p>

          <div className="grid gap-6 mt-10 text-left sm:grid-cols-2">
            <div className="p-6 rounded-lg shadow-sm bg-gray-50">
              <h3 className="font-semibold text-[#F24445]">Quality First</h3>
              <p className="mt-2 text-sm text-gray-600">
                Premium electronics and accessories you can trust.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-sm bg-gray-50">
              <h3 className="font-semibold text-[#F24445]">Customer Care</h3>
              <p className="mt-2 text-sm text-gray-600">
                Hassle-free returns and free delivery on orders over ₹1999.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="cta"
        className="w-full px-6 py-16 bg-gradient-to-r from-[#F24445] to-pink-500 lg:px-20"
      >
        <div className="max-w-3xl mx-auto space-y-6 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Upgrade Your Tech with Qivo
          </h2>
          <p className="text-lg text-gray-100">
            Discover the latest gadgets and electronics that elevate your daily
            life. Limited stock available!
          </p>
          <button onClick={()=> navigate("/products")} className="inline-flex items-center px-6 py-3 mt-4 font-semibold text-white bg-[#F24445] rounded-lg hover:bg-red-600 transition">
            Explore Collection
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 py-10 text-gray-300 bg-gray-900 lg:px-20">
        <div className="flex justify-start">
          <h2 className="hero-logo-text text-3xl  text-white px-2 py-1 rounded-3xl mb-5 -ml-2 bg-red-500">
            Qivo
          </h2>
        </div>

        <div className="grid gap-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-white">Qivo</h3>
            <p className="mt-3 text-sm text-gray-400">
              Premium electronics for every lifestyle. Quality, innovation, and
              reliability in every gadget.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#F24445]">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#F24445]">
                  About
                </a>
              </li>
              <li onClick={()=> navigate("/products")}>
                <a href="#cta" className="hover:text-[#F24445]">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#F24445]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F24445]">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F24445]">
                  Return Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white">Stay Updated</h4>
            <p className="mt-3 text-sm text-gray-400">
              Subscribe to get special offers & new gadget arrivals.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mt-3 text-sm text-white bg-gray-800 rounded-lg focus:outline-none border border-gray-700"
            />
            <button className="w-full mt-3 px-4 py-2 font-semibold text-white bg-[#F24445] rounded-lg hover:bg-red-600 transition">
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-10 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} Qivo. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Home;
