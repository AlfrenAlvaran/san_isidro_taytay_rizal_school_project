import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// ── Data ─────────────────────────────────────────────────────────────────────

const categories = ["All Services", "Certificates & Documents", "Permits & Registration", "Assistance Programs"];

const services = [
  { title: "Barangay Clearance", desc: "Required for employment, business permits, and legal transactions.", tag: "Most Requested", fee: "₱50", processing: "Same day", category: "Certificates & Documents", icon: <DocIcon /> },
  { title: "Certificate of Indigency", desc: "For residents qualifying for government assistance and scholarships.", tag: null, fee: "Free", processing: "Same day", category: "Assistance Programs", icon: <PeopleIcon /> },
  { title: "Community Tax Certificate", desc: "Annual cedula issued to all residents and businesses.", tag: null, fee: "₱30 and up", processing: "Same day", category: "Certificates & Documents", icon: <TaxIcon /> },
  { title: "Barangay ID", desc: "Official identification card for Barangay San Isidro residents.", tag: null, fee: "₱100", processing: "3–5 days", category: "Certificates & Documents", icon: <IdIcon /> },
  { title: "Certificate of Residency", desc: "Proof of residence for legal, academic, and personal use.", tag: null, fee: "₱50", processing: "Same day", category: "Certificates & Documents", icon: <HomeIcon /> },
  { title: "Good Moral Certificate", desc: "Character reference issued for academic and professional applications.", tag: null, fee: "₱50", processing: "Same day", category: "Certificates & Documents", icon: <StarIcon /> },
  { title: "Business Permit Endorsement", desc: "Barangay-level clearance required before applying for a City Hall business permit.", tag: null, fee: "₱200 and up", processing: "1–2 days", category: "Permits & Registration", icon: <BriefcaseIcon /> },
  { title: "Certificate for Travel Abroad", desc: "Supporting document for OFWs and first-time travelers applying for a passport or visa.", tag: "Popular", fee: "₱50", processing: "Same day", category: "Certificates & Documents", icon: <PlaneIcon /> },
  { title: "First-Time Jobseeker Certificate", desc: "Fee-free certificate under RA 11261 (JobStart Law) for first-time applicants.", tag: "Free", fee: "Free", processing: "Same day", category: "Assistance Programs", icon: <SeedlingIcon /> },
  { title: "Senior Citizen Registration", desc: "Registers residents 60 and above for national and local senior citizen benefits.", tag: null, fee: "Free", processing: "3–5 days", category: "Assistance Programs", icon: <PeopleIcon /> },
  { title: "Solo Parent Registration", desc: "ID and registration for solo parents to access welfare benefits under RA 11861.", tag: null, fee: "Free", processing: "3–5 days", category: "Assistance Programs", icon: <HandHeartIcon /> },
  { title: "Blotter / Incident Report", desc: "Official filing and record of disputes, complaints, or incidents within the barangay.", tag: null, fee: "Free", processing: "Same day", category: "Permits & Registration", icon: <ReportIcon /> },
];

const requirements = [
  { title: "Valid Government ID", desc: "Any one original ID with a photo — UMID, passport, driver's license, or national ID." },
  { title: "Proof of Residency", desc: "A recent utility bill, lease contract, or barangay ID showing your San Isidro address." },
  { title: "Purpose Statement", desc: "A short note on what the document will be used for, required for some certificate types." },
  { title: "Applicable Fee", desc: "Most documents carry a minimal fee, payable in cash at the barangay hall or online." },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function DocIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>; }
function PeopleIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>; }
function TaxIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>; }
function IdIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" /></svg>; }
function HomeIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>; }
function StarIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" /></svg>; }
function BriefcaseIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>; }
function PlaneIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>; }
function SeedlingIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-14v10m-3-6c1.657 0 3-1.343 3-3m0 3c0-1.657 1.343-3 3-3" /></svg>; }
function HandHeartIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.3 0a2.251 2.251 0 015.3 0m-5.3 0c-.478.1-.949.223-1.41.368C9.033 4.588 8 5.884 8 7.362V17.5A2.5 2.5 0 0010.5 20h3a2.5 2.5 0 002.5-2.5V7.362c0-1.478-1.033-2.774-2.44-3.158-.461-.145-.932-.268-1.41-.368z" /></svg>; }
function ReportIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>; }
function CheckIcon() { return <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>; }

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useParallax() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return offset;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Services() {
  const scrollY = useParallax();
  const [activeCategory, setActiveCategory] = useState("All Services");

  const heroRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * -6;
    setTilt({ x, y });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  const filtered = activeCategory === "All Services"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative bg-[#0F172A] text-white overflow-hidden"
        style={{ minHeight: "56vh" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(184,134,11,0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(184,134,11,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            transform: `translateY(${scrollY * 0.25}px)`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.2}px)`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute right-8 top-10 sm:right-16 opacity-[0.06] pointer-events-none select-none"
          style={{ transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg) translateX(${tilt.x * -3}px)`, willChange: "transform" }}
        >
          <svg width="340" height="340" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#B8860B" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="70" stroke="#B8860B" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="50" stroke="#B8860B" strokeWidth="0.5" />
            {[0,45,90,135,180,225,270,315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line x1="100" y1="10" x2="100" y2="30" stroke="#B8860B" strokeWidth="1" />
                <polygon points="100,5 96,20 104,20" fill="#B8860B" opacity="0.8" />
              </g>
            ))}
            <circle cx="100" cy="100" r="5" fill="#B8860B" />
            <circle cx="100" cy="100" r="2.5" fill="#0F172A" />
          </svg>
        </div>

        <div
          className="relative max-w-6xl mx-auto px-6 sm:px-8 flex items-center"
          style={{
            minHeight: "calc(56vh - 64px)",
            transform: `perspective(1000px) rotateY(${tilt.x * 0.3}deg) rotateX(${tilt.y * 0.3}deg)`,
            transition: "transform 0.15s ease",
          }}
        >
          <div className="max-w-2xl py-20">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-5 h-px bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase">Barangay Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Every document,
              <span className="block text-slate-400 font-light mt-1">one office away.</span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              From clearances to welfare programs, browse everything Barangay San Isidro processes — with fees and turnaround times listed upfront.
            </p>
            <Link
              to="/request"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#B8860B] active:scale-[0.97] text-slate-900 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200"
            >
              Start a Request
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICE LIST WITH FILTER ────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-10">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Browse by category</p>
            <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">All Services</h2>
              <span className="text-sm text-slate-500">{filtered.length} of {services.length} services</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === c
                      ? "bg-[#0F172A] text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 6) * 50}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
          <Reveal>
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Before you apply</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">What you'll generally need</h2>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-sm">
              Requirements vary slightly by document, but most requests only need the following. Specific requirements are listed when you start a request.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requirements.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-xl p-5 h-full">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center mt-0.5">
                    <CheckIcon />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{r.title}</h3>
                    <p className="text-slate-500 text-[13px] leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal>
            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight mb-2">Don't see what you need?</h3>
            <p className="text-slate-400 text-sm">Call the hotline or drop by 123 Rizal Street · Mon–Fri, 8:00 AM – 5:00 PM · (02) 8-527-1234</p>
          </Reveal>
          <a href="#" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#B8860B] hover:text-white text-slate-900 text-sm font-semibold rounded-lg transition-all duration-200 group">
            Contact the Office
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </section>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ServiceCard({ title, desc, tag, fee, processing, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200 flex flex-col h-full"
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      {tag && (
        <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#B8860B]/10 text-[#B8860B] text-[10px] font-semibold tracking-wide rounded-md">{tag}</span>
      )}
      <div className="w-9 h-9 bg-slate-100 group-hover:bg-[#0F172A] text-slate-500 group-hover:text-white rounded-lg flex items-center justify-center mb-4 transition-all duration-200">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{title}</h3>
      <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{desc}</p>
      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Fee: <span className="text-slate-600 font-medium">{fee}</span></span>
        <span className="text-slate-400">{processing}</span>
      </div>
    </a>
  );
}
