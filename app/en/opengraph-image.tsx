import { generateOpenGraphImage } from "@/app/en/lib/generateOpenGraphImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Seek Returns";

async function OpenGraphImage() {
  return generateOpenGraphImage(
    "Visualize Stock Performance with Custom Charts",
  );
}

export default OpenGraphImage;
