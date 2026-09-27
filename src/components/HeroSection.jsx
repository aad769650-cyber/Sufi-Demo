import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiGrid } from "react-icons/fi";
import { FaLeaf, FaSeedling, FaCheckCircle, FaHandshake } from "react-icons/fa";

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS (Sufi Abdul Aziz — Agricultural / Seed Co.)
 * ---------------------------------------------------------------------------
 * Deep green   #1F4D2C  — brand / primary actions
 * Field green  #2F6B3E  — secondary / hover states
 * Wheat gold   #C99A3E  — accents, highlights
 * Cream        #FAF8F2  — section background
 * Bone border  #E7E2D6  — hairline borders / dividers
 * Ink          #1C231D  — headings / primary text
 * Slate        #6B7568  — supporting text
 * ---------------------------------------------------------------------------
 * This section sits directly below the site's fixed header, so it carries
 * its own top padding (pt-28 / pt-32) to clear the header height rather
 * than assuming a header component is rendered above it.
 * ---------------------------------------------------------------------------
 */

const HEADLINE_LINES = [
  { text: "Quality Seeds.", accent: false },
  { text: "Stronger Crops.", accent: false },
  { text: "Better Harvests.", accent: true },
];

const TRUST_INDICATORS = [
  { id: "quality", label: "Quality Assured", icon: FaCheckCircle },
  { id: "varieties", label: "Trusted Seed Varieties", icon: FaSeedling },
  { id: "reliable", label: "Reliable Farming Solutions", icon: FaHandshake },
];

// Swap for real crop/farmland photography when available.
const DEFAULT_HERO_IMAGE =
  "https://placehold.co/900x1100/2F6B3E/FAF8F2?font=raleway&text=Healthy+Crop+Field";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection({
  id = "home",
  heroImage = DEFAULT_HERO_IMAGE,
  onExploreSeeds = () => {},
  onViewCategories = () => {},
}) {
  return (
    <section
      id={id}
      className="relative overflow-hidden bg-[#FAF8F2] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pb-28"
    >
      {/* Soft decorative background blobs — no distracting motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-[#C99A3E]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#1F4D2C]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left column — content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#1F4D2C]/15 bg-[#1F4D2C]/[0.05] px-4 py-1.5 text-[12px] font-medium tracking-wide text-[#1F4D2C]"
          >
            <FaLeaf className="h-3 w-3 text-[#C99A3E]" />
            Agricultural Seeds &amp; Farming Solutions
          </motion.span>

          <h1 className="mt-5 font-serif text-[36px] leading-[1.12] text-[#1C231D] sm:text-[46px] lg:text-[54px]">
            {HEADLINE_LINES.map((line, index) => (
              <motion.span
                key={index}
                variants={itemVariants}
                className={`block ${line.accent ? "text-[#1F4D2C]" : ""}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-lg text-[15px] leading-relaxed text-[#6B7568] sm:text-[16px]"
          >
            Sufi Abdul Aziz supplies certified, high-germination seed
            varieties bred and graded for consistent yield — built for
            farmers and agricultural businesses who depend on results, not
            promises.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3.5">
            <motion.button
              type="button"
              onClick={onExploreSeeds}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 rounded-full bg-[#1F4D2C] px-6 py-3.5 text-[14px] font-semibold text-white shadow-[0_16px_32px_-14px_rgba(31,77,44,0.55)] transition-colors hover:bg-[#2F6B3E]"
            >
              Explore Seeds
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              type="button"
              onClick={onViewCategories}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#1F4D2C]/20 bg-white px-6 py-3.5 text-[14px] font-semibold text-[#1F4D2C] transition-colors hover:bg-[#1F4D2C]/[0.05]"
            >
              <FiGrid className="h-4 w-4" />
              View Categories
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#E7E2D6] pt-6"
          >
            {TRUST_INDICATORS.map(({ id: trustId, label, icon: Icon }) => (
              <div key={trustId} className="flex items-center gap-2">
                <Icon className="h-4 w-4 flex-shrink-0 text-[#2F6B3E]" />
                <span className="text-[13px] font-medium text-[#1C231D]/80">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[3rem] rounded-br-[7rem] shadow-[0_30px_60px_-25px_rgba(28,35,29,0.35)]">
            <img
              src={heroImage}
              alt="Healthy crop field grown from Sufi Abdul Aziz seeds"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12301B]/25 via-transparent to-transparent" />
          </div>

          {/* Decorative ring accent */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-4 -top-4 hidden h-20 w-20 rounded-full border-2 border-[#C99A3E]/40 sm:block"
          />

          {/* Small floating stat chip */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.55 }}
            className="absolute -top-5 left-6 hidden items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_12px_28px_-14px_rgba(28,35,29,0.3)] sm:flex"
          >
            <span className="h-2 w-2 rounded-full bg-[#2F6B3E]" />
            <span className="text-[12px] font-semibold text-[#1C231D]">
              15+ Years of Trust
            </span>
          </motion.div>

          {/* Floating badge card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
            className="absolute -bottom-6 -left-4 flex max-w-[230px] items-center gap-3 rounded-2xl border border-[#E7E2D6] bg-white p-4 shadow-[0_20px_45px_-18px_rgba(28,35,29,0.3)] sm:-left-8"
          >
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1F4D2C]/[0.08]">
              <FaSeedling className="h-5 w-5 text-[#1F4D2C]" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13.5px] font-semibold text-[#1C231D]">
                Trusted Quality
              </span>
              <span className="block text-[12px] text-[#6B7568]">
                Premium Seed Selection
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}