// React and other third-party libraries
import React from "react";

function OfferItem({ item }) {
  return (
    <div className="max-800:w-full max-800:block flex w-[45%] rounded-md border p-4 shadow-md">
      {/* Image for the offer item */}
      <img
        src={item.newHeroUrl}
        alt={item.lob}
        className="h-32 w-40 rounded-md"
      />
      <div className="max-800:h-auto flex h-full w-full flex-col px-4">
        {/* Top row containing LOB display text and CTA text */}
        <div className="flex justify-between">
          <p>{item.lobDisplayText}</p>
          <p>{item.tncCtaText}</p>
        </div>
        {/* Main title of the offer item */}
        <p className="font-bold">{item.pTl}</p>
        {/* Divider */}
        <div className="my-4 w-[10%] border border-orange-500"></div>
        {/* Additional description or text */}
        <p className="w-full pb-4 text-sm capitalize">{item.pTx}</p>
      </div>
    </div>
  );
}

export default OfferItem;
