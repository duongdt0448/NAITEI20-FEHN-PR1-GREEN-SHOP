// src/components/Header.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaTumblr,
  FaVimeoV,
  FaUser,
  FaUserPlus,
  FaShoppingBasket,
  FaBars,
  FaPhoneAlt,
  FaSearch,
} from "react-icons/fa";
import HeaderImage from "../assets/images/bg-header.png";
import Logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { mockProducts } from "../mock/mockProducts";
import { useState, useEffect } from "react";

// Chuyển danh sách sản phẩm thành menu items
const productItems = mockProducts.map((product) => ({
  label: (
    <Link to={`/product/${product.id}`} key={product.id}>
      {product.name}
    </Link>
  ),
  key: product.id,
}));

// Tạo danh sách sản phẩm mới
const productNewItems = mockProducts
  .filter((product) => product.isNew)
  .map((product) => ({
    label: (
      <Link to={`/product/${product.id}`} key={product.id}>
        {product.name}
      </Link>
    ),
    key: product.id,
  }));

const Header = ({ setSearchQuery }) => {
  // CART
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // SEARCH
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Xử lý nhập dữ liệu
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    // Lọc danh sách gợi ý
    const filteredSuggestions = mockProducts.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filteredSuggestions);
    setSuggestions(filteredSuggestions);
    setShowDropdown(true);
  };

  // Khi chọn một gợi ý
  const handleSelectSuggestion = (selectedItem) => {
    setQuery(selectedItem.name);
    setShowDropdown(false);
  };

  // REPONSIVE
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Toggle menu khi bấm vào FaBars
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle trạng thái hiển thị của ô tìm kiếm
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-md text-left">
      <div className="hidden md:flex px-50 flex justify-between items-center bg-black text-white text-sm py-2">
        <div className="flex flex-row items-center justify-between text-[13px]">
          <div className="flex  items-center justify-center gap-2 md:block">
            <span>Open time: 8:00 - 18:00 Monday - Sunday</span>
          </div>
          <div className="flex h-8 w-8 items-center justify-center hover:bg-blue-600 hover:text-white">
            <FaFacebookF />
          </div>
          <div className="flex h-8 w-8 items-center justify-center hover:bg-blue-400 hover:text-white">
            <FaTwitter />
          </div>
          <div className="flex h-8 w-8 items-center justify-center hover:bg-tumblr hover:text-white">
            <FaTumblr />
          </div>
          <div className="flex h-8 w-8 items-center justify-center hover:bg-vimeo hover:text-white">
            <FaVimeoV />
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex items-center justify-center gap-1 hover:text-green-500">
            <FaUser />
            <span>Đăng nhập</span>
          </div>
          <div className="flex items-center justify-center gap-1 hover:text-green-500">
            <FaUserPlus />
            <span>Đăng kí</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div
        style={{ backgroundImage: `url(${HeaderImage})` }}
        className="px-30 md:px-50 flex  md:justify-between items-center bg-black text-white text-sm py-2 h-30 md:h-full w-full"
      >
        <div className="flex basis-full flex-row items-center md:p-0">
          <div className="flex w-50  md:w-full flex-row items-center ">
            <img src={Logo} alt="logo" />
          </div>
        </div>
        <div className="hidden md:block w-2/5 px-20">
          <div className="mb-1 text-center flex text-black">
            <FaPhoneAlt className="mt-1 mr-2 ml-1" />
            <span>Hỗ trợ</span>:
            <div className="hover:text-green-500">(04) 6674 2332</div>
            <span> - </span>
            <div className="hover:text-green-500">(04) 3786 8904</div>
          </div>
          <div className="relative w-[400px]">
            <div className="flex text-black">
              {/* Ô nhập tìm kiếm */}
              <input
                type="text"
                value={query}
                placeholder="Tìm kiếm sản phẩm..."
                onChange={handleChange}
                className="w-full h-10 px-5 border border-solid border-gray-300 rounded-l-[50px] focus:outline-none"
              />

              {/* Nút tìm kiếm */}
              <Link to={`/products?search=${encodeURIComponent(query)}`}>
                <button
                  type="submit"
                  className="w-10 h-10 bg-white rounded-r-[50px] flex items-center justify-center border border-solid border-gray-300"
                >
                  <FaSearch />
                </button>
              </Link>
            </div>

            {/* Danh sách gợi ý */}
            {showDropdown && (
              <ul className="absolute text-black top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 mt-1">
                {suggestions.length > 0 ? (
                  suggestions.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSuggestion(item)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-gray-500"
                    >
                      {item.name}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500">
                    Không tìm thấy kết quả
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
        <div className="hidden md:flex flex items-center justify-end mt-5 min-w-[20%]">
          <div className="group relative flex flex-row items-center">
            <div className="flex items-center justify-center gap-1 hover:text-green-500 text-black">
              <Link to="/cart">
                <FaShoppingBasket className="text-[15px]" />
              </Link>
              {cart.length}
              <span>Sản phẩm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#009f5f] text-white px-50">
        <div className="container max-w-[1140px] mx-auto">
          <nav className="hidden md:block flex flex-row items-center justify-between">
            <div className="hidden md:block">
              <ul className="flex gap-20">
                <li className="py-[13px]">
                  <FaBars size={25} />
                </li>
                <li className="bg-active py-[13px]">
                  <div className="hover:text-white">
                    <Link to="/" className="text-white">
                      TRANG CHỦ
                    </Link>
                  </div>
                </li>
                <li className="py-[13px] hover:bg-active hover:text-white">
                  <div>
                    <Link to="/" className="text-white">
                      GIỚI THIỆU
                    </Link>
                  </div>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Dropdown
                    menu={{
                      items: productItems,
                    }}
                    className="text-white"
                  >
                    <Space>
                      <Link
                        to="/products"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        SẢN PHẨM
                      </Link>
                      <DownOutlined />
                    </Space>
                  </Dropdown>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <Dropdown
                    menu={{
                      items: productNewItems,
                    }}
                  >
                    <Space style={{ fontWeight: "normal" }}>
                      <Link
                        to="/products"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        SẢN PHẨM MỚI
                      </Link>
                      <DownOutlined />
                    </Space>
                  </Dropdown>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <div>
                    <Link to="/news" className="text-white">
                      TIN TỨC
                    </Link>
                  </div>
                </li>
                <li className="group relative py-[13px] hover:bg-active hover:text-white">
                  <div>
                    <Link to="/" className="text-white">
                      LIÊN HỆ
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="h-15 bg-[#009f5f] text-white flex justify-between items-center px-10 py-0 md:hidden">
        {/* Icon Menu (Hamburger) */}
        <button className="text-2xl" onClick={toggleMobileMenu}>
          <FaBars />
        </button>

        {/* Khoảng trống ở giữa để Logo căn giữa */}
        <div className="flex-grow"></div>

        {/* Icon Tìm kiếm và Giỏ hàng */}
        <div className="flex gap-4">
          <button className="text-xl" onClick={toggleSearch}>
            <FaSearch />
          </button>
          {/* Ô Tìm Kiếm (Ẩn/Hiện dựa vào isSearchOpen) */}
          {isSearchOpen && (
            <div className="relative">
              <input
                type="text"
                value={query}
                placeholder="Tìm kiếm..."
                onChange={handleChange}
                className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none focus:border-green-500 transition-all duration-300 w-full"
              />

              {/* Danh sách gợi ý */}
              {showDropdown && (
                <ul className="absolute text-black w-full bg-white border border-gray-300 rounded-md shadow-md z-50 mt-1">
                  {suggestions.length > 0 ? (
                    suggestions
                      .filter((item) =>
                        item.name.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((item, index) => (
                        <Link to={`/product/${item.id}`} key={item.id}>
                          <li
                            onClick={() => handleSelectSuggestion(item)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-gray-500"
                          >
                            {item.name}
                          </li>
                        </Link>
                      ))
                  ) : (
                    <li className="px-4 py-2 text-gray-500">
                      Không tìm thấy kết quả
                    </li>
                  )}
                </ul>
              )}
            </div>
          )}

          <button className="text-xl relative">
            <FaShoppingBasket />
            <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          </button>
        </div>
      </div>

      {/* Menu trên mobile */}
      <nav
        className={`bg-white shadow-md transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden`}
      >
        <ul className="flex flex-col gap-4 py-4 text-center text-green-600">
          <li>
            <a href="/" className="hover:text-green-800">
              TRANG CHỦ
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-green-800">
              GIỚI THIỆU
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-green-800">
              SẢN PHẨM
            </a>
          </li>
          <li>
            <a href="/news" className="hover:text-green-800">
              TIN TỨC
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-green-800">
              LIÊN HỆ
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
