import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";
import {
  FaLeaf,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS (Sufi Abdul Aziz — Agricultural / Seed Co.)
 * ---------------------------------------------------------------------------
 * Deep green   #1F4D2C  — brand / primary surfaces
 * Field green  #2F6B3E  — secondary / hover states
 * Ink green    #12301B  — darkest surfaces (CTA banner, base footer)
 * Wheat gold   #C99A3E  — accents, CTAs, icon highlights
 * Cream        #FAF8F2  — light backgrounds (unused here, kept for parity)
 * Bone/line    rgba(255,255,255,.12) — hairline borders on dark surfaces
 * Body text    rgba(255,255,255,.72) — supporting text on dark surfaces
 * ---------------------------------------------------------------------------
 * Swap NAV / SOCIAL / CONTACT arrays for CMS or API data later; replace
 * <a href> with React Router's <Link to> once routing is wired up.
 * ---------------------------------------------------------------------------
 */

const QUICK_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "seeds", label: "Seeds", href: "#seeds" },
  { id: "categories", label: "Categories", href: "#categories" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "track-order", label: "Track Order", href: "#track-order" },
];

const SEED_CATEGORIES = [
  { id: "haji-son", label: "Haji Son", href: "#categories/haji-son" },
  { id: "advanta", label: "Advanta", href: "#categories/advanta" },
  { id: "maize", label: "Maize Seeds", href: "#categories/maize" },
  { id: "wheat", label: "Wheat Seeds", href: "#categories/wheat" },
  { id: "rice", label: "Rice Seeds", href: "#categories/rice" },
  { id: "vegetable", label: "Vegetable Seeds", href: "#categories/vegetable" },
];

const SOCIAL_LINKS = [
  { id: "facebook", label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { id: "instagram", label: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { id: "youtube", label: "YouTube", href: "https://youtube.com", icon: FaYoutube },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
];

const CONTACT_INFO = {
  address: "Seed Market Road, Chowk Azam, Layyah, Punjab, Pakistan",
  phone: "+92 300 1234567",
  phoneHref: "+923001234567",
  email: "info@sufiabdulaziz.com",
  hours: "Mon – Sat: 9:00 AM – 7:00 PM",
};

const LEGAL_LINKS = [
  { id: "privacy", label: "Privacy Policy", href: "#privacy-policy" },
  { id: "terms", label: "Terms & Conditions", href: "#terms" },
  { id: "refund", label: "Refund Policy", href: "#refund-policy" },
];

// -----------------------------------------------------------------------
// Decorative agricultural motif — subtle, low-opacity, no external assets
// -----------------------------------------------------------------------
function WheatMotif({ className }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="#C99A3E" strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
        <path d="M100 190 L100 40" />
        {[...Array(9)].map((_, i) => {
          const y = 50 + i * 15;
          return (
            <g key={i}>
              <path d={`M100 ${y} Q ${88 - i} ${y - 10} 82 ${y - 18}`} />
              <path d={`M100 ${y} Q ${112 + i} ${y - 10} 118 ${y - 18}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// -----------------------------------------------------------------------
// Small reveal wrapper — respects prefers-reduced-motion
// -----------------------------------------------------------------------
function Reveal({ children, delay = 0, className }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------
export default function Footer({ onExploreSeeds = () => {}, onSubscribe = () => {} }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubscribe(email.trim());
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-[#12301B] text-white">
      {/* 1. Top CTA / brand banner */}
      <section className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[#1F4D2C]" />
        <WheatMotif className="pointer-events-none absolute -right-8 -top-6 h-44 w-44 opacity-25 sm:h-56 sm:w-56" />
        <WheatMotif className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rotate-[18deg] opacity-15 sm:h-48 sm:w-48" />

        <Reveal className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-serif text-[26px] leading-tight text-white sm:text-[32px]">
              Grow Better. Harvest Better.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/75 sm:text-[15px]">
              Certified, high-germination seed varieties bred and graded for
              consistent yield — trusted by farmers across Pakistan for
              generations.
            </p>
          </div>

          <motion.button
            type="button"
            onClick={onExploreSeeds}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#C99A3E] px-6 py-3.5 text-[14px] font-semibold text-[#1C231D] shadow-[0_14px_30px_-10px_rgba(201,154,62,0.55)] transition-colors hover:bg-[#D8AE5C]"
          >
            Explore Seeds
            <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </motion.button>
        </Reveal>
      </section>

      {/* 2. Main footer columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Brand */}
          <Reveal delay={0.05}>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                <FaLeaf className="h-4 w-4 text-[#C99A3E]" />
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-[17px] text-white">
                  Sufi Abdul Aziz
                </span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-white/60">
                  Seeds &amp; Farming Solutions
                </span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-white/65">
              A trusted name in agricultural seed supply, committed to
              quality, purity and reliable farming outcomes for growers of
              every scale.
            </p>

            <ul className="mt-5 flex items-center gap-2.5">
              {SOCIAL_LINKS.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors duration-200 hover:border-[#C99A3E]/60 hover:bg-[#C99A3E]/15 hover:text-[#C99A3E]"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Column 2 — Quick links */}
          <Reveal delay={0.1}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90">
              Quick Links
            </h3>
            <nav aria-label="Quick links">
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center text-[13.5px] text-white/65 transition-colors duration-200 hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-[#C99A3E] transition-all duration-200 group-hover:mr-2 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Column 3 — Seed categories */}
          <Reveal delay={0.15}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90">
              Seed Categories
            </h3>
            <nav aria-label="Seed categories">
              <ul className="mt-4 space-y-2.5">
                {SEED_CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <a
                      href={category.href}
                      className="group inline-flex items-center text-[13.5px] text-white/65 transition-colors duration-200 hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-[#C99A3E] transition-all duration-200 group-hover:mr-2 group-hover:w-3" />
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Column 4 — Contact */}
          <Reveal delay={0.2}>
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/90">
              Contact
            </h3>
            <address className="mt-4 space-y-3 text-[13.5px] not-italic text-white/65">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C99A3E]" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="h-4 w-4 flex-shrink-0 text-[#C99A3E]" />
                <a href={`tel:${CONTACT_INFO.phoneHref}`} className="hover:text-white">
                  {CONTACT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="h-4 w-4 flex-shrink-0 text-[#C99A3E]" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiClock className="h-4 w-4 flex-shrink-0 text-[#C99A3E]" />
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </address>
          </Reveal>
        </div>
      </div>

      {/* 3. Newsletter */}
      <section className="border-t border-white/10 bg-white/[0.03]">
        <Reveal className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <h3 className="font-serif text-[20px] text-white">Stay Updated</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/65">
                Get seasonal planting tips, new seed arrivals and farming
                insights delivered to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row lg:w-auto"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-[13.5px] text-white placeholder:text-white/40 focus:border-[#C99A3E] focus:outline-none focus:ring-2 focus:ring-[#C99A3E]/25 sm:min-w-[220px]"
              />
              <motion.button
                type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#C99A3E] px-5 py-3 text-[13.5px] font-semibold text-[#1C231D] transition-colors hover:bg-[#D8AE5C]"
              >
                <FiSend className="h-3.5 w-3.5" />
                Subscribe
              </motion.button>
            </form>
          </div>

          <p className="mt-3 text-[11.5px] text-white/45" role="status" aria-live="polite">
            {subscribed
              ? "Thanks — you're subscribed to our updates."
              : "We respect your privacy. Unsubscribe anytime, no spam."}
          </p>
        </Reveal>
      </section>

      {/* 4. Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-[12.5px] text-white/55 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>&copy; 2026 Sufi Abdul Aziz. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.href} className="transition-colors duration-200 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}