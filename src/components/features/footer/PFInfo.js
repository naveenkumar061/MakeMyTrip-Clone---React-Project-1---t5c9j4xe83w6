function PFInfo({ item }) {
  const { title, content } = item;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-lg font-bold h-10">{title}</h1>
      <p className="text-xs">{content}</p>
    </div>
  );
}

export default PFInfo;
