"use client";
import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export default function ProductImages({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      <Image
        src={images[current]}
        alt="product image"
        width={1000}
        height={1000}
        className="min-h-[300px] object-cover object-center"
      />
      <div className="flex">
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              "border rounded-xl mr-2 cursor-pointer hover:border-blue-900 overflow-hidden",
              index === current && "border-blue-700"
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt="product image" width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
