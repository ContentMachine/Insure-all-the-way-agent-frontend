import classes from "./AuthLayout.module.css";
import authImage from "../../assets/images/authImage1.jpeg";
import authImage2 from "../../assets/images/authImage2.png";
import authImage3 from "../../assets/images/authImage3.jpeg";
import { useEffect, useState } from "react";
import Image from "next/image";
import { activeToggler } from "@/helpers/activeHandlers";

type AuthLayoutTypes = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutTypes) => {
  const [images, setImages] = useState([
    { image: authImage, isActive: true },
    { image: authImage2, isActive: false },
    { image: authImage3, isActive: false },
  ]);
  const [activeIndex, setActiveIndex] = useState(0);

  //   Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevState) => {
        if (prevState > images?.length - 2) {
          return 0;
        } else {
          return prevState + 1;
        }
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    activeToggler(activeIndex, images, setImages);
  }, [activeIndex]);

  console.log(activeIndex, "Test");

  return (
    <section className={classes.container}>
      <div>
        {images?.map((data) => {
          return (
            <Image
              src={data?.image}
              alt="Auth Image"
              className={data?.isActive ? classes.active : classes.inActive}
            />
          );
        })}

        <div className={classes.carouselContainer}>
          {images?.map((data, i) => (
            <div
              key={i}
              className={
                data?.isActive
                  ? classes.activeCarousel
                  : classes.inactiveCarousel
              }
              onClick={() => {
                activeToggler(i, images, setImages);
              }}
            ></div>
          ))}
        </div>
      </div>

      {children}
    </section>
  );
};

export default AuthLayout;
