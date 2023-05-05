import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
export default function Banner() {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1360px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div onClick={clickHandler} className="absolute right-[31px] md:right-[51px] bottom-6 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex justify-center items-center cursor-pointer hover:opacity-90">
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasPrev) => (
          <div onClick={clickHandler} className="absolute right-0 bottom-6 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex justify-center items-center cursor-pointer hover:opacity-90">
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        <div>
          <img
            src="./images/slide-1.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <p>shop now</p>
          <div className="absolute left-0 bottom-[25px] md:bottom-[75px] px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black bg-white text-[15px] md:text-[30px] font-oswald font-medium uppercase cursor-pointer hover:opacity-90">
            shop now
          </div>
        </div>
        <div>
          <img
            src="./images/slide-2.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <p>shop now</p>
          <div className="absolute left-0 bottom-[25px] md:bottom-[75px] px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black bg-white text-[15px] md:text-[30px] font-oswald font-medium uppercase cursor-pointer hover:opacity-90">
            shop now
          </div>
        </div>
        <div>
          <img
            src="./images/slide-3.png"
            className="aspect-[16/10] md:aspect-auto object-cover"
          />
          <p>shop now</p>
          <div className="absolute left-0 bottom-[25px] md:bottom-[75px] px-[15px] md:px-[40px] py-[10px] md:py-[25px] text-black bg-white text-[15px] md:text-[30px] font-oswald font-medium uppercase cursor-pointer hover:opacity-90">
            shop now
          </div>
        </div>
      </Carousel>
    </div>
  );
}
