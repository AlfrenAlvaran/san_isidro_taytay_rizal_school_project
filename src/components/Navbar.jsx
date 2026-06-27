import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Barangay Clearance", href: "#" },
      { label: "Indigency Certificate", href: "#" },
      { label: "Business Permit", href: "#" },
      { label: "Residency Certificate", href: "#" },
      { label: "Good Moral Certificate", href: "#" },
    ],
  },
 
  { label: "Contact", href: "#" },
];

function ChevronDown({ open }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// function SealIcon() {
//   return (
//     <div className="w-9 h-9 rounded-full bg-[#0F172A] border-2 border-[#B8860B] flex items-center justify-center flex-shrink-0">
//       <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
//         {[0,45,90,135,180,225,270,315].map((deg, i) => (
//           <line key={i}
//             x1="10" y1="3.5" x2="10" y2="2"
//             stroke="#B8860B" strokeWidth="1.2" strokeLinecap="round"
//             transform={`rotate(${deg} 10 10)`}
//           />
//         ))}
//         <circle cx="10" cy="10" r="3" fill="#B8860B" />
//         <circle cx="10" cy="10" r="1.5" fill="#0F172A" />
//       </svg>
//     </div>
//   );
// }

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-900/5"
          : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <img src="/logo.jpg" alt="logo" width={50} height={50} />
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[#0F172A] font-bold text-[15px] tracking-tight leading-none">
                  Brgy. San Isidro
                </span>
                <span className="hidden sm:inline text-slate-300 text-xs">·</span>
                <span className="hidden sm:inline text-slate-400 text-[11px] font-medium">Taytay Rizal</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-[0.12em] uppercase leading-none mt-0.5">
                Local Government Unit
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="group flex items-center gap-0.5 px-3.5 py-2 text-[13.5px] font-medium text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-50 transition-all duration-150"
                >
                  {link.label}
                  {link.children && <ChevronDown open={activeDropdown === link.label} />}
                </a>

                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-900/10 z-50 py-1.5 overflow-hidden">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="w-px h-5 bg-slate-200 mx-2" />

            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] active:scale-[0.98] text-white text-[13.5px] font-semibold rounded-lg transition-all duration-150"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request Certificate
            </a>
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-2">
            <a href="#" className="px-3 py-1.5 bg-[#0F172A] text-white text-xs font-semibold rounded-lg">
              Request
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="border-t border-slate-100 bg-white px-5 py-3 space-y-0.5">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {link.label}
                    <ChevronDown open={mobileDropdown === link.label} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${
                    mobileDropdown === link.label ? "max-h-64" : "max-h-0"
                  }`}>
                    <div className="ml-4 pl-3 border-l border-slate-100 py-1 space-y-0.5">
                      {link.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-3 py-2 text-[13px] text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-md transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              )}
            </div>
          ))}
          <div className="pt-2 pb-1">
            <a
              href="#"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request a Certificate
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
