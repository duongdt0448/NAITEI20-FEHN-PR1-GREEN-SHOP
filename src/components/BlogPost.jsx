import {
  ClockCircleOutlined,
  CommentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const BlogPost = ({ post }) => (
  <div className="border-b border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-2">
      <Link
        to={`/news/${post.id}`}
        key={post.id}
        className="hover:underline hover:text-green-600 transition duration-200"
      >
        {post.title}
      </Link>
    </h2>
    <div className="flex items-center text-gray-500 text-sm mb-4">
      <span className="mr-4">
        <CalendarOutlined className="mr-1" />
        {post.date}
      </span>
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
