// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import {
//   IconX,
//   IconStar,
//   IconShoppingCart,
//   IconArrowsLeftRight,
//   IconCheck,
//   IconShieldCheckFilled,
//   IconChevronLeft,
//   IconChevronRight,
// } from "@tabler/icons-react";
// import { formatNaira } from "@/lib/format";
// import { useFeedStore } from "@/store/feed-store";
// import type { Product } from "@/features/feed/types";
// import { cn } from "@/lib/utils";

// interface ProductDetailModalProps {
//   product: Product;
//   onClose: () => void;
// }

// export function ProductDetailModal({
//   product,
//   onClose,
// }: ProductDetailModalProps) {
//   const [activeColorIdx, setActiveColorIdx] = useState(0);
//   const [activeStorage, setActiveStorage] = useState(
//     product.storage?.[0] ?? "",
//   );
//   const [activeImgIdx, setActiveImgIdx] = useState(0);

//   const addToCart = useFeedStore((s) => s.addToCart);
//   const recentlyAddedIds = useFeedStore((s) => s.recentlyAddedIds);
//   const openSwapOffer = useFeedStore((s) => s.openSwapOffer);
//   const isAdded = recentlyAddedIds.has(product.id);

//   // Use product.images if available, else just product.imageUrl
//   const images = product.images?.length ? product.images : [product.imageUrl];

//   return (
//     <AnimatePresence>
//       <motion.div
//         key="modal-backdrop"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs"
//       >
//         <motion.div
//           key="modal-content"
//           initial={{ opacity: 0, scale: 0.96, y: 24 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.95, y: 16 }}
//           transition={{ duration: 0.3, ease: "easeOut" }}
//           onClick={(e) => e.stopPropagation()}
//           className="relative mx-auto my-8 w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl"
//         >
//           {/* Close */}
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow transition-all hover:bg-white"
//           >
//             <IconX size={18} />
//           </button>

//           <div className="flex flex-col lg:flex-row">
//             {/* LEFT: Image gallery */}
//             <div className="relative w-full bg-[#F8F9FA] lg:w-[45%]">
//               {/* Main image */}
//               <div className="relative aspect-square overflow-hidden">
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={activeImgIdx}
//                     src={images[activeImgIdx]}
//                     alt={product.title}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.2 }}
//                     className="h-full w-full object-cover"
//                   />
//                 </AnimatePresence>

//                 {/* Sold Out banner */}
//                 {product.isSoldOut && (
//                   <div className="absolute right-0 bottom-4 left-0 flex justify-center">
//                     <span className="rounded-full bg-[#6B7280] px-4 py-1.5 text-xs font-bold text-white shadow">
//                       SOLD OUT
//                     </span>
//                   </div>
//                 )}

//                 {/* Prev/next if multiple images */}
//                 {images.length > 1 && (
//                   <>
//                     <button
//                       onClick={() =>
//                         setActiveImgIdx(
//                           (i) => (i - 1 + images.length) % images.length,
//                         )
//                       }
//                       className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
//                     >
//                       <IconChevronLeft size={16} />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setActiveImgIdx((i) => (i + 1) % images.length)
//                       }
//                       className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
//                     >
//                       <IconChevronRight size={16} />
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* Thumbnails */}
//               {images.length > 1 && (
//                 <div className="flex gap-2 p-3">
//                   {images.map((img, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setActiveImgIdx(i)}
//                       className={cn(
//                         "h-14 w-14 overflow-hidden rounded-xl border-2 transition-all",
//                         activeImgIdx === i
//                           ? "border-[#1A6B5A]"
//                           : "border-transparent opacity-60",
//                       )}
//                     >
//                       {/* eslint-disable-next-line @next/next/no-img-element */}
//                       <img
//                         src={img}
//                         alt=""
//                         className="h-full w-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* RIGHT: Product info */}
//             <div className="flex-1 overflow-y-auto p-6 lg:p-8">
//               {/* Brand + badges */}
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase">
//                   {product.brand}
//                 </span>
//                 {product.badge === "sale" && (
//                   <span className="rounded-full bg-[#F59E0B] px-2.5 py-0.5 text-[10px] font-bold text-white">
//                     SALE
//                   </span>
//                 )}
//                 {product.isSoldOut && (
//                   <span className="rounded-full bg-[#6B7280] px-2.5 py-0.5 text-[10px] font-bold text-white">
//                     SOLD OUT
//                   </span>
//                 )}
//               </div>

//               {/* Title */}
//               <h1 className="font-switzer mt-1 text-xl leading-tight font-bold text-[#1A1A1A] sm:text-2xl">
//                 {product.title}
//               </h1>

//               {/* Rating */}
//               <div className="mt-2 flex items-center gap-2">
//                 <div className="flex items-center gap-0.5">
//                   {[...Array(5)].map((_, i) => (
//                     <IconStar
//                       key={i}
//                       size={14}
//                       className={
//                         i < Math.round(product.rating)
//                           ? "fill-[#F59E0B] text-[#F59E0B]"
//                           : "fill-[#E5E7EB] text-[#E5E7EB]"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-[#6B7280]">
//                   <strong>{product.rating}</strong> (
//                   {product.reviewCount.toLocaleString()} reviews)
//                 </span>
//               </div>

//               {/* Price */}
//               <div className="mt-4 flex flex-wrap items-baseline gap-2">
//                 <span className="text-2xl font-bold text-[#1A1A1A]">
//                   {formatNaira(product.price)}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-sm text-[#9CA3AF] line-through">
//                     {formatNaira(product.originalPrice)}
//                   </span>
//                 )}
//                 {product.savingsPercent && (
//                   <span className="rounded-full bg-[#FFF7ED] px-2.5 py-0.5 text-xs font-bold text-[#F4762A]">
//                     Save {product.savingsPercent}%
//                   </span>
//                 )}
//               </div>

//               {/* Installment */}
//               {product.price > 200000 && (
//                 <p className="mt-1 text-xs text-[#9CA3AF]">
//                   Or 4 interest-free payments of{" "}
//                   <strong className="text-[#6B7280]">
//                     {formatNaira(product.price / 4)}
//                   </strong>
//                 </p>
//               )}

//               {/* Color selector */}
//               {product.colors && product.colors.length > 0 && (
//                 <div className="mt-5">
//                   <p className="mb-2 text-xs font-semibold text-[#374151]">
//                     Color:{" "}
//                     <span className="font-normal text-[#6B7280]">
//                       {product.colors[activeColorIdx].name}
//                     </span>
//                   </p>
//                   <div className="flex items-center gap-2">
//                     {product.colors.map((color, idx) => (
//                       <button
//                         key={color.name}
//                         title={color.name}
//                         onClick={() => setActiveColorIdx(idx)}
//                         className={cn(
//                           "h-7 w-7 rounded-full border-2 shadow-sm transition-all hover:scale-110",
//                           activeColorIdx === idx
//                             ? "scale-110 border-[#1A6B5A]"
//                             : "border-transparent",
//                         )}
//                         style={{ backgroundColor: color.hex }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Storage selector */}
//               {product.storage && product.storage.length > 0 && (
//                 <div className="mt-4">
//                   <p className="mb-2 text-xs font-semibold text-[#374151]">
//                     Storage
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {product.storage.map((s) => (
//                       <button
//                         key={s}
//                         onClick={() => setActiveStorage(s)}
//                         className={cn(
//                           "rounded-xl border px-3 py-2 text-xs font-semibold transition-all",
//                           activeStorage === s
//                             ? "border-[#1A6B5A] bg-[#1A6B5A] text-white"
//                             : "border-[#E5E7EB] text-[#6B7280] hover:border-[#1A6B5A]/40",
//                         )}
//                       >
//                         {s}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Seller info */}
//               <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] p-3">
//                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A6B5A]/10 text-sm font-bold text-[#1A6B5A]">
//                   {product.seller.username[0].toUpperCase()}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="flex items-center gap-1">
//                     <span className="text-xs font-semibold text-[#1A1A1A]">
//                       @{product.seller.username}
//                     </span>
//                     {product.seller.verified && (
//                       <IconShieldCheckFilled
//                         size={13}
//                         className="text-[#1A6B5A]"
//                       />
//                     )}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <IconStar
//                       size={10}
//                       className="fill-[#F59E0B] text-[#F59E0B]"
//                     />
//                     <span className="text-[11px] text-[#6B7280]">
//                       {product.seller.rating} · {product.seller.totalSales}{" "}
//                       sales
//                     </span>
//                   </div>
//                 </div>
//                 <span className="text-[11px] text-[#C4C9D4]">
//                   {product.listedAgo}
//                 </span>
//               </div>

//               {/* CTAs */}
//               <div className="mt-5 flex flex-col gap-2 sm:flex-row">
//                 <button
//                   disabled={!!product.isSoldOut}
//                   onClick={() => {
//                     addToCart(
//                       product,
//                       product.colors?.[activeColorIdx],
//                       activeStorage,
//                     );
//                   }}
//                   className={cn(
//                     "flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all",
//                     product.isSoldOut
//                       ? "cursor-not-allowed bg-[#F3F4F6] text-[#9CA3AF]"
//                       : isAdded
//                         ? "bg-emerald-500 text-white"
//                         : "hover:bg-swappr-teal-light bg-[#1A6B5A] text-white active:scale-[0.98]",
//                   )}
//                 >
//                   {isAdded ? (
//                     <>
//                       <IconCheck size={16} />
//                       Added to Cart
//                     </>
//                   ) : product.isSoldOut ? (
//                     "Sold Out"
//                   ) : (
//                     <>
//                       <IconShoppingCart size={16} />
//                       Add to Cart
//                     </>
//                   )}
//                 </button>

//                 {(product.mode === "swap" || product.mode === "both") && (
//                   <button
//                     onClick={() => {
//                       onClose();
//                       openSwapOffer(product);
//                     }}
//                     className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl border border-[#1A6B5A]/30 text-sm font-semibold text-[#1A6B5A] transition-all hover:border-[#1A6B5A] hover:bg-[#E8F5F1]"
//                   >
//                     <IconArrowsLeftRight size={16} />
//                     Make Swap Offer
//                   </button>
//                 )}
//               </div>

//               {/* Tech specs */}
//               {product.specs && Object.keys(product.specs).length > 0 && (
//                 <div className="mt-6">
//                   <h3 className="mb-3 text-sm font-bold text-[#1A1A1A]">
//                     Tech Specs
//                   </h3>
//                   <div className="overflow-hidden rounded-2xl border border-[#E5E7EB]">
//                     {Object.entries(product.specs).map(
//                       ([key, value], i, arr) => (
//                         <div
//                           key={key}
//                           className={cn(
//                             "flex items-center justify-between px-4 py-2.5",
//                             i % 2 === 0 ? "bg-white" : "bg-[#F8F9FA]",
//                             i < arr.length - 1 && "border-b border-[#F3F4F6]",
//                           )}
//                         >
//                           <span className="text-xs text-[#6B7280]">{key}</span>
//                           <span className="text-xs font-semibold text-[#1A1A1A]">
//                             {value}
//                           </span>
//                         </div>
//                       ),
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }
