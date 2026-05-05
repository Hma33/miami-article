import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from "figma:asset/a7ba9f18a8f061a44ce6e9a4a2dbdea2acdad83e.png";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* ======================= */}
      {/* DESKTOP HEADER (MD+)    */}
      {/* ======================= */}
      <header className="hidden md:block border-b border-black sticky top-0 bg-white z-[1000] py-5">
        <div className="max-w-[1200px] mx-auto px-5">
          <nav className="flex justify-between items-center">
            <div>
              <Link to="/">
                <img
                  src={logo}
                  alt="Miami Dubai Clinic"
                  className="h-23 w-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Services
              </Link>
              <Link
                to="/team"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Team
              </Link>
              <Link
                to="/gallery"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Gallery
              </Link>
              <Link
                to="/articles"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Articles
              </Link>
              <a
                href="/#visit-us"
                className="text-sm uppercase tracking-wide hover:opacity-70 transition-opacity"
              >
                Contact
              </a>

              <a
                href="https://wa.me/message/BRARC5HBPTZCC1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[var(--color-navy)] text-white text-sm uppercase tracking-widest hover:opacity-90 transition-opacity rounded-full ml-5"
              >
                Book Now
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ======================= */}
      {/* MOBILE HEADER (< MD)    */}
      {/* ======================= */}
      <header className="md:hidden border-b border-black sticky top-0 bg-white z-[1000] py-5">
        <div className="max-w-[1200px] mx-auto px-5">
          <nav className="flex justify-between items-center">
            <div>
              <Link to="/" onClick={closeMenu}>
                <img
                  src={logo}
                  alt="Miami Dubai Clinic"
                  className="h-23 w-auto"
                />
              </Link>
            </div>

            <div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[var(--color-navy)]"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </nav>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-black shadow-xl flex flex-col p-6 animate-in slide-in-from-top-2 duration-200">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Services
            </Link>
            <Link
              to="/team"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Team
            </Link>
            <Link
              to="/gallery"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Gallery
            </Link>
            <Link
              to="/articles"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Articles
            </Link>
            <a
              href="/#visit-us"
              onClick={closeMenu}
              className="text-lg uppercase tracking-wide py-3 border-b border-gray-100"
            >
              Contact
            </a>

            <a
              href="https://wa.me/message/BRARC5HBPTZCC1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-6 text-center px-8 py-3 bg-[var(--color-navy)] text-white text-sm uppercase tracking-widest hover:opacity-90 transition-opacity rounded-full"
            >
              Book Now
            </a>
          </div>
        )}
      </header>
    </>
  );
}