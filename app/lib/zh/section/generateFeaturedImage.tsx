/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

type GenerateFeaturedImageParams = {
  text: string;
};

export async function generateFeaturedImage({
  text,
}: GenerateFeaturedImageParams) {
  const notoSansScSemiBold = await readFile(
    join(process.cwd(), "app/fonts/NotoSansSC-SemiBold.ttf"),
  );

  const iconData = await readFile(
    join(process.cwd(), "app/images/zh/seekreturns-icon.svg"),
  );
  const iconSrc = `data:image/svg+xml;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          backgroundImage: "linear-gradient(to bottom, #dbeafe, #fafafa)",
          paddingRight: "4rem",
          paddingLeft: "4rem",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={iconSrc}
          alt="Seek Returns 标志"
          style={{
            width: "25%",
          }}
        />
        <div
          style={{
            color: "#262626",
            fontSize: "3rem",
            lineHeight: "1.3em",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          {text}
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "Noto Sans Simplified Chinese",
          data: notoSansScSemiBold,
        },
      ],
    },
  );
}
