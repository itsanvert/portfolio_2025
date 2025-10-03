"use client";

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-black dark:text-white mb-4 uppercase tracking-tight"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            {t("contact.title", "Contact")}
          </motion.h1>
          <motion.p
            className="text-lg text-black/60 dark:text-white/60 max-w-2xl mx-auto"
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
              className="text-2xl font-black text-black dark:text-white mb-6 uppercase tracking-tight"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              {t("contact.contactInfo", "Get In Touch")}
            </motion.h2>
            <div className="space-y-4">
              <motion.div
                className="flex items-center p-4 border-2 border-black dark:border-white rounded-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-black/10 dark:bg-white/10 rounded-xl mr-4">
                  <Mail className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white">
                    Email
                  </h3>
                  <p className="text-black/70 dark:text-white/70">
                    itsanvert@gmail.com
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center p-4 border-2 border-black dark:border-white rounded-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-black/10 dark:bg-white/10 rounded-xl mr-4">
                  <Phone className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white">
                    Phone
                  </h3>
                  <p className="text-black/70 dark:text-white/70">
                    +855 (97) 90 78 615
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center p-4 border-2 border-black dark:border-white rounded-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="p-2 bg-black/10 dark:bg-white/10 rounded-xl mr-4">
                  <MapPin className="w-5 h-5 text-black dark:text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-black dark:text-white">
                    Location
                  </h3>
                  <p className="text-black/70 dark:text-white/70">
                    Kandal, Cambodia
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-black rounded-2xl p-6 sm:p-8 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            <h2 className="text-2xl font-black text-black dark:text-white mb-6 uppercase tracking-tight">
              {t("contact.sendMessage", "Send a Message")}
            </h2>
            {submitted && (
              <div className="mb-6 p-4 bg-black/5 dark:bg-white/5 border-2 border-black dark:border-white rounded-xl">
                <p className="text-black dark:text-white font-bold">
                  {t(
                    "contact.successMessage",
                    "✓ Message sent successfully! I'll get back to you soon."
                  )}
                </p>
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white rounded-xl">
                <p className="text-black dark:text-white font-bold">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-black dark:text-white mb-2"
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
                    className="w-full px-3 py-2 border-2 border-black dark:border-white rounded-xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all bg-white dark:bg-black"
                    placeholder={t("contact.namePlaceholder", "John Doe")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-black dark:text-white mb-2"
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
                    className="w-full px-3 py-2 border-2 border-black dark:border-white rounded-xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all bg-white dark:bg-black"
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
                  className="block text-sm font-bold text-black dark:text-white mb-2"
                >
                  {t("contact.subjectLabel", "Subject")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-black dark:border-white rounded-xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all bg-white dark:bg-black"
                  placeholder={t(
                    "contact.subjectPlaceholder",
                    "Project Collaboration"
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-bold text-black dark:text-white mb-2"
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
                  className="w-full px-3 py-2 border-2 border-black dark:border-white rounded-xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all resize-none bg-white dark:bg-black"
                  placeholder={t(
                    "contact.messagePlaceholder",
                    "Tell me about your project or how I can help..."
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white font-black uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 dark:border-white/30 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                    <span className="font-bold">
                      {t("contact.sending", "Sending...")}
                    </span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="font-bold">
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
          className="text-center mt-20"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.p
            className="text-black/50 dark:text-white/50 font-bold uppercase tracking-wider"
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
