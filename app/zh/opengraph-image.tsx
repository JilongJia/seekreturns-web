import { generateFeaturedImage } from "@/app/lib/zh/root/generateFeaturedImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Seek Returns";

async function OpenGraphImage() {
  return generateFeaturedImage({ text: "测试中文" });
}

export default OpenGraphImage;
