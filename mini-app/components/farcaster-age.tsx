"use client";

import { useContext, useEffect, useState } from "react";
import { MiniAppContext } from "./context/miniapp-provider";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

export default function FarcasterAge() {
  const { sdk, context, isInMiniApp } = useContext<MiniAppContext>(MiniAppContext);
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAge() {
      try {
        // Assume the SDK provides a method to get the current user profile
        const profile = await sdk?.getUserProfile?.();
        // The profile is expected to have an `age` field in years
        setAge(profile?.age ?? null);
      } catch {
        setAge(null);
      }
    }
    fetchAge();
  }, [sdk]);

  const shareText = `I am ${age ?? "unknown"} years old on Farcaster! ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Your Farcaster Age</h2>
      <p className="text-3xl font-bold">{age !== null ? `${age} years` : "Loading..."}</p>
      <Share text={shareText} />
    </div>
  );
}
