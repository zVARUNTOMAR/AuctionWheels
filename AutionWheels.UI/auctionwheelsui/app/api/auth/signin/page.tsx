import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

type Props = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function Page({ searchParams }: Props) {
  // Await the `searchParams` Promise
  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams?.callbackUrl || "";

  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="Please click below to sign in"
      showLogin
      callbackUrl={callbackUrl}
    />
  );
}
