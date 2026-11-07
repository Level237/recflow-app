"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { DOWNLOADS, DOWNLOAD_MENU } from "@/lib/downloads";
import {
  detectDownloadPlatform,
  downloadLabel,
  type DownloadPlatform,
} from "@/lib/platform";
import { LinuxMark } from "@/components/icons/LinuxMark";
import { WindowsMark } from "@/components/icons/WindowsMark";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

type DownloadButtonProps = {
  size?: "header" | "hero";
};

export function DownloadButton({ size = "header" }: DownloadButtonProps) {
  if (size === "hero") {
    return <HeroDownloadMenu />;
  }
  return <HeaderDownloadLink />;
}

function HeaderDownloadLink() {
  const [platform, setPlatform] = useState<DownloadPlatform>("windows");

  useEffect(() => {
    setPlatform(detectDownloadPlatform());
  }, []);

  const label = downloadLabel(platform);

  return (
    <a
      href={DOWNLOADS[platform].href}
      aria-label={label}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-3.5 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-[#ff8a3d] active:scale-[0.98] sm:h-11 sm:px-5 sm:text-sm ${focus}`}
    >
      <span className="text-white" aria-hidden>
        {platform === "linux" ? (
          <LinuxMark className="h-3.5 w-3.5" />
        ) : (
          <WindowsMark className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="sm:hidden">Download</span>
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function HeroDownloadMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className={`inline-flex h-12 min-w-[13.5rem] items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-accent-ink transition-colors duration-150 hover:bg-[#ff8a3d] active:scale-[0.98] ${focus}`}
      >
        Download
        <svg
          viewBox="0 0 12 12"
          aria-hidden
          className={`h-2.5 w-2.5 text-accent-ink transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path
            fill="currentColor"
            d="M2.2 4.1 6 7.9l3.8-3.8a.75.75 0 0 1 1.06 1.06L6.53 9.49a.75.75 0 0 1-1.06 0L1.14 5.16A.75.75 0 0 1 2.2 4.1Z"
          />
        </svg>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose a package"
          className="absolute left-1/2 top-[calc(100%+8px)] z-20 w-[15.5rem] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-[#262628]/95 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        >
          {DOWNLOAD_MENU.map((group) => (
            <div key={group.group} className="px-1.5 py-1">
              <p className="px-2 pb-1 text-[10px] font-medium tracking-wide text-white/35">
                {group.group}
              </p>
              <div className="flex flex-col">
                {group.items.map((item) => (
                  <DownloadOption
                    key={item.id}
                    href={item.href}
                    label={item.label}
                    format={item.format}
                    hint={item.hint}
                    icon={
                      group.group === "Windows" ? (
                        <WindowsMark className="h-3.5 w-3.5" />
                      ) : (
                        <LinuxMark className="h-3.5 w-3.5" />
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DownloadOption({
  href,
  label,
  format,
  hint,
  icon,
}: {
  href: string;
  label: string;
  format: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <a
      role="menuitem"
      href={href}
      className={`grid grid-cols-[1.25rem_1fr_auto] items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-white transition-colors hover:bg-white/10 ${focus}`}
    >
      <span className="text-white/70">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-medium leading-4">
          {label}
        </span>
        <span className="block text-[11px] leading-4 text-white/35">{hint}</span>
      </span>
      <span className="font-mono text-[11px] text-accent">{format}</span>
    </a>
  );
}
