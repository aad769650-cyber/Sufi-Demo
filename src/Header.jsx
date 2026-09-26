import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { FaSeedling, FaAward, FaHandshake, FaLeaf } from "react-icons/fa";

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS (Sufi Abdul Aziz — Agricultural / Seed Co.)
 * ---------------------------------------------------------------------------
 * Deep green   #1F4D2C  — brand / primary actions
 * Field green  #2F6B3E  — secondary / hover states
 * Wheat gold   #C99A3E  — accents, ratings, highlights
 * Cream        #FAF8F2  — light backgrounds
 * Bone border  #E7E2D6  — hairline borders / dividers
 * Ink          #1C231D  — headings / primary text
 * Slate        #6B7568  — supporting text
 *
 * Type pairing (add to your project's font setup if not present):
 *   Headings — "Fraunces" or "Cormorant" (serif)
 *   Body     — "Inter" or "Work Sans" (sans)
 * Falls back to font-serif / font-sans so it still renders correctly
 * without those fonts loaded.
 * ---------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// DATA — replace/extend without touching layout code.
// -----------------------------------------------------------------------

const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "seeds", label: "Seeds", href: "#seeds" },
  { id: "categories", label: "Categories", href: "#categories" },
  { id: "about", label: "About Us", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const TRUST_POINTS = [
  { id: "quality", label: "Quality Seeds", icon: FaSeedling },
  { id: "trusted", label: "Trusted Products", icon: FaAward },
  { id: "reliable", label: "Reliable Farming Solutions", icon: FaHandshake },
];

// Swap for a real logo asset when available, e.g. logoSrc="/assets/logo.png"
const DEFAULT_LOGO_SRC = "";

// Swap for real farmland/crop photography when available.
const DEFAULT_HERO_IMAGE =
  "https://placehold.co/1920x1080/1F4D2C/1F4D2C?text=+";

// -----------------------------------------------------------------------
// Logo
// -----------------------------------------------------------------------
function Logo({ logoSrc, isScrolled }) {
  if (logoSrc) {
    return <img src={logoSrc} alt="Sufi Abdul Aziz" className="h-9 w-auto sm:h-10" />;
  }

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={[
          "flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
          isScrolled ? "bg-[#1F4D2C]" : "bg-white/15 backdrop-blur",
        ].join(" ")}
      >
        <FaLeaf className={isScrolled ? "h-4.5 w-4.5 text-[#C99A3E]" : "h-4.5 w-4.5 text-white"} />
      </span>
      <span className="leading-tight">
        <span
          className={[
            "block font-serif text-[17px] sm:text-[19px] tracking-tight transition-colors duration-300",
            isScrolled ? "text-[#1C231D]" : "text-white",
          ].join(" ")}
        >
          Sufi Abdul Aziz
        </span>
        <span
          className={[
            "block text-[10px] sm:text-[11px] tracking-[0.16em] uppercase transition-colors duration-300",
            isScrolled ? "text-[#8A7A4C]" : "text-white/70",
          ].join(" ")}
        >
          Seed Company
        </span>
      </span>
    </div>
  );
}

// -----------------------------------------------------------------------
// Header
// -----------------------------------------------------------------------
export function Header({ logoSrc = DEFAULT_LOGO_SRC, cartCount = 3, activeLink = "home" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const lightText = !isScrolled && !isMenuOpen;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen
          ? "bg-white/90 backdrop-blur-md shadow-[0_6px_24px_-8px_rgba(28,35,29,0.18)] border-b border-[#E7E2D6]"
          : "bg-gradient-to-b from-black/35 to-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex-shrink-0">
          <Logo logoSrc={logoSrc} isScrolled={isScrolled || isMenuOpen} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = link.id === activeLink;
            return (
              <a
                key={link.id}
                href={link.href}
                className={[
                  "relative px-4 py-2 text-[14px] font-medium transition-colors duration-200",
                  lightText
                    ? isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : isActive
                    ? "text-[#1F4D2C]"
                    : "text-[#1C231D]/75 hover:text-[#1F4D2C]",
                ].join(" ")}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className={[
                      "absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full",
                      lightText ? "bg-[#C99A3E]" : "bg-[#1F4D2C]",
                    ].join(" ")}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            className={[
              "hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200",
              lightText ? "text-white hover:bg-white/10" : "text-[#1C231D] hover:bg-[#F1EDE3]",
            ].join(" ")}
          >
            <FiSearch className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            aria-label="Account"
            className={[
              "hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200",
              lightText ? "text-white hover:bg-white/10" : "text-[#1C231D] hover:bg-[#F1EDE3]",
            ].join(" ")}
          >
            <FiUser className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            aria-label="Cart"
            className={[
              "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200",
              lightText ? "text-white hover:bg-white/10" : "text-[#1C231D] hover:bg-[#F1EDE3]",
            ].join(" ")}
          >
            <FiShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C99A3E] px-1 text-[10px] font-semibold text-[#1C231D]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
              lightText ? "text-white hover:bg-white/10" : "text-[#1C231D] hover:bg-[#F1EDE3]",
            ].join(" ")}
          >
            {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#E7E2D6] bg-white lg:hidden"
          >
            <nav className="flex flex-col px-4 py-3 sm:px-6">
              {NAV_LINKS.map((link) => {
                const isActive = link.id === activeLink;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors",
                      isActive
                        ? "bg-[#1F4D2C]/[0.06] text-[#1F4D2C]"
                        : "text-[#1C231D] hover:bg-[#F1EDE3]",
                    ].join(" ")}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="mt-2 flex items-center gap-2 border-t border-[#E7E2D6] pt-3">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-[#1C231D] hover:bg-[#F1EDE3]">
                  <FiSearch className="h-4 w-4" /> Search
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm text-[#1C231D] hover:bg-[#F1EDE3]">
                  <FiUser className="h-4 w-4" /> Account
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// -----------------------------------------------------------------------
// Decorative agricultural motif (subtle, low-opacity)
// -----------------------------------------------------------------------
function WheatMotif({ className }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="#C99A3E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5">
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
// Hero
// -----------------------------------------------------------------------
const heroVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function Hero({
  heroImage = DEFAULT_HERO_IMAGE,
  onExploreSeeds = () => {},
  onViewCategories = () => {},
}) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#173A22]"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Farmland and premium crop seeds"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#12301B]/85 via-[#173A22]/80 to-[#0F2717]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2717]/70 via-transparent to-transparent" />
      </div>

      {/* Decorative motifs */}
      <WheatMotif className="pointer-events-none absolute -right-6 top-16 h-40 w-40 opacity-30 sm:h-56 sm:w-56" />
      <WheatMotif className="pointer-events-none absolute -left-10 bottom-10 h-48 w-48 rotate-12 opacity-20 sm:h-64 sm:w-64" />

      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8"
      >
        <div className="max-w-2xl">
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur"
          >
            <FaLeaf className="h-3 w-3 text-[#C99A3E]" />
            Pakistan&apos;s Trusted Seed Company
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-5 font-serif text-[34px] leading-[1.15] text-white sm:text-[44px] lg:text-[54px]"
          >
            Premium seeds for a
            <br className="hidden sm:block" /> stronger harvest
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/80 sm:text-[16px]"
          >
            Sufi Abdul Aziz supplies certified, high-germination seed varieties
            to farmers across Pakistan — bred, tested and graded for
            consistent yield, season after season.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3.5">
            <motion.button
              type="button"
              onClick={onExploreSeeds}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-[#C99A3E] px-6 py-3.5 text-[14px] font-semibold text-[#1C231D] shadow-[0_14px_30px_-10px_rgba(201,154,62,0.6)] transition-colors hover:bg-[#D8AE5C]"
            >
              Explore Seeds
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onViewCategories}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-[14px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              View Categories
            </motion.button>
          </motion.div>

          {/* Trust row */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/15 pt-6"
          >
            {TRUST_POINTS.map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-[#C99A3E]" />
                </span>
                <span className="text-[13px] font-medium text-white/85">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// -----------------------------------------------------------------------
// Combined section — default export
// -----------------------------------------------------------------------
export default function HeaderHero(props) {
  return (
    <>
      <Header
        logoSrc={props.logoSrc}
        cartCount={props.cartCount}
        activeLink={props.activeLink}
      />
      <Hero
        heroImage={props.heroImage}
        onExploreSeeds={props.onExploreSeeds}
        onViewCategories={props.onViewCategories}
      />
    </>
  );
}