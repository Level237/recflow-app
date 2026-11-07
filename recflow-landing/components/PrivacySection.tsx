import Image from "next/image";
import { DownloadButton } from "@/components/DownloadButton";

const FACTS = [
  {
    label: "No account",
    detail: "Open Recflow and record. There is nothing to sign up for.",
  },
  {
    label: "Nothing is uploaded",
    detail: "The app does not send your recording anywhere.",
  },
  {
    label: "Your folder",
    detail: "Each take is a video file in Videos, or in the project folder you pick.",
  },
] as const;

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium text-accent">Privacy</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
            The file stays on your computer.
          </h2>
          <p className="mt-4 max-w-[36ch] text-sm leading-6 text-white/50">
            Recflow is a desktop app. There is no account, and the video is
            written only where you decide.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-7">
          {FACTS.map((fact) => (
            <div key={fact.label} className="border-t border-accent/50 pt-4">
              <h3 className="text-sm font-medium text-white">{fact.label}</h3>
              <p className="mt-2 text-sm leading-6 text-white/50">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-[28px] border border-white/10 bg-[#1c1c1e]/75 px-6 py-10 text-center sm:flex-row sm:px-10 sm:text-left">
        <div>
          <h2 className="text-xl font-medium text-white sm:text-2xl">
            Download Recflow
          </h2>
          <p className="mt-1 text-sm text-white/50">
            Linux and Windows. The dock is the same.
          </p>
        </div>
        <DownloadButton size="hero" />
      </div>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 rounded-md"
          />
          <span className="font-medium text-white/70">Recflow</span>
          <span>v0.1.0</span>
        </div>
        <p>Screen recorder for Linux and Windows</p>
      </footer>
    </section>
  );
}
