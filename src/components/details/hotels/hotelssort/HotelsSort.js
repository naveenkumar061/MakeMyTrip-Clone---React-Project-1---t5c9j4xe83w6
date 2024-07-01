import { useHotelsMainContext } from "../../../context/Hotels/HotelsMainContext";

function HotelsSort() {
  const { sort, setSort } = useHotelsMainContext();

  return (
    <div className="sticky top-16 z-[2] mb-8 flex h-12 items-center justify-around border border-b border-cyan-400 bg-cyan-100 shadow-lg">
      <h1 className="font-semibold uppercase">Sort By:</h1>
      <h1
        className={`${sort === "popular" ? "border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500" : "font-semibold text-gray-600"} cursor-pointer`}
        onClick={() => setSort("popular")}
      >
        Popular
      </h1>
      <h1
        className={`${sort === "highest rating" ? "border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500" : "font-semibold text-gray-600"} cursor-pointer`}
        onClick={() => setSort("highest rating")}
      >
        User Rating{" "}
        <span
          className={`${sort === "highest rating" ? "text-center font-normal text-blue-500" : "font-normal text-zinc-400"}`}
        >
          (Highest First)
        </span>
      </h1>
      <h1
        className={`${sort === "highest price" ? "border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500" : "font-semibold text-gray-600"} cursor-pointer`}
        onClick={() => setSort("highest price")}
      >
        Price{" "}
        <span
          className={`${sort === "highest price" ? "text-center font-normal text-blue-500" : "font-normal text-zinc-400"}`}
        >
          (Highest First)
        </span>
      </h1>
      <h1
        className={`${sort === "lowest rating" ? "border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500" : "font-semibold text-gray-600"} cursor-pointer`}
        onClick={() => setSort("lowest rating")}
      >
        User Rating{" "}
        <span
          className={`${sort === "lowest rating" ? "text-center font-normal text-blue-500" : "font-normal text-zinc-400"}`}
        >
          (Lowest First)
        </span>
      </h1>
    </div>
  );
}

export default HotelsSort;
