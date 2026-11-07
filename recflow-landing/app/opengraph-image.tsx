import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  const src = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#323233",
          padding: "72px 80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={src} width={84} height={84} alt="" />
          <div style={{ fontSize: 36, fontWeight: 600 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              letterSpacing: -1.5,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Record the screen. Not a studio.
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.62)", maxWidth: 820 }}>
            {site.description}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 99,
              background: "#f97316",
            }}
          />
          <div style={{ color: "rgba(255,255,255,0.7)" }}>Linux and Windows</div>
        </div>
      </div>
    ),
    size,
  );
}
