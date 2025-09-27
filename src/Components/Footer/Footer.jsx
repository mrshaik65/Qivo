function Footer() {
  return (
    // Main footer wrapper with background and padding
    <footer className="w-full px-6 py-10 text-gray-300 bg-gray-900 lg:px-20">
      
      {/* Brand logo at the top left */}
      <div className="flex justify-start">
        <h2
          className="hero-logo-text
            text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl
            px-2 sm:px-2 md:px-2 lg:px-2 xl:px-2
            py-1 sm:py-0.5 md:py-0.5 lg:py-1 xl:py-1
            mb-5 -ml-2
            rounded-3xl
            bg-red-500 text-white font-bold
            transition-all duration-300"
        >
          Qivo
        </h2>
      </div>

      {/* Footer content in grid layout - 4 sections */}
      <div className="grid gap-10 mx-auto max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
        
        {/* About / brand description */}
        <div>
          <h3 className="text-xl font-bold text-white">Qivo</h3>
          <p className="mt-3 text-sm text-gray-400">
            Premium electronics for every lifestyle. Quality, innovation, and
            reliability in every gadget.
          </p>
        </div>

        {/* Quick Links section */}
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#F24445]">Home</a>
            </li>
            <li>
              <a href="#about" className="hover:text-[#F24445]">About</a>
            </li>
            {/* Uses navigate() for routing to products */}
            <li onClick={() => navigate("/products")}>
              <a href="#cta" className="hover:text-[#F24445]">Shop</a>
            </li>
          </ul>
        </div>

        {/* Support section */}
        <div>
          <h4 className="font-semibold text-white">Support</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-[#F24445]">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F24445]">FAQ</a>
            </li>
            <li>
              <a href="#" className="hover:text-[#F24445]">Return Policy</a>
            </li>
          </ul>
        </div>

        {/* Newsletter subscription section */}
        <div>
          <h4 className="font-semibold text-white">Stay Updated</h4>
          <p className="mt-3 text-sm text-gray-400">
            Subscribe to get special offers & new gadget arrivals.
          </p>
          {/* Email input box */}
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-3 text-sm text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none"
          />
          {/* Subscribe button */}
          <button className="w-full mt-3 px-4 py-2 font-semibold text-white bg-[#F24445] rounded-lg hover:bg-red-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer bottom note */}
      <div className="mt-10 text-xs text-center text-gray-500">
        © {new Date().getFullYear()} Qivo. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
