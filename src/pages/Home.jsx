import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// ── Data ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: "12,400+", label: "Registered Residents" },
  { value: "3,200+", label: "Documents Issued" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24h", label: "Average Processing" },
];

const services = [
  {
    title: "Barangay Clearance",
    desc: "Required for employment, business permits, and legal transactions.",
    tag: "Most Requested",
    icon: <DocIcon />,
  },
  {
    title: "Certificate of Indigency",
    desc: "For residents qualifying for government assistance and scholarships.",
    tag: null,
    icon: <PeopleIcon />,
  },
  {
    title: "Community Tax Certificate",
    desc: "Annual cedula issued to all residents and businesses.",
    tag: null,
    icon: <TaxIcon />,
  },
  {
    title: "Barangay ID",
    desc: "Official identification card for Barangay San Isidro residents.",
    tag: null,
    icon: <IdIcon />,
  },
  {
    title: "Certificate of Residency",
    desc: "Proof of residence for legal, academic, and personal use.",
    tag: null,
    icon: <HomeIconSvg />,
  },
  {
    title: "Good Moral Certificate",
    desc: "Character reference issued for academic and professional applications.",
    tag: null,
    icon: <StarIcon />,
  },
];

const steps = [
  {
    step: "01",
    title: "Create an Account",
    desc: "Register online and verify your identity with a valid government ID.",
  },
  {
    step: "02",
    title: "Submit a Request",
    desc: "Choose your document type and fill in the required information.",
  },
  {
    step: "03",
    title: "Track Your Request",
    desc: "Monitor real-time status updates via your personal dashboard.",
  },
  {
    step: "04",
    title: "Pick Up Your Document",
    desc: "Collect your signed and sealed document at the barangay hall.",
  },
];

const news = [
  {
    category: "Health",
    date: "Jun 18, 2025",
    title: "Free Medical Mission This Saturday",
    desc: "A free check-up and medicine distribution event will be held at the barangay covered court.",
  },
  {
    category: "Infrastructure",
    date: "Jun 10, 2025",
    title: "Road Repair on Rizal Street Begins",
    desc: "Expect minor traffic rerouting along Rizal Street for the next two weeks.",
  },
  {
    category: "Notice",
    date: "Jun 5, 2025",
    title: "Updated Office Hours for June",
    desc: "The barangay hall will operate on a modified schedule during the June 12 holiday week.",
  },
];

const milestones = [
  { year: "1820s", label: "Founded as a farming settlement" },
  { year: "1946", label: "Officially constituted as a barangay" },
  { year: "2024", label: "Launched online document portal" },
];

const barangayFacts = [
  { label: "Land Area", value: "2.4 km²" },
  { label: "Population", value: "12,400+" },
  { label: "Households", value: "3,100+" },
  { label: "Puroks", value: "8 zones" },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function DocIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function TaxIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
      />
    </svg>
  );
}
function IdIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"
      />
    </svg>
  );
}
function HomeIconSvg() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
      />
    </svg>
  );
}

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCountUp(target, visible, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const numeric = parseInt(target.replace(/\D/g, ""), 10);
    if (isNaN(numeric)) {
      setCount(target);
      return;
    }
    let start = 0;
    const step = numeric / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= numeric) {
        setCount(target);
        clearInterval(timer);
      } else
        setCount(
          Math.floor(start).toLocaleString() +
            (target.includes("+") ? "+" : target.includes("%") ? "%" : ""),
        );
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return count;
}

// ── Stat Item ─────────────────────────────────────────────────────────────────
function StatItem({ value, label, visible }) {
  const display = useCountUp(value, visible);
  return (
    <div className="px-6 py-7">
      <p className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
        {display || value}
      </p>
      <p className="text-slate-500 text-xs font-medium mt-1">{label}</p>
    </div>
  );
}

// ── Reveal wrapper ────────────────────────────────────────────────────────────
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
export default function Home() {
  const scrollY = useParallax();
  const [statsRef, statsVisible] = useInView(0.3);

  const heroRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    if (!heroRef.current) return;
    const { left, top, width, height } =
      heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 10;
    const y = ((e.clientY - top) / height - 0.5) * -6;
    setTilt({ x, y });
  };
  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      <div className="h-16" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative text-white overflow-hidden"
        style={{ minHeight: "90vh" }}
      >
        {/* Parallax background image */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/hero.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${scrollY * 0.4}px) scale(1.2)`,
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-[#0F172A]/70 pointer-events-none" />

        {/* Orbs */}
        <div
          className="absolute top-20 right-10 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184,134,11,0.12) 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.15}px) translateX(${tilt.x * 2}px)`,
            transition: "transform 0.1s ease",
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-10 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.35}px)`,
            willChange: "transform",
          }}
        />

        {/* Compass rose */}
        <div
          className="absolute right-8 top-24 sm:right-20 sm:top-16 opacity-[0.06] pointer-events-none select-none"
          style={{
            transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg) translateX(${tilt.x * -3}px)`,
            willChange: "transform",
          }}
        >
          <svg width="420" height="420" viewBox="0 0 200 200" fill="none">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#B8860B"
              strokeWidth="0.5"
            />
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#B8860B"
              strokeWidth="0.5"
            />
            <circle
              cx="100"
              cy="100"
              r="50"
              stroke="#B8860B"
              strokeWidth="0.5"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <g key={deg} transform={`rotate(${deg} 100 100)`}>
                <line
                  x1="100"
                  y1="10"
                  x2="100"
                  y2="30"
                  stroke="#B8860B"
                  strokeWidth="1"
                />
                <polygon
                  points="100,5 96,20 104,20"
                  fill="#B8860B"
                  opacity="0.8"
                />
              </g>
            ))}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
              (deg) => (
                <line
                  key={deg}
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="38"
                  stroke="#B8860B"
                  strokeWidth="0.5"
                  transform={`rotate(${deg} 100 100)`}
                />
              ),
            )}
            <circle cx="100" cy="100" r="5" fill="#B8860B" />
            <circle cx="100" cy="100" r="2.5" fill="#0F172A" />
          </svg>
        </div>

        {/* Hero content */}
        <div
          className="relative max-w-6xl mx-auto px-6 sm:px-8 flex items-center"
          style={{
            minHeight: "calc(90vh - 64px)",
            transform: `perspective(1000px) rotateY(${tilt.x * 0.3}deg) rotateX(${tilt.y * 0.3}deg)`,
            transition: "transform 0.15s ease",
          }}
        >
          <div className="max-w-3xl py-20 sm:py-28">
            <div
              className="flex items-center gap-2.5 mb-6"
              style={{ transform: `translateY(${scrollY * -0.04}px)` }}
            >
              <div className="w-5 h-px bg-[#B8860B]" />
              <span className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase">
                Republic of the Philippines · Province of Rizal
              </span>
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ transform: `translateY(${scrollY * -0.06}px)` }}
            >
              Barangay San Isidro
              <span className="block text-slate-400 font-light text-3xl sm:text-4xl lg:text-5xl mt-2">
                Serving our community.
              </span>
            </h1>
            <p
              className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
              style={{ transform: `translateY(${scrollY * -0.08}px)` }}
            >
              Transparent governance and efficient public service delivery for
              every resident of Barangay San Isidro.
            </p>
            <div
              className="flex flex-wrap gap-3"
              style={{ transform: `translateY(${scrollY * -0.1}px)` }}
            >
              <Link
                to="/request"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#B8860B] active:scale-[0.97] text-slate-900 hover:text-white text-sm font-semibold rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Request a Certificate
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-700 hover:border-[#B8860B] hover:bg-[#B8860B]/10 text-slate-300 hover:text-[#B8860B] text-sm font-medium rounded-lg transition-all duration-200"
              >
                View Services
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <span className="text-slate-600 text-[10px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent animate-pulse" />
        </div>

        {/* Stats bar */}
        <div ref={statsRef} className="relative border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-800">
            {stats.map((s) => (
              <StatItem
                key={s.label}
                value={s.value}
                label={s.label}
                visible={statsVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services" className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-12">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              What we offer
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Barangay Services
              </h2>
              <a
                href="#"
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
              >
                View all
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <ServiceCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-14 max-w-xl">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Process
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to get your certificate
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <StepCard {...s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / HISTORY ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <Reveal>
                <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                  Our Story
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                  A community rooted in history
                </h2>
              </Reveal>
              <Reveal delay={80}>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Barangay San Isidro is one of the barangays of the
                  Municipality of Taytay, Rizal, a historic town founded during
                  the Spanish colonial period and recognized as one of the
                  oldest municipalities in the province. Named after San Isidro
                  Labrador, the patron saint of farmers, the barangay reflects
                  Taytay's agricultural heritage before the municipality
                  gradually developed into one of Rizal's growing residential
                  and commercial centers.
                </p>
              </Reveal>

              <Reveal delay={140}>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-4">
                  Through the years, Barangay San Isidro has grown alongside the
                  continuous progress of Taytay while preserving the Filipino
                  values of unity, cooperation, and bayanihan. Today, the
                  barangay remains committed to providing transparent
                  governance, quality public services, disaster preparedness,
                  environmental stewardship, and programs that promote the
                  welfare, safety, and well-being of every resident.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-slate-600 text-[15px] leading-relaxed mb-8">
                  Today, Barangay San Isidro is home to over 12,000 residents
                  and continues to grow — committed to transparent governance,
                  accessible public services, and a safe, inclusive community
                  for every family.
                </p>
              </Reveal>
              <Reveal delay={260}>
                <div className="grid grid-cols-3 gap-4">
                  {milestones.map((m) => (
                    <div
                      key={m.year}
                      className="border-l-2 border-[#B8860B] pl-3"
                    >
                      <p className="text-[#B8860B] font-extrabold text-sm">
                        {m.year}
                      </p>
                      <p className="text-slate-500 text-[11px] leading-snug mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — fact card */}
            <Reveal delay={100}>
              <div className="relative lg:h-[420px] flex items-center justify-center">
                <div className="absolute inset-0 bg-[#0F172A] rounded-2xl rotate-3 opacity-60" />
                <div className="absolute inset-2 bg-[#B8860B]/20 border border-[#B8860B]/30 rounded-2xl -rotate-1" />
                <div className="relative bg-white rounded-2xl p-8 shadow-xl w-full mx-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                        <img src="/logo.jpg" alt="logo" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">
                        Barangay San Isidro
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        Est. 1820s · Province of Rizal
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {barangayFacts.map((r) => (
                      <div
                        key={r.label}
                        className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-500 text-xs">
                          {r.label}
                        </span>
                        <span className="text-slate-900 text-xs font-semibold">
                          {r.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEWS ─────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Stay informed
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Latest Announcements
              </h2>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              All announcements
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <Reveal key={n.title} delay={i * 80}>
                <NewsCard {...n} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────── */}
      <section className="bg-[#0F172A]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Reveal>
            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight mb-2">
              Need a document or have a concern?
            </h3>
            <p className="text-slate-400 text-sm">
              Visit us at 123 Rizal Street · Mon–Fri, 8:00 AM – 5:00 PM ·
              Hotline (02) 8-527-1234
            </p>
          </Reveal>
          <a
            href="#"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#B8860B] hover:text-white text-slate-900 text-sm font-semibold rounded-lg transition-all duration-200 group"
          >
            Contact the Office
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <p className="text-white font-bold text-sm mb-1">
                Barangay San Isidro
              </p>
              <p className="text-slate-500 text-xs mb-4">
                Taytay, Rizal · CALABARZON (Region IV-A)
              </p>
              <p className="text-slate-500 text-[13px] leading-relaxed max-w-xs">
                Committed to transparent governance and efficient delivery of
                public services to our community.
              </p>
            </div>
            <div>
              <p className="text-slate-300 text-xs font-semibold tracking-[0.12em] uppercase mb-4">
                Navigation
              </p>
              <ul className="space-y-2.5">
                {[
                  "Home",
                  "About Us",
                  "Services",
                  "Officials",
                  "News",
                  "Contact",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-200 text-[13px] transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-slate-300 text-xs font-semibold tracking-[0.12em] uppercase mb-4">
                Contact
              </p>
              <ul className="space-y-3 text-[13px]">
                <li className="text-slate-500">
                  Aquarius Street, Brgy. San Isidro, Taytay Rizal
                </li>
                <li className="text-slate-500">(02) 650-0139</li>
                {/* <li className="text-slate-500">bgy.sanisidro@manila.gov.ph</li> */}
                <li className="text-slate-500">Mon–Fri, 8:30 AM – 4:30 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-slate-600 text-xs">
              © Developer Alfren Alvaran. All rights reserved.
            </p>
            <p className="text-slate-700 text-xs">
              Republic of the Philippines · Local Government Unit
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ServiceCard({ title, desc, tag, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200 flex flex-col h-full"
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
      }}
    >
      {tag && (
        <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#B8860B]/10 text-[#B8860B] text-[10px] font-semibold tracking-wide rounded-md">
          {tag}
        </span>
      )}
      <div className="w-9 h-9 bg-slate-100 group-hover:bg-[#0F172A] text-slate-500 group-hover:text-white rounded-lg flex items-center justify-center mb-4 transition-all duration-200">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{title}</h3>
      <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
    </a>
  );
}

function StepCard({ step, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-white p-7 flex flex-col gap-4 h-full transition-colors duration-200"
      style={{ background: hovered ? "#0F172A" : "#fff" }}
    >
      <span
        style={{ color: "#B8860B" }}
        className="font-extrabold text-xs tracking-widest"
      >
        {step}
      </span>
      <div>
        <h3
          className="font-semibold text-sm mb-1.5 transition-colors duration-200"
          style={{ color: hovered ? "#fff" : "#0f172a" }}
        >
          {title}
        </h3>
        <p
          className="text-[13px] leading-relaxed transition-colors duration-200"
          style={{ color: hovered ? "#94a3b8" : "#64748b" }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function NewsCard({ category, date, title, desc }) {
  return (
    <a
      href="#"
      className="group bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-200 hover:-translate-y-1 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold rounded-md">
          {category}
        </span>
        <span className="text-slate-400 text-[11px]">{date}</span>
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 text-sm mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-slate-500 text-[13px] leading-relaxed">{desc}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-medium text-slate-400 group-hover:text-slate-900 transition-colors">
        Read more
        <svg
          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </a>
  );
}
