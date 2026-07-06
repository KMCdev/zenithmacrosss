const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// To change images: replace the URLs below with your own image URLs.
// You can upload images to any image host (Imgur, Cloudinary, etc.) and paste the direct URL here.
const IMAGES = [
"https://imgur.com/FkrQ6Un",
"https://imgur.com/EqjkcZq",
// New images from the second batch:
"https://imgur.com/hjsXCD5",
"https://imgur.com/fr3tmRu",
"https://imgur.com/UwA5xg1",
"https://imgur.com/Tgm5Pwy",
"https://imgur.com/tnTfjyJ",
"https://imgur.com/5Tc8Tbq",
"https://imgur.com/0yCnaS6",
"https://imgur.com/DlWaEsl",
"https://imgur.com/ljllqzg",
"https://imgur.com/A5RbFHJ"];

export default function InterfaceView() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Interface</h1>
        <p className="text-white/50 text-sm">How Zenith Macros looks and feels in action. Click any image to zoom in.</p>
      </div>

      <div className="columns-1 md:columns-2 gap-4 space-y-4">
        {IMAGES.map((src, i) =>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onClick={() => setLightbox(src)}
          className="break-inside-avoid rounded-xl overflow-hidden border border-white/5 cursor-zoom-in">
          
            <img src="https://imgur.com/FkrQ6Un" alt={`Interface screenshot ${i + 1}`} className="w-full h-auto block" loading="lazy" />
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out">
          
            <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10">
            
              <X className="w-6 h-6" />
            </button>
            <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            src={lightbox}
            alt="Zoomed"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl border border-white/10 cursor-default" />
          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}