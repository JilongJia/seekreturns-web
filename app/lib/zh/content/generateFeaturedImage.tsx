/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { IoHome } from "react-icons/io5";
import { LuChevronRight } from "react-icons/lu";

type BreadcrumbListItem = {
  name: string;
  url: string;
};

type TableOfContentsItem = {
  id: string;
  label: string;
  subHeadingsData?: { id: string; label: string }[];
};

type GenerateFeaturedImageParams = {
  title: string;
  description: string;
  modifiedDate: Date;
  tableOfContents: TableOfContentsItem[];
  section: string;
  breadcrumbList: BreadcrumbListItem[];
};

export async function generateFeaturedImage({
  title,
  description,
  modifiedDate,
  tableOfContents,
  section,
  breadcrumbList,
}: GenerateFeaturedImageParams) {
  const notoSansScRegular = await readFile(
    join(process.cwd(), "app/fonts/NotoSansSC-Regular.ttf"),
  );
  const notoSansScMedium = await readFile(
    join(process.cwd(), "app/fonts/NotoSansSC-Medium.ttf"),
  );
  const notoSansScSemiBold = await readFile(
    join(process.cwd(), "app/fonts/NotoSansSC-SemiBold.ttf"),
  );

  const logoData = await readFile(
    join(process.cwd(), "app/images/zh/seekreturns-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: "linear-gradient(to top right, #dbeafe, #2563eb)",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            alignItems: "flex-start",
            marginTop: "-10%",
            marginLeft: "5%",
            maxWidth: "40%",
          }}
        >
          <div
            style={{
              border: "1px solid #171717",
              borderRadius: "9999px",
              padding: "0.3rem 1rem",
              color: "#171717",
            }}
          >
            {section}
          </div>
          <div
            style={{
              color: "#171717",
              fontWeight: 600,
              fontSize: "2.8rem",
              lineHeight: "1.3em",
            }}
          >
            {title}
          </div>
        </div>

        <img
          src={logoSrc}
          alt="Seek Returns 标志"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "250px",
          }}
        />

        <div
          style={{
            display: "flex",
            position: "absolute",
            top: "20%",
            left: "55%",
            flexDirection: "column",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            borderRadius: "0.5rem",
            backgroundColor: "rgba(250, 250, 250, 0.8)",
            width: "50%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4rem",
              marginBottom: "3rem",
              borderBottom: "1px solid #d4d4d4",
              padding: "1rem 2rem",
            }}
          >
            <img
              src={logoSrc}
              alt="Seek Returns 标志"
              style={{ width: "200px" }}
            />
            <ul
              style={{
                display: "flex",
                gap: "2rem",
                color: "#525252",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              <li>百科</li>
              <li>工具</li>
              <li>博客</li>
            </ul>
          </div>

          <div style={{ display: "flex", gap: "5rem", padding: "1rem 2rem" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                width: "50%",
              }}
            >
              <div
                style={{
                  color: "#171717",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                }}
              >
                目录
              </div>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  paddingLeft: "1rem",
                  color: "#525252",
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: "1.4em",
                }}
              >
                {tableOfContents.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {item.label}
                    {item.subHeadingsData &&
                      item.subHeadingsData.length > 0 && (
                        <ul
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            paddingLeft: "1rem",
                            fontWeight: 400,
                          }}
                        >
                          {item.subHeadingsData.map((subItem) => (
                            <li key={subItem.id}>{subItem.label}</li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "1.3rem",
                  color: "#737373",
                  fontSize: "1rem",
                }}
              >
                <IoHome />
                {breadcrumbList.map((item, index) => (
                  <div
                    key={item.url}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <LuChevronRight />
                    <span
                      style={{
                        color:
                          index === breadcrumbList.length - 1
                            ? "#525252"
                            : "#737373",
                        fontWeight:
                          index === breadcrumbList.length - 1 ? 500 : 400,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>

              <h1
                style={{
                  margin: 0,
                  marginBottom: "1.3rem",
                  color: "#171717",
                  fontWeight: 600,
                  fontSize: "2rem",
                  lineHeight: "1.3em",
                }}
              >
                {title}
              </h1>

              <div
                style={{
                  marginBottom: "1.3rem",
                  color: "#737373",
                  fontSize: "1rem",
                }}
              >
                {`更新于${modifiedDate.toLocaleDateString("zh", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}`}
              </div>

              <p
                style={{
                  margin: 0,
                  color: "#525252",
                  fontSize: "1.125rem",
                  lineHeight: "1.5em",
                }}
              >
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans Simplified Chinese",
          data: notoSansScRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Noto Sans Simplified Chinese",
          data: notoSansScMedium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Noto Sans Simplified Chinese",
          data: notoSansScSemiBold,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
