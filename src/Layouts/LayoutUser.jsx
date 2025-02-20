import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const LayoutUser = () => {
  return (
    <div className="w-full">
      <div className="z-50">
        <Header />
      </div>
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutUser;
