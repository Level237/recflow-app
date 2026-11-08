const ASSETS = {
  exe: "https://github.com/Level237/recflow-app/releases/download/v0.1.0/Recflow_0.1.0_x64-setup.exe",
  deb: "https://github.com/Level237/recflow-app/releases/download/v0.1.0/Recflow_0.1.0_amd64.deb",
  rpm: "https://github.com/Level237/recflow-app/releases/download/v0.1.0/Recflow-0.1.0-1.x86_64.rpm",
} as const;

export const DOWNLOADS = {
  windows: {
    label: "Windows",
    detail: "Installer (.exe)",
    href: ASSETS.exe,
  },
  linux: {
    label: "Linux",
    detail: "Package (.deb)",
    href: ASSETS.deb,
    rpm: ASSETS.rpm,
  },
} as const;

export const DOWNLOAD_MENU = [
  {
    group: "Windows",
    items: [
      {
        id: "windows",
        label: "Windows",
        format: ".exe",
        hint: "10 and 11",
        href: ASSETS.exe,
      },
    ],
  },
  {
    group: "Linux",
    items: [
      {
        id: "deb",
        label: "Debian, Ubuntu",
        format: ".deb",
        hint: "amd64",
        href: ASSETS.deb,
      },
      {
        id: "rpm",
        label: "Fedora, openSUSE",
        format: ".rpm",
        hint: "x86_64",
        href: ASSETS.rpm,
      },
    ],
  },
] as const;
