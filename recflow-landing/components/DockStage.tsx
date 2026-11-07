"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ChevronDown,
  Copy,
  FolderOpen,
  FolderPlus,
  Mic,
  MicOff,
  Monitor,
  MousePointer2,
  Pause,
  Play,
  Square,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

type Target = "selection" | "screen" | "window";

const TARGETS: { id: Target; label: string }[] = [
  { id: "selection", label: "Region" },
  { id: "screen", label: "Screen" },
  { id: "window", label: "Window" },
];

export function DockStage() {
  const [target, setTarget] = useState<Target>("selection");
  const [cursor, setCursor] = useState(true);
  const [systemAudio, setSystemAudio] = useState(true);
  const [mic, setMic] = useState(true);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <div className="relative mx-auto mt-14 w-full max-w-5xl max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] sm:mt-16">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1c1c1e]/75 px-2 pb-10 pt-8 shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:rounded-[36px] sm:px-10 sm:pb-14 sm:pt-12">
        <div
          className="pointer-events-none absolute inset-x-10 top-6 hidden justify-between text-[11px] text-white/30 sm:flex"
          aria-hidden
        >
          <span>Desktop surface</span>
          <span>Always on top · Click-through outside the dock</span>
        </div>

        <div className="mt-2 flex flex-col items-center gap-5 sm:mt-8">
          <div className="dock-fit">
            <div className="dock-fit-inner">
            <div className="box-border flex w-max flex-col gap-2.5 rounded-[32px] border border-white/12 bg-[#0f0f0f]/85 px-4 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-3xl">
              <div className="flex w-full min-w-max items-center justify-between gap-3 border-b border-white/[0.07] pb-2.5">
                <Image
                  src="/logo.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-[10px]"
                />
                <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] p-0.5">
                  <span className="flex h-7 items-center rounded-full bg-white/12 px-3 text-[11px] font-medium text-white">
                    Quick
                  </span>
                  <span className="flex h-7 items-center gap-1.5 rounded-full px-3 text-[11px] font-medium text-white/45">
                    <FolderOpen size={11} strokeWidth={2.2} />
                    <span>Open project</span>
                  </span>
                </div>
                <span className="flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-3 text-[11px] font-medium text-white/60">
                  <FolderPlus size={11} strokeWidth={2.2} />
                  <span>New project</span>
                </span>
              </div>

              <div className="flex min-w-max flex-nowrap items-center gap-3">
                <div
                  role="group"
                  aria-label="Capture target preview"
                  className="flex shrink-0 items-center gap-1 rounded-[20px] border border-white/5 bg-white/5 p-1"
                >
                  {TARGETS.map((item) => {
                    const selected = target === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTarget(item.id)}
                        className={`relative flex h-10 shrink-0 items-center gap-2 rounded-[16px] px-3.5 text-[11px] font-medium transition-colors ${
                          selected
                            ? "border border-white/10 bg-white/10 text-white"
                            : "text-white/40 hover:text-white/80"
                        }`}
                      >
                        {item.id === "selection" && <RegionGlyph />}
                        {item.id === "screen" && (
                          <Monitor size={16} strokeWidth={1.8} />
                        )}
                        {item.id === "window" && (
                          <Copy size={15} strokeWidth={1.8} />
                        )}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="h-6 w-px shrink-0 bg-white/10" />

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    aria-pressed={cursor}
                    aria-label="Toggle cursor in preview"
                    onClick={() => setCursor((value) => !value)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border transition-colors active:scale-95 ${
                      cursor
                        ? "border-white/12 bg-white/12 text-white"
                        : "border-white/5 bg-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    <MousePointer2
                      size={18}
                      strokeWidth={2.2}
                      className="-rotate-12"
                    />
                  </button>

                  <button
                    type="button"
                    aria-pressed={systemAudio}
                    aria-label="Toggle system audio in preview"
                    onClick={() => setSystemAudio((value) => !value)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border transition-colors active:scale-95 ${
                      systemAudio
                        ? "border-white/12 bg-white/12 text-white"
                        : "border-white/5 bg-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    {systemAudio ? (
                      <Volume2 size={18} strokeWidth={2} />
                    ) : (
                      <VolumeX size={18} strokeWidth={2} />
                    )}
                  </button>

                  <div
                    className={`flex h-10 shrink-0 items-center rounded-[14px] border ${
                      mic
                        ? "border-white/12 bg-white/12"
                        : "border-white/5 bg-white/5"
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={mic}
                      aria-label="Toggle microphone in preview"
                      onClick={() => setMic((value) => !value)}
                      className={`flex h-10 w-10 items-center justify-center rounded-l-[14px] transition-colors ${
                        mic ? "text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      {mic ? (
                        <Mic size={18} strokeWidth={2} />
                      ) : (
                        <MicOff size={18} strokeWidth={2} />
                      )}
                    </button>
                    <div className="h-4 w-px bg-white/10" />
                    <span
                      className="flex h-10 w-7 items-center justify-center text-white/70"
                      aria-hidden
                    >
                      <ChevronDown size={13} strokeWidth={2.3} />
                    </span>
                  </div>
                </div>

                <div className="h-6 w-px shrink-0 bg-white/10" />

                <button
                  type="button"
                  onClick={() => {
                    setRecording(true);
                    setPaused(false);
                  }}
                  className="flex h-10 shrink-0 items-center gap-2.5 rounded-[20px] bg-white px-4 text-sm font-medium text-[#111] transition-colors hover:bg-white/90 active:scale-[0.97]"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#111]" />
                  <span>Record</span>
                </button>

                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white/40"
                >
                  <X size={16} strokeWidth={2.2} />
                </span>
              </div>
            </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-3 rounded-[34px] border border-white/12 bg-[#0f0f0f]/85 py-2 pr-2.5 pl-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  {!paused && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-50" />
                  )}
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full bg-white ${
                      paused ? "opacity-40" : ""
                    }`}
                  />
                </span>
                <span className="text-sm font-bold tracking-tight text-white tabular-nums">
                  {recording ? "00:01:14" : "00:00:42"}
                </span>
                {paused && (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white">
                    Paused
                  </span>
                )}
              </div>

              <div className="h-5 w-px bg-white/20" />

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={
                    paused
                      ? "Resume preview timer"
                      : "Pause preview timer"
                  }
                  onClick={() => setPaused((value) => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 active:scale-95"
                >
                  {paused ? (
                    <Play size={16} strokeWidth={2.4} className="fill-white" />
                  ) : (
                    <Pause size={16} strokeWidth={2.4} className="fill-white" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecording(false);
                    setPaused(false);
                  }}
                  className="flex h-10 items-center gap-2 rounded-full bg-white px-3.5 text-sm font-medium text-[#111] transition-colors hover:bg-white/90 active:scale-95"
                >
                  <Square size={12} strokeWidth={2.6} className="fill-[#111]" />
                  <span>Stop</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegionGlyph() {
  return (
    <span className="relative flex h-4 w-5 items-center justify-center" aria-hidden>
      <span className="absolute inset-0 rounded-[2px] border-[1.5px] border-dashed border-current opacity-85" />
      <span className="absolute -top-0.5 -left-0.5 h-1.5 w-1.5 rounded-full bg-current" />
      <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-current" />
      <span className="absolute -bottom-0.5 -left-0.5 h-1.5 w-1.5 rounded-full bg-current" />
      <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-current" />
    </span>
  );
}
