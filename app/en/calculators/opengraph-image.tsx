import { generateOpenGraphImage } from "@/app/en/lib/generateOpenGraphImage";

type OpenGraphImageParams = { id: string };

export async function generateImageMetadata() {
  return [
    {
      id: "normal",
      alt: "Calculator Index",
      size: { width: 1200, height: 630 },
      contentType: "image/png",
    },
  ];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function OpenGraphImage({ id }: OpenGraphImageParams) {
  return generateOpenGraphImage("Calculator Index");
}

export default OpenGraphImage;
