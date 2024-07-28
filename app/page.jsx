"use client";

import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Feature from "@/components/home/Feature";
import { checkLoader } from "@/libs/customFunction";
import {
  faArrowLeft,
  faArrowRight,
  faBattery,
  faClipboardList,
  faClock,
  faDroplet,
  faEnvelope,
  faFaceSmileBeam,
  faHeartCircleCheck,
  faHeartPulse,
  faLink,
  faLocationDot,
  faMicrophone,
  faMusic,
  faPause,
  faPersonBiking,
  faPersonRunning,
  faPhone,
  faPlay,
  faSwimmer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

const carousel = [
  {
    img: "/imgs/hero1.png",
    title: "TECH AT HAND",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, molestias!",
    bg: "bg-gradient-to-r from-gray-900 to-gray-700",
  },
  {
    img: "/imgs/hero2.png",
    title: "TRENDY TECH GEAR",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, molestias!",
    bg: " bg-gradient-to-b from-gray-800 from-50% to-gray-600",
  },
  {
    img: "/imgs/hero3.png",
    title: "STYLE MEETS TECH",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, molestias!",
    bg: "bg-gradient-to-br from-gray-900 to-slate-600",
  },
];

export default function Home() {
  const [index, setIndex] = useState(0);

  const changeIndex = (type) => {
    if (type == "+") {
      setIndex(index + 1 == carousel.length ? 0 : index + 1);
    } else if (type == "-") {
      setIndex(index - 1 == -1 ? carousel.length - 1 : 0);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main>
      <div
        className={`select-none hero rounded-3xl relative text-white ${carousel[index].bg}`}
        onClick={() => changeIndex("+")}
      >
        <Header show={true} app={true}/>
        <div className="content flex items-center justify-between pb-1 px-16">
          <div className="info w-2/5" key={index}>
            <h1 className="text-5xl font-bold mb-5 title">
              {carousel[index].title}
            </h1>
            <p className="mb-12 desc">{carousel[index].desc}</p>
            <a
              href="/shop"
              className="px-10 py-4 rounded-3xl bg-custom hover:text-black hover:bg-white shop"
            >
              Shop Now
            </a>
          </div>
          <div
            className="img w-3/5 flex items-end justify-center bg-[length:800px] pb-5 bg-no-repeat bg-bottom"
            style={{
              backgroundImage: `url(${carousel[index].img})`,
              height: "750px",
            }}
          ></div>
        </div>
        <div className="arrows px-16 absolute bottom-16 w-full flex items-center justify-between">
          <button
            className="previous flex items-center justify-center gap-3 text-sm py-2 px-5 rounded-3xl border border-white arrow w-30"
            onClick={() => changeIndex("-")}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Previous</span>
          </button>
          <button
            className="next flex items-center justify-center gap-3 text-sm py-2 px-5 rounded-3xl border border-white arrow w-30"
            onClick={() => changeIndex("+")}
          >
            <FontAwesomeIcon icon={faArrowRight} />
            <span>Next</span>
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <section className="features flex items-center justify-center mt-24">
          <div className="info w-1/2">
            <h3 className="font-light uppercase text-xs tracking-widest">
              Explore FUnctionality
            </h3>
            <h1 className="font-bold text-4xl mt-5 mb-16 ">Main Features</h1>
            <div className="features-container">
              <Feature
                title={"Extended Battery Life"}
                desc={"Erat nam at lectus urna."}
                icon={faBattery}
              />
              <Feature
                title={"Microphone, Call, Track, Volume"}
                desc={"Tristique senectus et netus."}
                icon={faMicrophone}
              />
              <Feature
                title={"Seamless Connectivity"}
                desc={"Urna cursus eget nunc."}
                icon={faLink}
              />
              <Feature
                title={"Secure: Noise cancellation"}
                desc={"Interdum consectetur libero."}
                icon={faMusic}
              />
              <Feature
                title={"IPX4: Sweat and Splash Resistant"}
                desc={"Pellentesque eu tincidunt tortor."}
                icon={faDroplet}
              />
            </div>
          </div>
          <div className="img w-1/2 flex items-center justify-center">
            <img src="/imgs/features.png" alt="" />
          </div>
        </section>
        <section className="video mt-32">
          <h1 className="text-center font-bold text-4xl tracking-wider mb-2">
            Build To Last
          </h1>
          <p className="text-center mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
            molestias alias similique est velit eligendi non nisi nemo sint
            tenetur!
          </p>
          <div className="relative w-full h-full">
            <video
              className="w-full h-full rounded-3xl"
              ref={videoRef}
              muted
              loop
              onClick={togglePlay}
            >
              <source
                src="https://cdn.shopify.com/videos/c/o/v/ac66026e6d0f4780b248646131980470.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <button
              className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-2 border-white text-xl text-white"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <span>
                  <FontAwesomeIcon icon={faPause} />
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faPlay} />
                </span>
              )}
            </button>
          </div>
        </section>
        <section className="workouts mt-24 flex items-center justify-center flex-col">
          <h3 className="font-light uppercase text-xs tracking-widest text-center">
            Enchanced options
          </h3>
          <h1 className="font-bold text-4xl mt-5 mb-5 text-center">
            Elevate Your Workouts
          </h1>
          <p className="text-sm mb-16 text-center w-3/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            ad sit maxime autem veniam est ipsum ducimus magnam possimus
            tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="content flex items-center justify-center w-full">
            <div className="col-1 w-1/3 flex flex-col items-center justify-center">
              <Feature
                title={"Distance Tracking"}
                desc={"Aliquam nulla facilisi cras."}
                icon={faPersonBiking}
                position={1}
              />
              <Feature
                title={"Multi-Sport Modes"}
                desc={"Diam quam nulla porttitor."}
                icon={faPersonRunning}
                position={1}
              />
              <Feature
                title={"Sleep MOnitoring"}
                desc={"Scelerisque varius morbi."}
                icon={faClock}
                position={1}
              />
              <Feature
                title={"Water Resistance"}
                desc={"Condimentum id venenatis."}
                icon={faSwimmer}
                position={1}
              />
            </div>
            <div className="col-2 w-1/3 flex items-center justify-center">
              <img src="/imgs/workouts.png" alt="" />
            </div>
            <div className="col-3 w-1/3 flex flex-col items-center justify-center">
              <Feature
                title={"Calorie Burn Tracking"}
                desc={"Vel eros donec ac odiory."}
                icon={faHeartCircleCheck}
              />
              <Feature
                title={"Blood Pressure Track"}
                desc={"Eu ultrices vitae auctor."}
                icon={faHeartPulse}
              />
              <Feature
                title={"Guided Breath Sessions"}
                desc={"Malesuada pellentesque elit."}
                icon={faClipboardList}
              />
              <Feature
                title={"Joy Indicator"}
                desc={"Est placerat in egestas erat."}
                icon={faFaceSmileBeam}
              />
            </div>
          </div>
        </section>
        <section className="workouts mt-24 flex items-center justify-center flex-col">
          <h3 className="font-light uppercase text-xs tracking-widest text-center">
            SMART FEATURES
          </h3>
          <h1 className="font-bold text-4xl mt-5 mb-5 text-center">
            The Ultimate Companion
          </h1>
          <p className="text-sm mb-16 text-center w-3/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            ad sit maxime autem veniam est ipsum ducimus magnam possimus
            tempora? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="img-container w-full rounded-3xl">
            <img
              srcset="//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=375 375w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=550 550w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=750 750w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=1100 1100w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=1500 1500w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=1780 1780w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=2000 2000w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=3000 3000w,//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924 3202w"
              sizes="100vw"
              src="//timevo-theme.myshopify.com/cdn/shop/files/Rectangle_9.jpg?v=1710492924&amp;width=1500"
              loading="lazy"
              class="dt-sc-hotspot-image"
              alt=""
              width="3202"
              height="1200"
              className="rounded-3xl img-animation"
            ></img>
          </div>
        </section>
        <section className="workouts mt-24 flex items-center justify-center flex-col">
          <h3 className="font-light uppercase text-xs tracking-widest text-center">
            Contact Us
          </h3>
          <h1 className="font-bold text-4xl mt-5 mb-5 text-center">
            Get In Touch
          </h1>
          <div className="content w-full flex mt-10">
            <div className="info w-1/2">
              <Feature
                title={"Locate Us"}
                desc={"No: 58 A, East Madison Street, Baltimore, MD, USA 4508"}
                icon={faLocationDot}
              />
              <Feature
                title={"Chat with Us"}
                desc={"timevo@gmail.com"}
                icon={faEnvelope}
              />
              <Feature
                title={"Call Us"}
                desc={"+1 00-123-456-789"}
                icon={faPhone}
              />
            </div>
            <div className="form w-1/2">
              <form className="flex flex-col gap-5">
                <input
                  type="text"
                  placeholder="Name"
                  className="rounded-3xl w-9/12 px-8 py-4 border border-gray-400 outline-none select-none focus:border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="rounded-3xl w-9/12 px-8 py-4 border border-gray-400 outline-none select-none focus:border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className="rounded-3xl w-9/12 px-8 py-4 border border-gray-400 outline-none select-none focus:border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Comment"
                  className="rounded-3xl w-9/12 px-8 py-4 border border-gray-400 outline-none select-none focus:border-gray-300"
                />
                <button className="px-10 py-4 rounded-3xl bg-custom w-36 text-white text-center  hover:bg-black">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
