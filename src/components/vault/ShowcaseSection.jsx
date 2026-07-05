const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";

const FEATURE_IMAGES = [
  {
    src: "https://media.db.com/images/public/6a479ca749b4b3e0734dfc59/1335fe17f_generated_838ed101.png",
    alt: "Abstract crystallized light forming interconnected nodes",
    title: "NEURAL INTERFACE",
    desc: "Adaptive UI that learns your workflow"
  },
  {
    src: "https://media.db.com/images/public/6a479ca749b4b3e0734dfc59/227b86243_generated_b956869b.png",
    alt: "Digital vault door unlocking with amber energy",
    title: "VAULT SECURITY",
    desc: "Military-grade encryption at every layer"
  },
  {
    src: "https://media.db.com/images/public/6a479ca749b4b3e0734dfc59/0cc9d96ee_generated_8002cc1e.png",
    alt: "Luminous amber filaments through crystalline structures",
    title: "DATA FABRIC",
    desc: "Real-time sync across all your devices"
  }
];

export default function ShowcaseSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="app" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-[#FDBA74] font-mono text-sm tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            // SOFTWARE SPECIFICATIONS
          </motion.p>
          <motion.h2
            className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-[#F8FAFC] tracking-[-0.04em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Built for precision.
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div className="horizontal-scroll overflow-x-auto px-6 md:px-12 lg:px-20">
        <div className="flex gap-6 max-w-7xl mx-auto pb-4">
          {FEATURE_IMAGES.map((img, i) => (
            <FeatureCard key={i} image={img} index={i} scrollProgress={scrollYProgress} />
          ))}
          {/* Scroll hint */}
          <div className="flex-shrink-0 w-64 flex items-center justify-center">
            <div className="flex items-center gap-2 text-[#94A3B8]/30 font-mono text-xs">
              <ChevronRight className="w-4 h-4" />
              SCROLL
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ image, index, scrollProgress }) {
  const y = useTransform(scrollProgress, [0, 1], [30 * (index + 1), -30 * (index + 1)]);

  return (
    <motion.div
      className="flex-shrink-0 w-[340px] md:w-[420px] group cursor-default"
      style={{ y }}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
    >
      <div className="relative rounded-xl overflow-hidden mb-4">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-56 md:h-64 object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 to-transparent" />
      </div>
      <p className="font-heading font-bold text-sm text-[#FDBA74] tracking-[0.15em] mb-1">
        {image.title}
      </p>
      <p className="font-mono text-xs text-[#94A3B8]">
        {image.desc}
      </p>
    </motion.div>
  );
}