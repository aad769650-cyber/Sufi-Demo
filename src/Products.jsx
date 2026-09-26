import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiHeart,
  FiEye,
  FiShoppingCart,
  FiChevronRight,
  FiChevronDown,
  FiCheck,
  FiGrid,
} from "react-icons/fi";
import { FaStar, FaLeaf } from "react-icons/fa";

/**
 * ---------------------------------------------------------------------------
 * DESIGN TOKENS (Sufi Abdul Aziz — Agricultural / Seed Co.)
 * ---------------------------------------------------------------------------
 * Deep green   #1F4D2C  — brand / primary actions
 * Field green  #2F6B3E  — secondary / hover states
 * Wheat gold   #C99A3E  — accents, ratings, price highlights
 * Cream        #FAF8F2  — section background
 * Bone border  #E7E2D6  — hairline borders / dividers
 * Ink          #1C231D  — headings / primary text
 * Slate        #6B7568  — supporting text
 *
 * Suggested type pairing (add to your Tailwind/font setup):
 *   Headings — "Fraunces" or "Cormorant" (serif, warm, editorial)
 *   Body     — "Inter" or "Work Sans" (clean, legible)
 * If those fonts aren't loaded in your project yet, this file falls back
 * to font-serif / font-sans so it still renders correctly.
 * ---------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------
// SAMPLE DATA — swap these arrays for API calls later (MongoDB/Express).
// Shape is deliberately flat and serializable so it maps 1:1 to a
// future GET /api/categories and GET /api/products response.
// -----------------------------------------------------------------------

const CATEGORIES = [
  {
    id: "haji-son",
    title: "Haji Son",
    type: "brand",
    description: "Trusted seed house, three generations of farmers",
    productCount: 18,
    image:
      "https://placehold.co/240x240/1F4D2C/FAF8F2?font=raleway&text=Haji+Son",
  },
  {
    id: "advanta",
    title: "Advanta",
    type: "brand",
    description: "Hybrid seed technology for higher yields",
    productCount: 14,
    image:
      "https://placehold.co/240x240/2F6B3E/FAF8F2?font=raleway&text=Advanta",
  },
  {
    id: "maize",
    title: "Maize Seeds",
    type: "crop",
    description: "High-yield hybrids for every soil type",
    productCount: 9,
    image:
      "https://placehold.co/240x240/C99A3E/1C231D?font=raleway&text=Maize",
  },
  {
    id: "wheat",
    title: "Wheat Seeds",
    type: "crop",
    description: "Disease-resistant, drought-tolerant varieties",
    productCount: 12,
    image:
      "https://placehold.co/240x240/D8B25C/1C231D?font=raleway&text=Wheat",
  },
  {
    id: "rice",
    title: "Rice Seeds",
    type: "crop",
    description: "Fine and coarse paddy for every region",
    productCount: 7,
    image:
      "https://placehold.co/240x240/3E7A4C/FAF8F2?font=raleway&text=Rice",
  },
  {
    id: "vegetable",
    title: "Vegetable Seeds",
    type: "crop",
    description: "Farm-to-table varieties, open pollinated & hybrid",
    productCount: 21,
    image:
      "https://placehold.co/240x240/4C8A5A/FAF8F2?font=raleway&text=Vegetable",
  },
  {
    id: "other",
    title: "Other Seeds",
    type: "crop",
    description: "Fodder, oilseed and specialty crop seed",
    productCount: 6,
    image:
      "https://placehold.co/240x240/8A7A4C/FAF8F2?font=raleway&text=Other",
  },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Haji Son Premium Seed",
    category: "haji-son",
    brand: "Haji Son",
    description: "Certified premium-grade seed, cleaned and graded for uniform germination.",
    pack: "1 kg bag",
    price: 850,
    oldPrice: 950,
    rating: 4.8,
    reviewCount: 132,
    stock: "in-stock",
    image:
      "https://placehold.co/500x500/1F4D2C/FAF8F2?font=raleway&text=Haji+Son+Seed",
  },
  {
    id: "p2",
    name: "Advanta Hybrid Seed",
    category: "advanta",
    brand: "Advanta",
    description: "Hybrid vigor bred for higher stand count and stronger early growth.",
    pack: "2 kg bag",
    price: 1650,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 98,
    stock: "in-stock",
    image:
      "https://placehold.co/500x500/2F6B3E/FAF8F2?font=raleway&text=Advanta+Hybrid",
  },
  {
    id: "p3",
    name: "Premium Maize Seed",
    category: "maize",
    brand: "Haji Son",
    description: "High-density planting hybrid with strong stalk and early maturity.",
    pack: "5 kg bag",
    price: 3200,
    oldPrice: 3600,
    rating: 4.7,
    reviewCount: 76,
    stock: "limited",
    image:
      "https://placehold.co/500x500/C99A3E/1C231D?font=raleway&text=Maize+Seed",
  },
  {
    id: "p4",
    name: "High Yield Wheat Seed",
    category: "wheat",
    brand: "Advanta",
    description: "Rust-resistant variety bred for irrigated plains, tested across seasons.",
    pack: "10 kg bag",
    price: 2100,
    oldPrice: null,
    rating: 4.5,
    reviewCount: 154,
    stock: "in-stock",
    image:
      "https://placehold.co/500x500/D8B25C/1C231D?font=raleway&text=Wheat+Seed",
  },
  {
    id: "p5",
    name: "Premium Rice Seed",
    category: "rice",
    brand: "Haji Son",
    description: "Fine long-grain paddy seed selected for uniform tillering.",
    pack: "5 kg bag",
    price: 2450,
    oldPrice: null,
    rating: 4.4,
    reviewCount: 61,
    stock: "out-of-stock",
    image:
      "https://placehold.co/500x500/3E7A4C/FAF8F2?font=raleway&text=Rice+Seed",
  },
  {
    id: "p6",
    name: "Golden Tomato Seed Mix",
    category: "vegetable",
    brand: "Advanta",
    description: "Hybrid tomato blend bred for firm skin and long shelf life.",
    pack: "250 g pack",
    price: 480,
    oldPrice: 550,
    rating: 4.9,
    reviewCount: 203,
    stock: "in-stock",
    image:
      "https://placehold.co/500x500/4C8A5A/FAF8F2?font=raleway&text=Tomato+Seed",
  },
  {
    id: "p7",
    name: "Fodder Sorghum Seed",
    category: "other",
    brand: "Haji Son",
    description: "Fast-growing green fodder variety, suited to multiple cuttings.",
    pack: "10 kg bag",
    price: 1800,
    oldPrice: null,
    rating: 4.3,
    reviewCount: 44,
    stock: "in-stock",
    image:
      "https://placehold.co/500x500/8A7A4C/FAF8F2?font=raleway&text=Fodder+Sorghum",
  },
  {
    id: "p8",
    name: "Advanta Sunflower Seed",
    category: "other",
    brand: "Advanta",
    description: "Oilseed hybrid with strong head formation and high oil content.",
    pack: "1 kg bag",
    price: 1250,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 39,
    stock: "limited",
    image:
      "https://placehold.co/500x500/C99A3E/1C231D?font=raleway&text=Sunflower+Seed",
  },
];

const STOCK_LABELS = {
  "in-stock": { label: "In Stock", dot: "bg-[#2F6B3E]", text: "text-[#2F6B3E]" },
  limited: { label: "Limited Stock", dot: "bg-[#C99A3E]", text: "text-[#C99A3E]" },
  "out-of-stock": { label: "Out of Stock", dot: "bg-[#B0453B]", text: "text-[#B0453B]" },
};

// -----------------------------------------------------------------------
// CategoryCard
// -----------------------------------------------------------------------
function CategoryCard({ category, isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(category.id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={[
        "relative flex-shrink-0 w-[168px] sm:w-[188px] text-left rounded-2xl p-4",
        "border transition-colors duration-200 bg-white",
        isSelected
          ? "border-[#1F4D2C] shadow-[0_10px_30px_-12px_rgba(31,77,44,0.35)]"
          : "border-[#E7E2D6] hover:border-[#2F6B3E]/50 shadow-sm",
      ].join(" ")}
    >
      {isSelected && (
        <motion.span
          layoutId="category-active-pill"
          className="absolute inset-0 rounded-2xl bg-[#1F4D2C]/[0.04] pointer-events-none"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}

      <div className="relative overflow-hidden rounded-xl mb-3 aspect-square">
        <img
          src={category.image}
          alt={category.title}
          className="h-full w-full object-cover"
        />
        {category.type === "brand" && (
          <span className="absolute top-2 left-2 rounded-full bg-[#1C231D]/80 px-2 py-0.5 text-[10px] tracking-wide text-white">
            Brand
          </span>
        )}
      </div>

      <h3
        className={[
          "font-serif text-[15px] leading-tight mb-1",
          isSelected ? "text-[#1F4D2C]" : "text-[#1C231D]",
        ].join(" ")}
      >
        {category.title}
      </h3>
      <p className="text-xs text-[#6B7568] leading-snug mb-2 line-clamp-2">
        {category.description}
      </p>
      <span className="text-[11px] font-medium text-[#8A7A4C]">
        {category.productCount} products
      </span>
    </motion.button>
  );
}

// -----------------------------------------------------------------------
// CategoryDropdown — premium "All Seeds" selector
// -----------------------------------------------------------------------
function CategoryDropdown({ categories, activeCategory, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const allOption = {
    id: "all",
    title: "All Seeds",
    description: "Browse the full catalog",
    productCount: categories.reduce((sum, c) => sum + c.productCount, 0),
  };

  const options = [allOption, ...categories];
  const selected = options.find((o) => o.id === activeCategory) || allOption;

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="relative w-full sm:w-[300px]">
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        className={[
          "flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors",
          isOpen
            ? "border-[#1F4D2C] ring-4 ring-[#1F4D2C]/10"
            : "border-[#E7E2D6] hover:border-[#2F6B3E]/50",
        ].join(" ")}
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#1F4D2C]/[0.06] text-[#1F4D2C]">
          {selected.image ? (
            <img
              src={selected.image}
              alt=""
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            <FiGrid className="h-4 w-4" />
          )}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block text-[11px] uppercase tracking-wide text-[#8A7A4C]">
            Category
          </span>
          <span className="block truncate font-serif text-[15px] text-[#1C231D]">
            {selected.title}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[#6B7568]"
        >
          <FiChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-[#E7E2D6] bg-white shadow-[0_20px_45px_-15px_rgba(28,35,29,0.25)]"
          >
            <div className="max-h-80 overflow-y-auto py-2">
              {options.map((option) => {
                const isSelected = option.id === activeCategory;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      onSelect(option.id);
                      setIsOpen(false);
                    }}
                    className={[
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      isSelected ? "bg-[#1F4D2C]/[0.05]" : "hover:bg-[#FAF8F2]",
                    ].join(" ")}
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F1EDE3]">
                      {option.image ? (
                        <img
                          src={option.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <FiGrid className="h-4 w-4 text-[#1F4D2C]" />
                      )}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] text-[#1C231D]">
                        {option.title}
                      </span>
                      <span className="block truncate text-[12px] text-[#6B7568]">
                        {option.productCount} products
                      </span>
                    </span>

                    {isSelected && (
                      <FiCheck className="h-4 w-4 flex-shrink-0 text-[#1F4D2C]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------------------------------------
// ProductCard
// -----------------------------------------------------------------------
function ProductCard({ product, onAddToCart, onQuickView, onToggleWishlist, isWishlisted }) {
  const stockInfo = STOCK_LABELS[product.stock];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col rounded-2xl border border-[#E7E2D6] bg-white overflow-hidden hover:shadow-[0_18px_40px_-20px_rgba(28,35,29,0.25)] hover:border-[#2F6B3E]/40 transition-colors duration-300"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F1EDE3]">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <span className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-[#1F4D2C] border border-[#1F4D2C]/15">
          {product.brand}
        </span>

        <button
          type="button"
          onClick={() => onToggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className={[
            "absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center border transition-colors",
            isWishlisted
              ? "bg-[#1F4D2C] border-[#1F4D2C] text-white"
              : "bg-white/95 border-[#E7E2D6] text-[#1C231D] hover:text-[#B0453B]",
          ].join(" ")}
        >
          <FiHeart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-white/95 border border-[#E7E2D6] flex items-center justify-center text-[#1C231D] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          aria-label="Quick view"
        >
          <FiEye className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-serif text-[16px] text-[#1C231D] leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-[13px] text-[#6B7568] leading-snug mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between text-[12px] text-[#6B7568] mb-3">
          <span className="inline-flex items-center gap-1">
            <FaLeaf className="h-3 w-3 text-[#2F6B3E]" />
            {product.pack}
          </span>
          <span className="inline-flex items-center gap-1">
            <span className={`h-1.5 w-1.5 rounded-full ${stockInfo.dot}`} />
            <span className={stockInfo.text}>{stockInfo.label}</span>
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(product.rating)
                  ? "h-3.5 w-3.5 text-[#C99A3E]"
                  : "h-3.5 w-3.5 text-[#E7E2D6]"
              }
            />
          ))}
          <span className="ml-1 text-[12px] text-[#6B7568]">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3 border-t border-[#E7E2D6]">
          <div>
            <span className="font-serif text-[19px] text-[#1F4D2C]">
              Rs {product.price.toLocaleString()}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-[13px] text-[#6B7568] line-through">
                Rs {product.oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === "out-of-stock"}
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
              product.stock === "out-of-stock"
                ? "bg-[#F1EDE3] text-[#6B7568] cursor-not-allowed"
                : "bg-[#1F4D2C] text-white hover:bg-[#2F6B3E]",
            ].join(" ")}
          >
            <FiShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------
// Main section
// -----------------------------------------------------------------------
export default function SeedsProductsSection({
  categories = CATEGORIES,
  products = PRODUCTS,
  onAddToCart = () => {},
  onQuickView = () => {},
  onViewAll = () => {},
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState(() => new Set());

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSelectCategory = (id) => {
    setActiveCategory((prev) => (prev === id ? "all" : id));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesQuery =
        query.trim().length === 0 ||
        product.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        product.brand.toLowerCase().includes(query.trim().toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  return (
    <section className="bg-[#FAF8F2] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Categories header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <span className="text-[12px] font-medium text-[#8A7A4C]">
              Sufi Abdul Aziz &middot; Seed Store
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C231D] mt-1">
              Shop by category
            </h2>
          </div>

          <CategoryDropdown
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Category rail */}
        <div className="flex gap-4 overflow-x-auto pb-3 -mx-1 px-1 sm:overflow-visible sm:flex-wrap scrollbar-thin">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={activeCategory === category.id}
              onSelect={handleSelectCategory}
            />
          ))}
        </div>

        {/* Products header + search */}
        <div className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1C231D]">
              Popular seeds
            </h2>
            <p className="text-sm text-[#6B7568] mt-1">
              {filteredProducts.length} of {products.length} seed varieties
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7568]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search seeds or brands"
              className="w-full rounded-full border border-[#E7E2D6] bg-white py-2.5 pl-10 pr-4 text-sm text-[#1C231D] placeholder:text-[#6B7568] focus:outline-none focus:border-[#2F6B3E] focus:ring-2 focus:ring-[#2F6B3E]/15"
            />
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={toggleWishlist}
                isWishlisted={wishlist.has(product.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 text-[#6B7568]">
            No seeds match your search. Try a different category or keyword.
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 rounded-full border border-[#1F4D2C] px-6 py-3 text-sm font-medium text-[#1F4D2C] hover:bg-[#1F4D2C] hover:text-white transition-colors"
          >
            View All Seeds
            <FiChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}