import React from "react";
import { useParamsStore } from "../hooks/useParamStore";
import Heading from "./Heading";
import { Button } from "flowbite-react";

type Props = {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
};

const EmptyFilter = ({
  title = "No auctions found",
  subtitle = "Try again after some time",
  showReset,
}: Props) => {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {showReset && (
          <Button outline onClick={reset}>
            Remove filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyFilter;
