"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Event Planning",
      description:
        "Seamlessly organize and manage your upcoming events with our intuitive interface",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time Management",
      description:
        "Never miss an important date with smart reminders and scheduling",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description:
        "Coordinate with team members and share event details effortlessly",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Analytics",
      description:
        "Track event performance and attendance with detailed insights",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20 backdrop-blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Welcome to the Events Calendar
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your premium platform for managing and discovering extraordinary
              events. Plan, organize, and elevate your experiences.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Powerful Features for Event Management
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to create and manage successful events
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              {...fadeInUp}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of event planners who trust our platform
          </p>
          <Link href="/add">
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transform transition-all duration-300 hover:scale-105">
              Get Started Now
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
