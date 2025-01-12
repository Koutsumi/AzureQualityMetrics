import React from "react";
import Image from "next/image";
import { ITeamWithMember } from "../../interfaces/select.interfaces";

type MemberCardProps = {
  member: ITeamWithMember;
  isLoading?: boolean;
};

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isLoading,
}) => {
  const url = new URL(member.generalData.imageUrl);

  const id = url.searchParams.get("id");
  const imageUrl = `https://dev.azure.com/bnpdesenvolvimento/_api/_common/identityImage?id=${id}`;

  return (
    <div className="border rounded-md p-4">
      {isLoading ? (
        <div className="mt-2 h-8 bg-gray-200 rounded skeleton"></div>
      ) : (
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => console.log(member)}
        >
          <Image
            src={imageUrl}
            alt={member.displayName}
            width={50}
            height={50}
            className="rounded-full h-[50px] w-[50px] object-cover object-center"
            unoptimized
          />
          <div>
            <h3 className="text-lg font-semibold">{member.displayName}</h3>
            <p className="text-sm text-gray-600">{member.email}</p>
          </div>
        </div>
      )}
    </div>
  );
};
