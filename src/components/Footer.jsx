// src/components/Header.jsx
import React from "react";
import { FaFacebookF, FaTumblr, FaTwitter, FaVimeoV } from "react-icons/fa";
import { Button, Input, Space } from "antd";
import Logo from "../assets/images/logo.png";
import {
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  RightOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { footerData, titleFooterData } from "../mock/footer_data";

const Footer = () => {
  return (
    <div className="px-10 md:px-50 bg-[#313131] text-[#A5A5A5]">
      <div className="border-b border-[#898989] py-5">
        <div className="flex flex-col md:flex-row justify-between w-full mx-[auto] items-center text-left">
          <div className="w-full md:w-1/3">
            <div className="text-[#3FB871] font-semibold">
              KÊNH THÔNG TIN TỪ CHÚNG TÔI
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-left hover:bg-blue-600 hover:text-white">
                <FaFacebookF />
              </div>
              <div className="flex h-8 w-8 items-center justify-left hover:bg-blue-400 hover:text-white">
                <FaTwitter />
              </div>
              <div className="flex h-8 w-8 items-center justify-left hover:bg-tumblr hover:text-white">
                <FaTumblr />
              </div>
              <div className="flex h-8 w-8 items-center justify-feft hover:bg-vimeo hover:text-white">
                <FaVimeoV />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col pt-5 md:pt-0 md:flex-row md:items-end gap-4 md:w-2/3">
            <span className="text-[#3FB871] text-sms font-semibold text-left">
              ĐĂNG KÝ NHẬN EMAIL TỪ CHÚNG TÔI
            </span>
            <Space.Compact style={{ width: "100%" }}>
              <Input />
              <Button type="primary" size="large">
                <SendOutlined />
              </Button>
            </Space.Compact>
          </div>
        </div>
      </div>
      <div className="border-b border-[#898989] py-8">
        <div className="flex flex-col md:flex-row justify-between w-full mx-[auto]">
          <div className="flex flex-col gap-4 md:w-[30%]">
            <img src={Logo} alt="logo" />
            <p className="text-sm text-left">
              Green shop được thành lập từ 8/2010 được sự tin tưởng của khác
              hàng trong suốt thời gian hoạt động đến nay cửa hàng ngày một phát
              triển
            </p>
            <div className="hidden md:flex text-sm text-left">
              <PhoneOutlined style={{ color: "#3FB871" }} />
              <span className="text-sm pl-2">
                {"Điện thoại:  (84-4)66.558.868"}
              </span>
            </div>
            <div className="hidden md:flex text-sm text-left">
              <MailOutlined style={{ color: "#3FB871" }} />
              <span className="text-sm pl-2">Email: infor@dkt.com.vn</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-10 md:w-2/3 text-left">
            {footerData.map((data, index) => (
              <div key={index} className="pt-5 md:pt-0">
                <div className="pb-4 text-[#3FB871] font-semibold">
                  {data.title}
                </div>
                <ul>
                  {data.items.map((item, index) => (
                    <li key={index}>
                      <div className="flex items-center gap-1 pb-3 ">
                        <RightOutlined className="text-[10px] color-[#898989]" />
                        <span className="text-sm text-left">{item}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="hidden md:block border-b border-[#898989] py-5">
        <div className="flex justify-between  w-full mx-[auto]">
          <ul className="flex items-center gap-5">
            {titleFooterData.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <CreditCardOutlined />
            <CreditCardOutlined />
            <CreditCardOutlined />
            <CreditCardOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
