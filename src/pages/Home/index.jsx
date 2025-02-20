import ProductCarousel from "../../components/NewProduct";
import PromotionalProducts from "../../components/PromotionalProducts";
import OutstandingProducts from "../../components/OutstandingProducts";
import FrequentlyPurchasedProducts from "../../components/FrequentlyPurchasedProducts";
import News from "../../components/News";
import Popup from "../../components/Popup";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Popup />
      <div className="w-full">
        <img
          src="/images/slide-1920x590.png"
          alt="Logo"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="w-300">
        <div className="container mx-auto p-0 pt-10">
          <OutstandingProducts />
        </div>

        <div className="flex text-left pt-10">
          <div className="w-1/4">
            <FrequentlyPurchasedProducts />
          </div>
          <div className="w-3/4">
            <PromotionalProducts />
          </div>
        </div>

        <div className="pt-10">
          <img src="/images/banner-11140x217.png" alt="Logo" />
        </div>

        <div className="container mx-auto p-0 pt-10">
          <ProductCarousel />
        </div>

        <div className="container mx-auto p-0 pt-10 pb-10">
          <News />
        </div>
      </div>
    </div>
  );
};

export default Home;
