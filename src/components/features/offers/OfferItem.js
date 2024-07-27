import React from 'react';

function OfferItem({ item }) {
  return (
    <div className="flex flex-col md:flex-row w-full rounded-md border p-4 shadow-md justify-center items-center md:w-[45%] md:justify-normal md:items-start">
      <img
        src={item.newHeroUrl}
        alt={item.lob}
        className="h-32 w-40 rounded-md"
      />
      <div className="flex h-full w-full flex-col px-4 md:h-auto">
        <div className="flex justify-between">
          <p>{item.lobDisplayText}</p>
          <p>{item.tncCtaText}</p>
        </div>
        <p className="font-bold">{item.pTl}</p>
        <div className="my-4 w-[10%] border border-orange-500"></div>
        <p className="w-full pb-4 text-sm capitalize">{item.pTx}</p>
      </div>
    </div>
  );
}

export default OfferItem;
