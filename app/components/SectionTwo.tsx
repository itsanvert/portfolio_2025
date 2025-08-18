"use client";
import React, { useState, useEffect } from "react";

// Tech categories with icons
const techCategories = {
  frontend: {
    title: "Frontend",
    color: "from-blue-400 to-blue-600",
    accent: "bg-blue-500",
    bgColor: "bg-blue-50/50",
    icons: [
      { name: "React", category: "Framework", color: "#61DAFB" },
      { name: "Next.js", category: "Framework", color: "#000000" },
      { name: "Tailwind", category: "CSS", color: "#06B6D4" },
      { name: "Vue.js", category: "Framework", color: "#4FC08D" },
      { name: "Framer", category: "Animation", color: "#0055FF" },
      { name: "Figma", category: "Design", color: "#F24E1E" },
    ],
  },
  backend: {
    title: "Backend",
    color: "from-emerald-400 to-emerald-600",
    accent: "bg-emerald-500",
    bgColor: "bg-emerald-50/50",
    icons: [
      { name: "Node.js", category: "Runtime", color: "#339933" },
      { name: "Laravel", category: "Framework", color: "#FF2D20" },
      { name: "Prisma", category: "ORM", color: "#2D3748" },
      { name: "MySQL", category: "Database", color: "#4479A1" },
      { name: "Supabase", category: "Database", color: "#3ECF8E" },
      { name: "Sanity", category: "CMS", color: "#F03E2F" },
    ],
  },
  devops: {
    title: "DevOps",
    color: "from-orange-400 to-orange-600",
    accent: "bg-orange-500",
    bgColor: "bg-orange-50/50",
    icons: [
      { name: "GitHub", category: "CI/CD", color: "#181717" },
      { name: "Docker", category: "Container", color: "#2496ED" },
      { name: "Vercel", category: "Hosting", color: "#000000" },
      { name: "AWS", category: "Cloud", color: "#232F3E" },
    ],
  },
  ai: {
    title: "AI Tools",
    color: "from-purple-400 to-purple-600",
    accent: "bg-purple-500",
    bgColor: "bg-purple-50/50",
    icons: [
      { name: "ChatGPT", category: "AI Assistant", color: "#10A37F" },
      { name: "Claude", category: "AI", color: "#D97706" },
      { name: "Gemini", category: "AI", color: "#4285F4" },
      { name: "Perplexity", category: "AI", color: "#1FB6FF" },
    ],
  },
};

const socialMedia = [
  {
    id: 1,
    name: "GitHub",
    username: "itsanvert",
    link: "https://github.com/itsanvert",
    color: "#181717",
    icon: "🐙",
  },
  {
    id: 2,
    name: "Facebook",
    username: "Vert San",
    link: "https://web.facebook.com/profile.php?id=61574843070322",
    color: "#1877F2",
    icon: "📘",
  },
  {
    id: 3,
    name: "TikTok",
    username: "Vert San",
    link: "https://tiktok.com/@vertsan",
    color: "#000000",
    icon: "🎵",
  },
];

export default function CleanTechStack() {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto carousel effect
  useEffect(() => {
    if (!isAutoPlay) return;

    const categories = Object.keys(techCategories);
    const interval = setInterval(() => {
      setActiveCategory((prev) => {
        const currentIndex = categories.indexOf(prev);
        return categories[(currentIndex + 1) % categories.length];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const currentCategory =
    techCategories[activeCategory as keyof typeof techCategories];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Tech Stack
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the technologies I use to build amazing digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Hero Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="relative h-96 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">💻</div>
                    <h2 className="text-3xl font-bold mb-2">My Tech Journey</h2>
                    <p className="text-lg opacity-90">
                      Building the future, one line at a time
                    </p>
                  </div>
                </div>

                {/* Floating particles */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                <div
                  className="absolute top-3/4 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-3/4 w-2 h-2 bg-white/40 rounded-full animate-bounce"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Tech Stack */}
          <div className="lg:col-span-3 space-y-8">
            {/* Category Selection */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {Object.entries(techCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    setIsAutoPlay(false);
                  }}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === key
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-current/25 scale-105`
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg border"
                  }`}
                  onMouseEnter={() => setIsAutoPlay(false)}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Tech Icons Display */}
            <div
              className={`rounded-2xl p-8 ${currentCategory.bgColor} border border-white shadow-xl backdrop-blur-sm transition-all duration-500`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-4 h-4 rounded-full ${currentCategory.accent}`}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {currentCategory.title}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {currentCategory.icons.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                      <div
                        className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl mx-auto"
                        style={{ backgroundColor: tech.color }}
                      >
                        {tech.name.charAt(0)}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-center mb-1">
                        {tech.name}
                      </h4>
                      <p className="text-sm text-gray-500 text-center">
                        {tech.category}
                      </p>
                    </div>

                    {/* Hover effect */}
                    <div
                      className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"
                      style={{
                        background: `linear-gradient(45deg, ${tech.color}40, ${tech.color}20)`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-play indicator */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex gap-2">
                {Object.keys(techCategories).map((key, index) => (
                  <div
                    key={key}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      key === activeCategory
                        ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                        : "w-2 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  isAutoPlay
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {isAutoPlay ? "⏸️" : "▶️"}
              </button>
            </div>

            {/* Social Media Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="text-center">
                      <div className="text-3xl mb-3">{social.icon}</div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {social.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        @{social.username}
                      </p>
                      <div className="w-full h-10 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center text-white font-medium group-hover:from-blue-500 group-hover:to-purple-600 transition-all duration-300">
                        Follow
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
