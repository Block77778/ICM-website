import { Mail, Instagram, ExternalLink, Twitter } from "lucide-react"

export default function ContactSection() {
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
        Contact Information
      </h3>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="bg-black/40 p-4 rounded-lg flex items-center flex-shrink-0">
            <Mail className="w-6 h-6 text-[#56CCF2] mr-3" />
            <div>
              <h4 className="text-lg font-medium text-gray-300">Project Representative</h4>
              <p className="text-white font-bold">Yehonatan Alon</p>
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-lg flex-grow">
            <h4 className="text-lg font-medium text-gray-300 mb-2">Email</h4>
            <div className="space-y-2">
              <a
                href="mailto:icmcryptocurrency@gmail.com"
                className="flex items-center text-[#56CCF2] hover:text-[#4ECDC4] transition-colors"
              >
                icmcryptocurrency@gmail.com <ExternalLink className="ml-2" size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-black/40 p-4 rounded-lg">
          <h4 className="text-lg font-medium text-gray-300 mb-2">Social Media</h4>
          <div className="space-y-3">
            <a
              href="https://www.instagram.com/icemelon2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#56CCF2] hover:text-[#4ECDC4] transition-colors"
            >
              <Instagram className="mr-2" size={18} />
              @icemelon2025 <ExternalLink className="ml-2" size={14} />
            </a>

            <a
              href="https://x.com/icmcrypto_?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#56CCF2] hover:text-[#4ECDC4] transition-colors"
            >
              <Twitter className="mr-2" size={18} />
              @icmcrypto_ <ExternalLink className="ml-2" size={14} />
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#2F80ED]/10 to-[#56CCF2]/10 p-4 rounded-lg">
          <p className="text-gray-300">
            Have questions about IceMelon (ICM)? Want to join our team or explore partnership opportunities? Feel free
            to reach out to us through any of the channels above. We're always excited to connect with our community!
          </p>
        </div>
      </div>
    </div>
  )
}
