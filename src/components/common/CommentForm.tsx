"use client";
import LeaveCommentImage from "@/assets/images/leave-comment-image.svg";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  FaCheck,
  FaChevronRight,
  FaPhoneAlt,
  FaUserCircle,
} from "react-icons/fa";
import { MdError } from "react-icons/md";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const CommentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    comment: "",
  });

  const [status, setStatus] = useState("default"); // "default", "success", "error"
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    comment: false,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name === "",
      email: formData.email === "",
      phoneNumber: formData.phoneNumber === "",
      comment: formData.comment === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!validateForm()) {
      setStatus("error");
      // Set timeout to reset status to default after 2 seconds
      setTimeout(() => {
        setStatus("default");
      }, 2000);
      return;
    }
    setStatus("default"); // Reset status to default before submitting
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/api/comments`,
        formData
      );
      if (response.status === 201) {
        setStatus("success");
        // Optionally, reset the form
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          comment: "",
        });
        // Set timeout to reset status to default after 2 seconds
        setTimeout(() => {
          setStatus("default");
        }, 2000);
      }
    } catch (error) {
      setStatus("error");
      // Set timeout to reset status to default after 2 seconds
      setTimeout(() => {
        setStatus("default");
      }, 2000);
    }
  };

  return (
    <section className="max-w mx-auto my-4 flex flex-col justify-between relative">
      <div className="flex justify-center items-center mb-5 w-full">
        <div className="inline-block bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gradient">
            Leave A Comment.
          </h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center">
        {/* Image */}
        <div className="flex flex-col items-center md:w-1/2 text-center">
          <Image
            src={LeaveCommentImage}
            alt="Leave Comment Image"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>

        {/* Input Form */}
        <div className="md:w-1/2 mt-8 md:mt-0 md:ml-8  p-4 rounded-xl shadow-md backdrop-blur-2xl backdrop-saturate-200">
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="block mt-2 text-xl font-bold text-lightGold2">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaUserCircle className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block mt-2 text-xl font-bold text-lightGold2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaPhoneAlt className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="123-456-7890"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block mt-2 text-xl font-bold text-lightGold2">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <FaPhoneAlt className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="info@alburraqgroup.com"
                />
              </div>
            </div>
            <div className="mt-5">
              <label className="block mt-2 text-xl font-bold text-lightGold2">
                Your message
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                className={`bg-gray-50 border ${
                  errors.comment ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder="Leave a comment...."
              />
            </div>

            {/* Buttons */}
            <div className="mt-5">
              <AnimatePresence>
                {status === "default" && (
                  <motion.button
                    key="default"
                    type="submit"
                    className="bg-slate-800 text-slate-50 py-2 px-4 border rounded-xl flex items-center relative"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span className="flex items-center font-semibold">
                      Submit <FaChevronRight className="ml-2" />
                    </motion.span>
                  </motion.button>
                )}
                {status === "success" && (
                  <motion.button
                    key="success"
                    type="button"
                    className="bg-green-800 text-slate-50 py-2 px-4 border rounded-xl flex items-center relative"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span className="flex items-center font-semibold">
                      Done <FaCheck className="ml-2" />
                    </motion.span>
                  </motion.button>
                )}
                {status === "error" && (
                  <motion.button
                    key="error"
                    type="button"
                    className="bg-red-800 text-slate-50 py-2 px-4 border rounded-xl flex items-center relative"
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.span className="flex items-center font-semibold">
                      Failed To Submit <MdError className="ml-2" />
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommentForm;
