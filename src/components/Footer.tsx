import { Instagram, Facebook, Linkedin } from 'lucide-react';
import tabbyLogo from '../assets/tabby-logo.png';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-16 text-center">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Tabby Payment Section */}
        <div className="pt-4 mb-8 pb-8 border-b border-gray-700">
          <h2 className="mb-4 text-2xl md:text-3xl text-white tracking-tight font-medium">
            Flexible Payment Options
          </h2>
          <p className="text-base text-gray-300 mb-6 max-w-[600px] mx-auto">
            We accept Tabby - Flexible payment options
          </p>

          <div className="flex justify-center">
            <img
              src={tabbyLogo}
              alt="Tabby Payment"
              className="h-16 w-auto"
            />

          </div>
        </div>

        <h3 className="text-white mb-2">Miami Dubai Clinic</h3>

        {/* Social Media Links */}
        <div className="flex justify-center items-center gap-4 my-4">
          <a
            href="https://www.instagram.com/miamigeneralclinic/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61567222492250"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.tiktok.com/@miamigeneralclinic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/miami-general-dental-clinic/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <p className="text-sm text-gray-500 m-0">
          © 2026 Dev Loom. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}