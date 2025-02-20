import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import {
  RightOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { ClockCircleOutlined, CommentOutlined } from "@ant-design/icons";
import Comment from "../../components/Comment";
import { mockNews } from "../../mock/mockNews";
import { useParams } from "react-router-dom";

const BlogPostDetail = ({ post }) => (
  <div className="border-b border-gray-200">
    <h1 className="text-xl text-gray-800 mb-2">{post.title}</h1>
    <div className="flex items-center text-gray-500 text-sm mb-4">
      <span className="mr-4">{post.date}</span>
      <span className="mr-4">
        <ClockCircleOutlined className="mr-1" />
        {post.time}
      </span>
      <span>
        <CommentOutlined className="mr-1" />
        {post.comments} Bình luận
      </span>
    </div>
    <img
      src={post.images[0]}
      alt={post.title}
      className="w-full h-90 mb-4 rounded-lg"
    />
    <p className="text-gray-700 pb-10">{post.description}</p>
  </div>
);

const NewsDetail = () => {
  const { id } = useParams();
  const post = mockNews.find((p) => p.id.toString() === id);

  const categories = [
    { name: "Cây chậu treo", count: 10 },
    { name: "Cây có hoa", count: 5 },
    { name: "Cây dây leo" },
    { name: "Cây để bàn" },
    { name: "Cây may mắn" },
    { name: "Cây trang trí" },
    { name: "Cây nội thất" },
  ];

  const newsItems = [
    {
      id: 1,
      image:
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
      title: "Hướng dẫn lựa chọn và bố trí cây xanh trong phòng khách",
    },
    {
      id: 2,
      image:
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
      title: "Những sai lầm nên tránh khi bố trí cây xanh trong nhà",
    },
    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
      title: "7 loại cây xanh để bàn đang được giới văn phòng ưa chuộng",
    },
    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
      title: "Hướng dẫn lựa chọn cây cảnh trang trí trong văn phòng",
    },
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
      title: "4 loại cây cảnh thích hợp bày trí ở khu vực đại sảnh",
    },
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

  const posts = {
    title: "7 loại cây xanh để bàn đang được giới văn phòng ưa chuộng",
    date: "20/12/2015",
    time: "11:20:00 AM",
    comments: 0,
    image:
      "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
    description:
      "Như thế hiện sự thân thiện cũng như sự hiếu khách của gia chủ, phần không gian trước cửa nhà luôn được đầu tư và trang trí khá bắt mắtaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaNhư thế hiện sự thân thiện cũng như sự hiếu khách của gia chủ, phần không gian trước cửa nhà luôn được đầu tư và trang trí khá bắt mắt...",
  };

  const [selectedTag, setSelectedTag] = useState("Cây văn phòng");

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
              {newsItems.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
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
        <div className="w-3/4 px-10">
          {/* List tin tức */}
          <div className="w-full ">
            <BlogPostDetail post={post} />
          </div>

          {/* Comment */}
          <Comment />
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
