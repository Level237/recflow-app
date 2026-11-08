"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DOWNLOADS } from "@/lib/downloads";
import type { DownloadPlatform } from "@/lib/platform";
import { LinuxMark } from "@/components/icons/LinuxMark";
import { WindowsMark } from "@/components/icons/WindowsMark";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

const SPECS = {
  linux: {
    name: "Linux",
    badge: "Desktop package",
    summary:
      "Same floating dock. You grant the screen once, record a region, a display, or a window, and Recflow writes a WebM file in the folder you choose.",
    rows: [
      { label: "Install", value: ".deb or .rpm" },
      { label: "Video", value: "WebM" },
      { label: "Capture", value: "Region, full display, or one window" },
      { label: "Sound", value: "System audio and microphone" },
    ],
    cta: "Download .deb",
    secondary: { label: "Download .rpm", href: DOWNLOADS.linux.rpm },
    note: "Debian, Ubuntu, Fedora, openSUSE",
    href: DOWNLOADS.linux.href,
  },
  windows: {
    name: "Windows",
    badge: "Desktop app",
    summary:
      "The same dock on Windows. Record the screen, pause, and stop. Recflow writes an MP4 file on your computer.",
    rows: [
      { label: "Install", value: ".exe" },
      { label: "Video", value: "MP4" },
      { label: "Capture", value: "Display or window" },
      { label: "Sound", value: "System audio and microphone" },
    ],
    cta: "Download .exe",
    secondary: null,
    note: "Windows 10 and 11",
    href: DOWNLOADS.windows.href,
  },
} as const;

export function PlatformsSection() {
  const [active, setActive] = useState<DownloadPlatform>("linux");
  const reduce = useReducedMotion();
  const current = SPECS[active];

  return (
    <section
      id="platforms"
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium text-accent">Platforms</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Linux or Windows. The dock stays the same.
          </h2>
          <p className="mt-3 max-w-[36ch] text-sm leading-6 text-white/50">
            Pick your system. You get a normal video file, saved where you choose.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Operating system"
          className="inline-flex self-start rounded-full border border-white/10 bg-[#1c1c1e] p-1 sm:self-auto"
        >
          {(["linux", "windows"] as const).map((os) => {
            const selected = active === os;
            return (
              <button
                key={os}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(os)}
                className={`relative flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${focus} ${
                  selected ? "text-accent-ink" : "text-white/55 hover:text-white"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={reduce ? undefined : "platform-pill"}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute inset-0 rounded-full bg-accent"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {os === "linux" ? (
                    <LinuxMark className="h-4 w-4" />
                  ) : (
                    <WindowsMark className="h-3.5 w-3.5" />
                  )}
                  <span>{SPECS[os].name}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          role="tabpanel"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 grid grid-cols-1 gap-8 rounded-[32px] border border-white/10 bg-[#1c1c1e]/75 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white">
                  {active === "linux" ? (
                    <LinuxMark className="h-5 w-5" />
                  ) : (
                    <WindowsMark className="h-5 w-5" />
                  )}
                </span>
                <div>
                  <h3 className="text-xl font-medium text-white">
                    Recflow for {current.name}
                  </h3>
                  <p className="text-xs text-white/40">{current.badge}</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-white/55">
                {current.summary}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <a
                href={current.href}
                className={`inline-flex h-10 items-center justify-center rounded-full bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-[#ff8a3d] active:scale-[0.98] ${focus}`}
              >
                {current.cta}
              </a>
              {current.secondary && (
                <a
                  href={current.secondary.href}
                  className={`inline-flex h-10 items-center justify-center rounded-full border border-white/12 px-4 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white ${focus}`}
                >
                  {current.secondary.label}
                </a>
              )}
              <span className="text-xs text-white/40">{current.note}</span>
            </div>
          </div>

          <dl className="divide-y divide-white/10 border-y border-white/10 lg:col-span-7">
            {current.rows.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:gap-4"
              >
                <dt className="text-xs text-white/40 sm:col-span-4">
                  {row.label}
                </dt>
                <dd className="text-sm text-white/85 sm:col-span-8">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
