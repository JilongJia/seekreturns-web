import { generateFeaturedImage } from "@/app/lib/en/root/generateFeaturedImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Seek Returns. Strategically.";

function OpenGraphImage() {
  const featuredImage = generateFeaturedImage({
    title: "Seek Returns. Strategically.",
  });

  return featuredImage;
}

export default OpenGraphImage;
