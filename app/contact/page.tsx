"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, easeOut } from "framer-motion";

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(
        t("contact.error.requiredFields", "Please fill in all required fields")
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError(
        t("contact.error.invalidEmail", "Please enter a valid email address")
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
            const response = await fetch("/api/sent-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err: any) {
      setError(
        t("contact.error.submitFailed", "Failed to send message: ") +
          (err.message || "Please try again later.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {t("contact.title", "Contact")}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {t(
              "contact.description",
              "Get in touch and let's discuss how we can work together"
            )}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.h2
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              {t("contact.contactInfo", "Get In Touch")}
            </motion.h2>
            <div className="space-y-4">
              <motion.div
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    itsanvert@gmail.com
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg mr-4">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +855 (97) 90 78 615
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 transition-colors"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg mr-4">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Kandal, Cambodia
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {t("contact.sendMessage", "Send a Message")}
            </h2>
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {t(
                    "contact.successMessage",
                    "✓ Message sent successfully! I'll get back to you soon."
                  )}
                </p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-medium">
                  {error}
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.nameLabel", "Your Name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700"
                    placeholder={t("contact.namePlaceholder", "John Doe")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t("contact.emailLabel", "Email Address")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700"
                    placeholder={t(
                      "contact.emailPlaceholder",
                      "john@example.com"
                    )}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("contact.subjectLabel", "Subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dark:bg-gray-700"
                  placeholder={t(
                    "contact.subjectPlaceholder",
                    "Project Collaboration"
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  {t("contact.messageLabel", "Message")} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none dark:bg-gray-700"
                  placeholder={t(
                    "contact.messagePlaceholder",
                    "Tell me about your project or how I can help..."
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{t("contact.sending", "Sending...")}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>
                      {t("contact.sendMessageButton", "Send Message")}
                    </span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.p
            className="text-gray-500 dark:text-gray-400"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {t("contact.footer", "Looking forward to hearing from you!")}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;