import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../../AuctionForm";
import { getDetailedViewData } from "@/app/actions/auctionActions";

const Update = async ({ params }: { params: Promise<{ id: string }> }) => {
  // Await the `params` Promise to retrieve the `id`
  const resolvedParams = await params;
  const data = await getDetailedViewData(resolvedParams.id);

  return (
    <div className="mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update your auction"
        subtitle="Please update details of your car"
      ></Heading>
      <AuctionForm auction={data}></AuctionForm>
    </div>
  );
};

export default Update;
