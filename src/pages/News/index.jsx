import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { RightOutlined } from "@ant-design/icons";
import { BlogPost } from "../../components/BlogPost";
import { mockNews } from "../../mock/mockNews";

const News = () => {
  const categories = [
    { name: "Cây chậu treo", count: 10 },
    { name: "Cây có hoa", count: 5 },
    { name: "Cây dây leo" },
    { name: "Cây để bàn" },
    { name: "Cây may mắn" },
    { name: "Cây trang trí" },
    { name: "Cây nội thất" },
  ];

  const tags = [
    "Cây văn phòng",
    "Cây phát lộc",
    "Cây xanh",
    "Cây trang trí",
    "Cây",
    "Plants",
    "Sức khỏe",
    "Quà tặng",
    "Lưu niệm",
  ];

  const [selectedTag, setSelectedTag] = useState("Cây văn phòng");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(mockNews.length / itemsPerPage);

  // Lấy danh sách tin tức theo trang
  const displayedProducts = mockNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {/* BreadCrumb */}
      <div className="px-50 pt-10">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography
            color="primary"
            style={{
              fontWeight: 500,
              color: "#36B37E",
            }}
          >
            Tin tức
          </Typography>
        </Breadcrumbs>
      </div>

      <div className="px-50 flex text-left pt-10">
        {/* Right component */}
        <div className="w-1/4">
          {/* Danh mục sản phẩm */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Danh mục sản phẩm</h3>
            <div className="h-1 w-20 bg-green-500 mb-4"></div>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:text-green-600 cursor-pointer "
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

          {/* Tin tức nổi bật */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Tin tức nổi bật</h3>
            <div className="h-1 w-20 bg-green-500 mb-4"></div>
            <ul className="space-y-4">
              {mockNews.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <p className="text-sm text-gray-800">{item.title}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog tag */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-2">Blog tag</h3>
            <div className="h-1 w-20 bg-green-500 mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 border-[1px] border-gray-200 rounded-100 text-sm ${
                    selectedTag === tag
                      ? "bg-green-400 text-white "
                      : "bg-white text-gray-700 hover:bg-gray-100 "
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Left component */}
        <div className="w-3/4">
          {/* List tin tức */}
          <div className="w-full px-10">
            {displayedProducts.map((post, index) => (
              <BlogPost key={index} post={post} />
            ))}
          </div>

          {/* Phân trang */}
          <div className="flex items-center justify-end space-x-2 mt-6 pt-20 pb-20">
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
        </div>
      </div>
    </>
  );
};

export default News;
