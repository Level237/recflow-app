export type DownloadPlatform = "windows" | "linux";

export function detectDownloadPlatform(): DownloadPlatform {
  if (typeof navigator === "undefined") {
    return "windows";
  }

  const ua = navigator.userAgent;
  if (/Linux/i.test(ua) && !/Android/i.test(ua)) {
    return "linux";
  }

  return "windows";
}

export function downloadLabel(platform: DownloadPlatform): string {
  return platform === "linux" ? "Download for Linux" : "Download for Windows";
}
