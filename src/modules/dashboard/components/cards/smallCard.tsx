type SmalCardProps = {
  title: string;
  value?: number;
  isLoading?: boolean;
};

export const SmallCard = ({
  title,
  value,
  isLoading,
}: SmalCardProps) => {
  return (
    <section className="col-span-4 md:col-span-2 lg:col-span-1 border-2 border-gray-200 rounded-md p-5 flex items-center justify-center flex-col">
      <label
        className="text-lg font-semibold"
        datatype={`smal-card-${title}-${value}`}
      >
        {title}
      </label>
      {isLoading ? (
        <div className="mt-2 h-8 bg-gray-200 rounded skeleton"></div>
      ) : (
        <article className="text-5xl font-black">{value}</article>
      )}
    </section>
  );
};
