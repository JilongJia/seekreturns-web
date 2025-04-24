import { generateOpenGraphImage } from "@/app/zh/lib/generateOpenGraphImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const alt = "Seek Returns";

async function OpenGraphImage() {
  return generateOpenGraphImage("测试中文");
}

export default OpenGraphImage;
