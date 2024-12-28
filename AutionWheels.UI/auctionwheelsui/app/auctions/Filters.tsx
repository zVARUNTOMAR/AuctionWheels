"use client";

import { Button } from "flowbite-react";
import React from "react";

const pageSizeButtons = [4, 8, 12];

type Props = {
  pageSize: number;
  setPageSize: (pageSize: number) => void;
};

const Filters = ({ pageSize, setPageSize }: Props) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page Size</span>
        <Button.Group>
          {pageSizeButtons.map((size, i) => (
            <Button
              key={i}
              onClick={() => setPageSize(size)}
              color={`${pageSize === size ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              {size}
            </Button>
          ))}
        </Button.Group>
      </div>
    </div>
  );
};

export default Filters;
