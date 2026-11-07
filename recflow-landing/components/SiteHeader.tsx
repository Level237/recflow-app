"use client";

import Image from "next/image";
import { useState } from "react";
import { DownloadButton } from "@/components/DownloadButton";

const NAV = [
  { href: "#overview", label: "Overview" },
  { href: "#features", label: "Features" },
  { href: "#platforms", label: "Platforms" },
  { href: "#privacy", label: "Privacy" },
] as const;

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#323233]/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:h-[4.75rem] sm:px-6 lg:px-8">
        <a
          href="#overview"
          className={`flex min-h-11 min-w-0 items-center gap-3 rounded-full ${focus}`}
        >
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 sm:h-14 sm:w-14"
            priority
          />
          <span className="truncate text-base font-medium tracking-tight text-white sm:text-lg">
            Recflow
          </span>
        </a>

        <nav
          aria-label="Product"
          className="ml-4 hidden flex-1 items-center justify-center gap-1 md:flex lg:gap-2"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 text-sm text-white/55 transition-colors hover:text-white lg:px-3.5 ${focus}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <DownloadButton size="header" />
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden ${focus}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="flex w-4 flex-col gap-1" aria-hidden>
              <span
                className={`h-px w-full bg-white transition-transform ${open ? "translate-y-[2.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-full bg-white transition-transform ${open ? "-translate-y-[2.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Product"
          className="bg-[#323233]/35 px-4 py-3 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-[15px] text-white/70 hover:bg-white/5 hover:text-white ${focus}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
