import { useState } from "react";
import ProductImage from "../../components/ProductImage";
import QuantitySelector from "../../components/QuantitySelector";
import { HeartOutlined, SearchOutlined, HeartFilled } from "@ant-design/icons";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Tabs, Divider } from "antd";
import { mockProducts } from "../../mock/mockProducts";
import { useParams } from "react-router-dom";
import CarouselHeader from "../../components/CarouselHeader";
import { Star } from "lucide-react";

const onProductDetailTabsChange = (key) => {
  console.log(key);
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id.toString() === id);

  // TABS
  const items = [
    {
      key: "1",
      label: "Thông tin sản phẩm",
      children: (
        <div className="text-left">
          <h3>Chi tiết sản phẩm</h3>
          <p className="mt-5">{product.descriptions}</p>
        </div>
      ),
    },
    {
      key: "2",
      label: "Khách hàng đánh giá",
      children: (
        <div className="text-left">
          <h4>Tên phổ thông: {product.name}</h4>
          <h4>Tên khoa học: {product.name}</h4>
          <h4>Họ thực vật: {product.name}</h4>
          <h4>Chiều cao: {product.name}</h4>
          <h4>Xuất xứ: {product.name}</h4>
          <h4>Mô tả chi tiết:</h4>
          <p className="mt-2">{product.descriptions}</p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Thẻ tag",
      children: (
        <div className="text-left">
          <h3>Chi tiết sản phẩm</h3>
          <p>Thông tin chi tiết về sản phẩm này.</p>
        </div>
      ),
    },
  ];

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [liked, setLiked] = useState(false);

  return (
    <>
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
            Trang chủ
          </Link>
          <Typography
            color="primary"
            style={{
              fontWeight: 500,
              color: "#36B37E",
            }}
          >
            {product.name}
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="pt-10 md:px-50 px-10 flex flex-col md:flex-row space-x-8 md:pb-30">
        <ProductImage
          images={product.images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <div className="flex flex-col space-y-4 md:w-3/4 pt-10 md:pt-0">
          <div className="space-y-4 text-left">
            <div className="flex flex-row justify-between md:justify-left">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <button
                className="block md:hidden py-2 px-4 text-green-800 font-bold rounded-full hover:bg-green-300"
                onClick={() => setLiked(!liked)}
              >
                {liked ? (
                  <HeartFilled style={{ color: "green" }} />
                ) : (
                  <HeartOutlined />
                )}
              </button>
            </div>
            <div className="flex items-center text-yellow-400 mt-1">
              {[...Array(5)].map((_, i) => {
                const currentStar = i + 1;
                return (
                  <Star
                    key={i}
                    size={14}
                    fill={
                      product.rating >= currentStar
                        ? "currentColor"
                        : product.rating >= currentStar - 0.5
                        ? "url(#halfStar)"
                        : "none"
                    }
                    stroke="currentColor"
                  />
                );
              })}
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="halfStar">
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-red-500 text-2xl font-bold">
                {product.price} đ
              </span>
              <span className="text-gray-400 line-through">
                {product.oldPrice} đ
              </span>
            </div>
          </div>
          <Divider />
          <p className="text-gray-700 text-left">{product.descriptions}</p>
          <Divider />
          <QuantitySelector />
          <Divider />
          <div className="flex w-full md:space-x-4 justify-center md:justify-start">
            <button className="w-full md:w-1/5 py-2 px-4 bg-green-200 text-green-800 font-bold rounded-full hover:bg-green-300">
              Mua Ngay
            </button>

            <button className="hidden md:block py-2 px-4 text-green-800 font-bold rounded-full hover:bg-green-300">
              <SearchOutlined />
            </button>
            <button
              className="hidden md:block py-2 px-4 text-green-800 font-bold rounded-full hover:bg-green-300"
              onClick={() => setLiked(!liked)}
            >
              {liked ? (
                <HeartFilled style={{ color: "green" }} />
              ) : (
                <HeartOutlined />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="px-10 pt-10 pb-10 md:pt-0 md:px-50 md:pb-30 ">
        <div className="px-5 border h-120">
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onProductDetailTabsChange}
            className="custom-tabs"
          />
        </div>
      </div>

      <div className="px-10 md:px-50 pt-0 pb-30">
        <div className="block md:hidden">
          <CarouselHeader
            name="Sản phẩm nổi bật"
            products={mockProducts}
            totalItems={mockProducts.length}
            itemsPerSlide={1}
          />
        </div>
        <div className="hidden md:block">
          <CarouselHeader
            name="Sản phẩm nổi bật"
            products={mockProducts}
            totalItems={mockProducts.length}
            itemsPerSlide={3}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
