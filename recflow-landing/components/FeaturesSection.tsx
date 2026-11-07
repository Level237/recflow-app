"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    step: "01",
    title: "Region, display, or window",
    body: "Select a custom rectangle on screen, capture a full monitor, or record a single application window. Toggle the cursor before you start.",
    meta: "Draw the area, or take the whole display or one window",
  },
  {
    step: "02",
    title: "System audio and microphone in one take",
    body: "Record what plays on your computer, your voice, or both. Pick the input device directly from the dock without opening a mixer.",
    meta: "Both go into the same video",
  },
  {
    step: "03",
    title: "Quick takes or project folders",
    body: "Save one-off clips straight to Videos, or open a project folder so every take for a bug report or demo lands in the same place.",
    meta: "Videos folder, or a project folder you pick",
  },
  {
    step: "04",
    title: "Stays out of the recording",
    body: "The dock floats above your desktop while you set up. The area around the bar lets clicks pass through to the apps underneath.",
    meta: "Ctrl+Shift+R to start · Ctrl+Shift+S to stop",
  },
] as const;

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 35%"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-medium text-accent">Features</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Four controls. Everything else is your desktop.
          </h2>
          <p className="mt-4 max-w-[38ch] text-sm leading-6 text-white/50">
            Recflow is built for people who record demos, bug reports, and
            walkthroughs, and want a file at the end, not a timeline editor.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 lg:col-span-8">
          <div
            className="absolute bottom-3 left-0 top-3 w-px bg-white/10"
            aria-hidden
          />
          {!reduce && (
            <motion.div
              style={{ scaleY: railScale }}
              className="absolute bottom-3 left-0 top-3 w-px origin-top bg-accent"
              aria-hidden
            />
          )}

          <div className="divide-y divide-white/10 border-y border-white/10">
            {ITEMS.map((item) => (
              <motion.div
                key={item.step}
                initial={reduce ? false : { opacity: 0.2, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.45, margin: "-8% 0px -8% 0px" }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-12 sm:gap-6"
              >
                <span className="font-mono text-xs text-accent sm:col-span-2 sm:pt-1">
                  {item.step}
                </span>
                <div className="sm:col-span-10">
                  <h3 className="text-base font-medium text-white sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[58ch] text-sm leading-6 text-white/55">
                    {item.body}
                  </p>
                  <p className="mt-3 text-xs text-white/35">{item.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
