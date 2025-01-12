"use client";

import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import "react-datepicker/dist/react-datepicker.css";
import { createAuction, updateAuction } from "../actions/auctionActions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Auction } from "../types";

type Props = {
  auction?: Auction;
};

const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const {
    handleSubmit,
    setFocus,
    control,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: "onTouched" });

  console.log(pathName);

  useEffect(() => {
    if (auction) {
      const { make, model, color, mileage, year } = auction;
      reset({ make, model, color, mileage, year });
    }
    setFocus("make");
  }, [setFocus, reset, auction]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = "";

      if (pathName === "/auctions/create") {
        const res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          await updateAuction(data, auction.id);
          id = auction.id;
        }
      }
      const res = await createAuction(data);

      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
    } catch (error: any) {
      toast.error(error.status + " " + error.message);
    }
  };

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3 block">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Make
        </label>
        <Input
          label="Make"
          name="make"
          control={control}
          rules={{ required: "Make is required" }}
        />
      </div>
      <div className="mb-3 block">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Model
        </label>
        <Input
          label="Model"
          name="model"
          control={control}
          rules={{ required: "Model is required" }}
        />
      </div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        Color
      </label>
      <div className="mb-3 block">
        <Input
          label="Color"
          name="color"
          control={control}
          rules={{ required: "Color is required" }}
        />
      </div>
      {pathName === "/auctions/create" && (
        <>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />
        </>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Year
          </label>
          <Input
            label="Year"
            name="year"
            control={control}
            type="number"
            rules={{ required: "Year is required" }}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Mileage
          </label>
          <Input
            label="Mileage"
            name="mileage"
            control={control}
            type="number"
            rules={{ required: "Model is required" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {pathName === "/auctions/create" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Reserve Price
            </label>
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              control={control}
              type="number"
              rules={{ required: "Reserve price is required" }}
            />
          </div>
        )}

        {pathName === "/auctions/create" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Auction End Time
            </label>
            <DateInput
              label="Auction end date/time"
              dateFormat="dd MMMM yyyy h:mm a"
              name="auctionEnd"
              control={control}
              rules={{ required: "Date is required" }}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <Button color="dark">Cancel</Button>
        {
          <Button
            color="failure"
            isProcessing={isSubmitting}
            disabled={!isValid}
            type="submit"
          >
            Submit
          </Button>
        }
      </div>
    </form>
  );
};

export default AuctionForm;
