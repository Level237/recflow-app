import { DockStage } from "@/components/DockStage";
import { DownloadButton } from "@/components/DownloadButton";

const focus =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

export function Hero() {
  return (
    <section
      id="overview"
      className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 pb-20 pt-10 text-center sm:px-6 sm:pt-16 lg:px-8 lg:pt-20"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/65">
        <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" aria-hidden />
        <span>Linux and Windows · Local files · No account</span>
      </div>

      <h1 className="mt-6 max-w-[16ch] text-4xl font-medium leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[4.15rem]">
        Record the screen. Not a studio.
      </h1>

      <p className="mt-5 max-w-[46ch] text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
        Show the bug, the demo, or the lesson without leaving your desktop.
        Stop, and the video is already in your folder.
      </p>

      <div id="download" className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <DownloadButton size="hero" />
        <a
          href="#features"
          className={`inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white active:scale-[0.98] ${focus}`}
        >
          See how it works
        </a>
      </div>

      <DockStage />
    </section>
  );
}
