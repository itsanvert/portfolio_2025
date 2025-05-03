"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/lib/181n";

export default function CoursePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
      <div className="relative w-full max-w-5xl mx-auto px-4">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="mb-12"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 shadow-lg">
                <BookOpen className="w-12 h-12 text-indigo-600 dark:text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-7xl font-bold mb-8 text-gray-900 dark:text-white"
            >
              {t("Course.comingSoon")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-white/80 mb-16 max-w-2xl mx-auto"
            >
              {t("Course.description")}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <Clock className="w-10 h-10 mb-6 text-indigo-600 dark:text-blue-400 mx-auto" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t("Course.features.expertLed.title")}
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  {t("Course.features.expertLed.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <Zap className="w-10 h-10 mb-6 text-purple-600 dark:text-purple-400 mx-auto" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t("Course.features.interactive.title")}
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  {t("Course.features.interactive.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <BookOpen className="w-10 h-10 mb-6 text-indigo-600 dark:text-blue-400 mx-auto" />
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {t("Course.features.comprehensive.title")}
                </h3>
                <p className="text-gray-600 dark:text-white/70">
                  {t("Course.features.comprehensive.description")}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button className="px-10 py-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white font-semibold text-xl shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
                {t("Course.joinWaitlist")}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
