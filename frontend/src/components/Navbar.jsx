import React from "react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Wow Facts", href: "#wow-facts" },
  { name: "Space Events", href: "#space-events" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isScrolled ? "fixed w-full z-40 transition-all duration-300 py-3 bg-black/90 backdrop-blur-lg shadow-lg border-b border-blue-500/20" : "fixed w-full z-40 transition-all duration-300 py-5 bg-transparent"}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a className="text-2xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity" href="#hero">
          <span className="text-white">THE</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">SPACE</span>
          <span className="text-white">STORY</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium relative group">
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-white hover:text-blue-400 transition-colors z-50 relative" aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center md:hidden">
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="text-2xl text-gray-300 hover:text-blue-400 transition-all duration-300 font-medium text-center" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};