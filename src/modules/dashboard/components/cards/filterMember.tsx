import { ITeamWithMember } from "../../interfaces/select.interfaces";
import { MemberCard } from "./membersCard";

type MembersListProps = {
  members: ITeamWithMember[];
  searchQuery: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FilterMember: React.FC<MembersListProps> = ({
  members,
  searchQuery,
  onChange,
}) => {
  const filteredMembers = members.filter(
    (member) =>
      member.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="col-span-4 mt-5">
      <input
        type="text"
        placeholder="Buscar por nome ou e-mail"
        className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={onChange}
      />

      {searchQuery && (
        <div className="col-span-4 border-2 border-gray-200 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
};
