"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { db } from "@/firebase/clientApp";

export default function AddEvent() {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.2 });

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventDescription: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const currentDate = new Date();

    const eventDate = new Date(formData.eventDate);

    if (eventDate <= currentDate) {
      setErrorMessage("You can only add future events, not past ones.");
      setIsSubmitting(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "events"), {
        name: formData.eventName,
        date: formData.eventDate,
        time: formData.eventTime,
        description: formData.eventDescription,
        createdAt: new Date().toISOString(),
      });

      console.log("Event added with ID: ", docRef.id);

      setFormData({
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventDescription: "",
      });

      redirect("/show-events");
    } catch (error) {
      console.error("Error adding event: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        ref={containerRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            Create New Event
          </motion.h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label
                htmlFor="eventName"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter event name"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="eventTime"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Event Time
              </label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                value={formData.eventTime}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label
                htmlFor="eventDescription"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Event Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter event description"
              ></textarea>
            </motion.div>

            {errorMessage && (
              <motion.div
                variants={itemVariants}
                className="text-red-500 text-sm mt-2"
              >
                {errorMessage}
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg shadow-lg hover:shadow-purple-500/25 transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating Event..." : "Create Event"}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
