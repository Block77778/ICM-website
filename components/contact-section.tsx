"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageCircle, Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
          <h3 className="text-2xl font-bold mb-4 text-white">Message Sent Successfully!</h3>
          <p className="text-gray-300">
            Thank you for reaching out to the IceMelon team. We'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-6 text-[#56CCF2]">Get in Touch</h3>
          <p className="text-gray-300 mb-8">
            Have questions about IceMelon (ICM)? Want to learn more about our green crypto initiative? We'd love to hear
            from you!
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="w-6 h-6 text-[#ADFF2F] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Email Us</h4>
                <p className="text-gray-300 text-sm">For general inquiries and partnership opportunities</p>
                <a href="mailto:yonismalon@gmail.com" className="text-[#56CCF2] hover:text-[#4ECDC4] transition-colors">
                  yonismalon@gmail.com
                </a>
                <br />
                <a href="mailto:icmeo@atomicmail.io" className="text-[#56CCF2] hover:text-[#4ECDC4] transition-colors">
                  icmeo@atomicmail.io
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <MessageCircle className="w-6 h-6 text-[#ADFF2F] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Join Our Community</h4>
                <p className="text-gray-300 text-sm mb-2">
                  Connect with us on social media and join our growing community
                </p>
                <p className="text-gray-400 text-sm">
                  Find all our social media links in the <span className="text-[#56CCF2]">Official Links</span> section
                  above.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-[#2F80ED]/10 to-[#56CCF2]/10 rounded-lg">
            <h4 className="font-bold text-[#56CCF2] mb-2">🌱 Green Crypto Initiative</h4>
            <p className="text-gray-300 text-sm">
              IceMelon (ICM) is committed to funding renewable energy projects and building a sustainable blockchain
              future. Join us in the green crypto revolution!
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
          <h3 className="text-2xl font-bold mb-6 text-[#56CCF2]">Send us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#2F80ED]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#56CCF2] transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#2F80ED]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#56CCF2] transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/40 border border-[#2F80ED]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#56CCF2] transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-black/40 border border-[#2F80ED]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#56CCF2] transition-colors resize-vertical"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-bold text-white hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-4 text-center">
            * Required fields. We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>
  )
}
