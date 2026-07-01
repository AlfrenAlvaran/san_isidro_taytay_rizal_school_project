import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// ── Data ─────────────────────────────────────────────────────────────────────

const timeline = [
  {
    year: "1948",
    title: "Barangay Founded",
    desc: "San Isidro was formally established as a barrio of the City of Manila, named after its patron saint of laborers and farmers.",
  },
  {
    year: "1975",
    title: "First Barangay Hall Built",
    desc: "A permanent community hall was constructed along Rizal Street, replacing the original wooden meeting house.",
  },
  {
    year: "1991",
    title: "Local Government Code",
    desc: "San Isidro was reorganized under the Local Government Code of 1991, formalizing its councils and elected positions.",
  },
  {
    year: "2018",
    title: "Digital Records Initiative",
    desc: "The barangay began digitizing resident records, reducing average document processing time significantly.",
  },
  {
    year: "2024",
    title: "Online Services Launched",
    desc: "Residents gained the ability to request certificates and track applications online, from anywhere.",
  },
];

const values = [
  {
    title: "Transparency",
    desc: "Every peso and every decision is open to the community we serve.",
    icon: <EyeIcon />,
  },
  {
    title: "Accessibility",
    desc: "Services should be within reach of every resident, regardless of schedule or circumstance.",
    icon: <HandIcon />,
  },
  {
    title: "Accountability",
    desc: "Officials answer directly to the people who elected them.",
    icon: <ShieldIcon />,
  },
  {
    title: "Bayanihan",
    desc: "A community that carries its burdens, and its progress, together.",
    icon: <GroupIcon />,
  },
];

const departments = [
  {
    name: "Office of the Barangay Captain",
    role: "Executive leadership & external affairs",
  },
  {
    name: "Committee on Peace and Order",
    role: "Public safety & dispute mediation",
  },
  {
    name: "Committee on Health",
    role: "Barangay health station & wellness programs",
  },
  {
    name: "Committee on Education",
    role: "Scholarships & youth learning support",
  },
  {
    name: "Committee on Infrastructure",
    role: "Roads, drainage & public facilities",
  },
  { name: "Committee on Women and Family", role: "VAWC desk & family welfare" },
  {
    name: "Sangguniang Kabataan",
    role: "Youth council & youth development programs",
  },
  {
    name: "Barangay Treasury",
    role: "Budget, disbursements & financial reports",
  },
];

const officials = [
  {
    name: "Hon. Ricardo P. Bautista",
    role: "Barangay Captain",
    initials: "RB",
    isChief: true,
  },
  {
    name: "Councilor Ana Reyes",
    role: "Kagawad — Peace and Order",
    initials: "AR",
    isChief: false,
  },
  {
    name: "Councilor Ben Torres",
    role: "Kagawad — Infrastructure",
    initials: "BT",
    isChief: false,
  },
  {
    name: "Councilor Celia Lim",
    role: "Kagawad — Health",
    initials: "CL",
    isChief: false,
  },
  {
    name: "Councilor Dante Cruz",
    role: "Kagawad — Education",
    initials: "DC",
    isChief: false,
  },
  {
    name: "Councilor Fe Manalo",
    role: "Kagawad — Women and Family",
    initials: "FM",
    isChief: false,
  },
  {
    name: "Councilor Gino Alvarez",
    role: "Kagawad — Environment",
    initials: "GA",
    isChief: false,
  },
  {
    name: "Secretary Mila Domingo",
    role: "Barangay Secretary",
    initials: "MD",
    isChief: false,
  },
  {
    name: "Treasurer Paolo Ilagan",
    role: "Barangay Treasurer",
    initials: "PI",
    isChief: false,
  },
  {
    name: "SK Chair Ella Santos",
    role: "Sangguniang Kabataan",
    initials: "ES",
    isChief: false,
  },
];

// ── SVG Icons ─────────────────────────────────────────────────────────────────
function EyeIcon() {
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function HandIcon() {
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
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3"
      />
    </svg>
  );
}
function ShieldIcon() {
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
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}
function GroupIcon() {
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
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
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
export default function About() {
  const scrollY = useParallax();

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
          className="absolute top-10 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(184,134,11,0.12) 0%, transparent 70%)",
            transform: `translateY(${scrollY * 0.15}px) translateX(${tilt.x * 2}px)`,
            transition: "transform 0.1s ease",
            willChange: "transform",
          }}
        />

        <div
          className="absolute right-8 top-10 sm:right-16 opacity-[0.06] pointer-events-none select-none"
          style={{
            transform: `translateY(${scrollY * 0.08}px) rotate(${scrollY * 0.02}deg)`,
            willChange: "transform",
          }}
        >
          <svg width="340" height="340" viewBox="0 0 200 200" fill="none">
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
              <span className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase">
                About Us
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
              Since 1948, this has been
              <span className="block text-slate-400 font-light mt-1">
                our neighborhood's home.
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Barangay San Isidro is the smallest unit of government closest to
              you — and the one most accountable to you. Here's who we are and
              how we work.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION / VISION ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 h-full">
              <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Our Mission
              </p>
              <p className="text-slate-800 text-lg leading-relaxed">
                To deliver responsive, transparent, and accessible public
                service to every resident of Barangay San Isidro — protecting
                the welfare of our families, strengthening our streets, and
                building an inclusive community government.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-[#0F172A] rounded-xl p-8 h-full text-white">
              <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                Our Vision
              </p>
              <p className="text-slate-200 text-lg leading-relaxed">
                A safe, self-reliant, and progressive barangay where every
                resident has equal access to opportunity, and where local
                government earns trust through consistent, visible action.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-12 max-w-xl">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              What guides us
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Values
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="bg-white border border-slate-200 rounded-xl p-6 h-full hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-200">
                  <div className="w-9 h-9 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-14 max-w-xl">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Our History
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Milestones Along the Way
            </h2>
          </Reveal>
          <div className="relative max-w-2xl">
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-slate-200" />
            <div className="flex flex-col gap-10">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 80}>
                  <div className="relative flex gap-6">
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[11px] font-bold tracking-tight">
                      {t.year}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-semibold text-slate-900 text-sm mb-1.5">
                        {t.title}
                      </h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed max-w-md">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ORG STRUCTURE ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-12 max-w-xl">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              How we're organized
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Offices & Committees
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 rounded-xl overflow-hidden border border-slate-200">
            {departments.map((d, i) => (
              <Reveal key={d.name} delay={i * 40}>
                <div className="bg-white p-6 h-full hover:bg-slate-50 transition-colors duration-200">
                  <h3 className="font-semibold text-slate-900 text-sm mb-1">
                    {d.name}
                  </h3>
                  <p className="text-slate-500 text-[13px]">{d.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICIALS ────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <Reveal className="mb-12">
            <p className="text-[#B8860B] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              2022–2025 Term
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Elected Officials
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {officials.map((o, i) => (
              <Reveal key={o.name} delay={i * 50}>
                <div
                  className={`rounded-xl p-5 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1 ${o.isChief ? "bg-[#0F172A] text-white" : "bg-white border border-slate-200 hover:border-slate-300"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-3 ${o.isChief ? "bg-[#B8860B] text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {o.initials}
                  </div>
                  <p
                    className={`font-semibold text-[11px] leading-tight mb-1 ${o.isChief ? "text-white" : "text-slate-800"}`}
                  >
                    {o.name}
                  </p>
                  <p className="text-[10px] leading-snug text-slate-400">
                    {o.role}
                  </p>
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
            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight mb-2">
              Want to get involved?
            </h3>
            <p className="text-slate-400 text-sm">
              Barangay assemblies are open to all residents. Visit us at Aquarius Street, Brgy. San Isidro, Taytay Rizal · Mon–Fri, 8:00 AM – 5:00 PM
            </p>
          </Reveal>
          <Link
            to="/request"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#B8860B] hover:text-white text-slate-900 text-sm font-semibold rounded-lg transition-all duration-200 group"
          >
            Request a Certificate
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
          </Link>
        </div>
      </section>
    </div>
  );
}
