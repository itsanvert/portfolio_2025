"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Progress } from "./ui/progress";

interface CourseCardProps {
  title: string;
  description: string;
  progress?: number;
  href: string;
}

export function CourseCard({
  title,
  description,
  progress,
  href,
}: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link href={href}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          {progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
