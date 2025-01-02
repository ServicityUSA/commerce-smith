"use client";

import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex-center flex-col min-h-screen">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        width={48}
        height={48}
        priority
      />
      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
