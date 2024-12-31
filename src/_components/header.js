'use client';
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";



export default function Header() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, 0.05, 0.01, 0.9],
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.header
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden"
    >
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-center mb-12 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl"
        >
          Event Calendar
        </motion.h1>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-8"
        >
          <Link
            href="/add"
            className="group relative px-10 py-4 w-full sm:w-auto text-center overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20"
          >
            <span className="relative z-10 font-semibold text-lg tracking-wide">
              Add Event
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_50%)]" />
          </Link>
          
          <Link
            href="/show"
            className="group relative px-10 py-4 w-full sm:w-auto text-center overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
          >
            <span className="relative z-10 font-semibold text-lg tracking-wide">
              Show Events
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_50%)]" />
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
}