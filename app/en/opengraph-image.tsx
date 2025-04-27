import { generateOpenGraphImage } from "@/app/lib/en/generateOpenGraphImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Seek Returns. Strategically.";

function OpenGraphImage() {
  return generateOpenGraphImage("Seek Returns. Strategically.");
}

export default OpenGraphImage;
