import React from "react";
import Feature from "./home/Feature";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="mt-16 bg-black rounded-3xl text-white pt-28 px-16 pb-5">
      <div className="content flex">
        <div className="contact w-1/4 border-r border-gray-600">
          <img src="/imgs/logo.svg" className="mb-10" alt="" />
          <Feature
            title={"Locate Us"}
            desc={"No: 58 A, East Madison Street, Baltimore, MD, USA 4508"}
            icon={faLocationDot}
            size={1}
          />
          <Feature
            title={"Chat with Us"}
            desc={"timevo@gmail.com"}
            icon={faEnvelope}
            size={1}
          />
          <Feature
            title={"Call Us"}
            desc={"+1 00-123-456-789"}
            icon={faPhone}
            size={1}
          />
        </div>
        <div className="useful w-3/4 flex px-20 items-center justify-between">
          <div className="col">
            <h2 className="font-bold text-xl uppercase">Find A Store</h2>
            <p className="mt-5">Become a member</p>
            <p className="mt-5">Sign up for email</p>
            <p className="mt-5">Student Discounts</p>
            <p className="mt-5">Send us feedback</p>
            <p className="mt-5">Investors Site</p>
          </div>
          <div className="col">
            <h2 className="font-bold text-xl uppercase">Useful Links</h2>
            <p className="mt-5">Track Order</p>
            <p className="mt-5">Delivery & Return</p>
            <p className="mt-5">Gift Vouchers</p>
            <p className="mt-5">Careers</p>
            <p className="mt-5">Mobile Apps</p>
          </div>
          <div className="col">
            <h2 className="font-bold text-xl uppercase">About Timevo</h2>
            <p className="mt-5">Our Company</p>
            <p className="mt-5">Accessibility</p>
            <p className="mt-5">Store Directory</p>
            <p className="mt-5">Term of Use</p>
            <p className="mt-5">Privacy Policy</p>
          </div>
          <div className="col">
            <h2 className="font-bold text-xl uppercase">Quick Links</h2>
            <p className="mt-5">Facebook</p>
            <p className="mt-5">Instagram</p>
            <p className="mt-5">Twitter</p>
            <p className="mt-5">Youtube</p>
            <p className="mt-5">Snapchat</p>
          </div>
        </div>
      </div>
      <div className="copyright mt-10 border-t border-gray-600 py-5">
        <p>All Right Reserved © 2024 Designthemes</p>
      </div>
    </footer>
  );
}
