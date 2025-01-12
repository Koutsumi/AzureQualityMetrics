import Link from "next/link";
import React from "react";

type ProjectCardProps = {
  id: string;
  name?: string;
  isLoading?: boolean;
};

export const ProjectsCard = ({ id, name, isLoading }: ProjectCardProps) => {
  return (
    <article>
      {isLoading ? (
        <div className="mt-2 h-8 bg-gray-200 rounded skeleton"></div>
      ) : (
        <Link href={`/projeto//param?id=${id}`}>
          <label
            className="text-lg font-semibold cursor-pointer"
            datatype={`smal-card-${id}-${name}`}
          >
            {name}
          </label>
        </Link>
      )}
    </article>
  );
};
