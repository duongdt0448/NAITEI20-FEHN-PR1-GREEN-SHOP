// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { mockProducts } from "../../mock/mockProducts";
import { categories } from "../../mock/mockCategory";
import { colors } from "../../mock/mockColors";
import { priceRanges } from "../../mock/mockPrice";
import { sortBy } from "../../Utils/SortUtil";
import {
  RightOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

import Slide1 from "../../assets/images/slide-banner1.png";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import ProductCardFullHeight from "../../components/ProductCardFullHeight";
import { useSearchParams } from "react-router-dom";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState(mockProducts);
  const [itemsPerPage, setItemsPerPage] = useState(9); // 'grid' or 'list'

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      console.log(searchQuery);
      const filteredProducts = mockProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setDisplayedProducts(filteredProducts);
    } else {
      setDisplayedProducts(mockProducts);
    }
  }, [searchQuery]);

  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const categoryProductCount = categories.map((category) => {
    const count = mockProducts.filter((product) =>
      product.categories.includes(category.id)
    ).length;
    return { ...category, count };
  });

  // SORT
  const [sortOption, setSortOption] = useState("name-asc");

  const onSortChange = (option) => {
    setSortOption(option);

    // Xác định key và thứ tự dựa vào option
    const [key, order] = option.split("-");
    const sortedProducts = sortBy(mockProducts, key, order);
    setDisplayedProducts(sortedProducts);
  };

  // TÌM THEO CATE
  const [filters, setFilters] = useState({
    category: null,
    color: null,
    price: null,
  });

  // Hàm xử lý bộ lọc
  const onFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    let filtered = mockProducts;

    // Lọc theo category nếu có
    if (newFilters.category) {
      filtered = filtered.filter((product) =>
        product.categories.includes(newFilters.category)
      );
    }

    // Lọc theo color nếu có
    if (newFilters.color) {
      filtered = filtered.filter((product) =>
        product.colors.includes(newFilters.color)
      );
    }

    // Lọc theo price nếu có
    if (newFilters.price) {
      const [min, max] = newFilters.price
        .split(" - ")
        .map((price) => Number(price.replace(/\./g, "").replace(" Đ", "")));
      filtered = filtered.filter((product) => {
        if (max) return product.price >= min && product.price <= max;
        return product.price >= min;
      });
    }

    setDisplayedProducts(filtered);
  };

  // RESPONSIVE
  const [showOption, setShowOption] = useState(0);
  const [displayedOptions, setDisplayedOptions] = useState([]);

  const nameOrder = [
    { id: 1, key: "name-asc", name: "Tên sản phẩm (A-Z)" },
    { id: 2, key: "name-desc", name: "Tên sản phẩm (Z-A)" },
    { id: 3, key: "price-asc", name: "Giá thấp đến cao" },
    { id: 4, key: "price-desc", name: "Giá cao đến thấp" },
  ];

  const handleShowOption = (selectedOption) => {
    console.log(displayedOptions);
    console.log(selectedOption);
    console.log(showOption);
    if (selectedOption == showOption) {
      setShowOption(0);
      setDisplayedOptions([]);
    } else if (selectedOption == 1) {
      setShowOption(selectedOption);
      setDisplayedOptions(nameOrder);
    } else if (selectedOption == 2) {
      setShowOption(selectedOption);
      setDisplayedOptions(categories);
    } else if (selectedOption == 3) {
      setShowOption(selectedOption);
      setDisplayedOptions(priceRanges);
    } else if (selectedOption == 4) {
      setShowOption(selectedOption);
      setDisplayedOptions(colors);
    }
  };

  const handleSelectedFilter = (displayItem) => {
    if (showOption == 1) {
      onSortChange(displayItem.key);
    } else if (showOption == 2) {
      const newCategory =
        filters.category === displayItem.id ? null : displayItem.id;
      onFilterChange("category", newCategory);
    } else if (showOption == 3) {
      const newColor = filters.color === displayItem.id ? null : displayItem.id;
      onFilterChange("color", newColor);
    } else if (showOption == 4) {
      const newPrice =
        filters.price === displayItem.name ? null : displayItem.name;
      onFilterChange("price", newPrice);
    }
  };

  return (
    <>
      <div className="block md:hidden">
        <div className="w-full mb-6">
          <img src={Slide1} alt="banner" className="w-full h-full" />
        </div>
      </div>
      <div className="px-10 md:px-50 pt-10">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#666",
              fontWeight: 500,
            }}
          >
            Home
          </Link>
          <Typography
            color="primary"
            style={{
              fontWeight: 500,
              color: "#36B37E",
            }}
          >
            Danh sách sản phẩm
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="px-10 md:px-50 flex flex-col md:flex-row text-left pt-10">
        <div className="relative w-full flex flex-row md:flex-col md:w-1/4 whitespace-nowrap overflow-x-auto space-x-2 md:space-x-0">
          <div className="block md:hidden mb-6">
            <div className="flex flex-row border border-gray-300 rounded-md p-2 md:border-none">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                Tên sản phẩm
              </h3>
              <div className=" px-2 pt-1 block md:hidden text-green-600">
                <DownOutlined onClick={() => handleShowOption(1)} />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex flex-row border border-gray-300 rounded-md p-2 md:border-none">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                Danh mục sản phẩm
              </h3>
              <div className="px-2 pt-1 block md:hidden">
                <DownOutlined onClick={() => handleShowOption(2)} />
              </div>
            </div>
            <div className="hidden md:block h-1 w-20 bg-green-500 mb-4"></div>
            <ul className="hidden md:block space-y-2">
              {categoryProductCount.map((category, index) => (
                <li
                  key={category.id}
                  className={`flex items-center text-gray-700 hover:text-green-600 cursor-pointer ${
                    filters.category === category.id
                      ? "text-green-600"
                      : "text-gray-700"
                  } hover:text-green-600`}
                  onClick={() => {
                    // Nếu category đã được chọn, click thêm lần nữa sẽ bỏ chọn
                    const newCategory =
                      filters.category === category.id ? null : category.id;
                    onFilterChange("category", newCategory);
                  }}
                >
                  <RightOutlined className="text-[10px] color-[#898989] pr-2" />
                  <span>{category.name}</span>
                  {category.count && (
                    <span className="text-gray">({category.count})</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tìm theo giá */}
          <div className="mb-6">
            <div className="flex flex-row border border-gray-300 rounded-md p-2 md:border-none">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                Tìm theo giá
              </h3>
              <div className="px-2 pt-1 block md:hidden">
                <DownOutlined onClick={() => handleShowOption(3)} />
              </div>
            </div>
            <div className="hidden md:block h-1 w-20 bg-green-500 mb-4"></div>
            <ul className="hidden md:block space-y-2">
              {priceRanges.map((range, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex items-center ${
                    filters.price === range.name
                      ? "text-green-600"
                      : "text-gray-700"
                  } hover:text-green-600`}
                  onClick={() => {
                    const newPrice =
                      filters.price === range.name ? null : range.name;
                    onFilterChange("price", newPrice);
                  }}
                >
                  <RightOutlined className="text-[10px] color-[#898989] pr-2" />
                  {range.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <div className="flex flex-row border border-gray-300 rounded-md p-2 md:border-none">
              <h3 className="text-lg font-bold mb-2 text-green-600">
                Tìm theo màu
              </h3>
              <div className="px-2 pt-1 block md:hidden">
                <DownOutlined onClick={() => handleShowOption(4)} />
              </div>
            </div>
            <div className="hidden md:block h-1 w-20 bg-green-500 mb-4"></div>
            <div className="hidden md:block md:grid md:grid-cols-2 md:gap-4">
              {colors.map((color, index) => (
                <div
                  key={color.id}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    filters.color === color.id
                      ? "text-green-600"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    // Nếu màu đã được chọn, click thêm lần nữa sẽ bỏ chọn
                    const newColor =
                      filters.color === color.id ? null : color.id;
                    onFilterChange("color", newColor);
                  }}
                >
                  <div className={`w-6 h-6 rounded-full ${color.color}`}></div>
                  <span className="font-medium">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {showOption !== 0 && displayedOptions.length > 0 && (
          <ul className="absolute left-0 right-0 text-black w-screen overflow-x-auto overflow-y-hidden bg-gray-100 border border-gray-300 rounded-md shadow-md z-50 mt-15 pb-5">
            {displayedOptions.map((displayItem, index) => (
              <li
                key={index}
                className="flex items-center text-gray-700 hover:text-green-600 cursor-pointer pt-2 px-10"
                onClick={() => handleSelectedFilter(displayItem)}
              >
                <span>{displayItem.name}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="w-3/4">
          <div className="hidden md:block w-full mb-6">
            <img src={Slide1} alt="banner" className="w-full h-30" />
          </div>
          <div className="flex items-center justify-between py-4">
            {/* Icons for view switching */}
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 ${itemsPerPage === 9 ? "bg-gray-200" : ""}`}
                onClick={() => setItemsPerPage(9)}
              >
                <AppstoreOutlined
                  style={{ fontSize: "24px", color: "green" }}
                />
              </button>
              <button
                className={`p-2 ${itemsPerPage === 9 ? "bg-gray-200" : ""}`}
                onClick={() => setItemsPerPage(5)}
              >
                <UnorderedListOutlined
                  style={{ fontSize: "24px", color: "gray" }}
                />
              </button>
            </div>

            {/* Dropdowns for sorting and showing */}
            <div className="hidden md:block md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className=" text-gray-600 font-medium">Sắp xếp theo</span>
                <select
                  className="border border-gray-300 rounded px-2 py-1"
                  value={sortOption}
                  onChange={(e) => onSortChange(e.target.value)}
                >
                  <option value="name-asc">Tên sản phẩm (A-Z)</option>
                  <option value="name-desc">Tên sản phẩm (Z-A)</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Show</span>
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option>15</option>
                  <option>30</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            {/* Danh sách sản phẩm */}
            {displayedProducts.length === 0 ? (
              <p className="text-gray-700 text-center mt-10">
                Không có sản phẩm nào
              </p>
            ) : (
              <div
                className={`grid gap-6 ${
                  itemsPerPage === 9 ? "grid-cols-3" : "grid-cols-1"
                }`}
              >
                {displayedProducts
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((product, index) => (
                    <div
                      key={product.id}
                      className={`h-72 flex ${
                        itemsPerPage === 5
                          ? "flex-row items-center space-x-4"
                          : "flex-col"
                      }`}
                    >
                      {itemsPerPage === 5 ? (
                        <ProductCardFullHeight product={product} />
                      ) : (
                        <ProductCard product={product} />
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* Phân trang */}
            {displayedProducts.length > 0 && (
              <div className="hidden md:block md:flex items-center justify-end space-x-2 mt-6 pt-20 pb-20">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-30 hover:bg-gray-100"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Trang trước
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-4 py-2 border rounded-30 ${
                      currentPage === index + 1
                        ? "bg-teal-500 text-white border-teal-500"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => goToPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className="px-4 py-2 border border-gray-300 rounded-30 hover:bg-gray-100"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Trang cuối
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
