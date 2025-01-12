import { useEffect, useState } from "react";
import { SmallCard } from "../cards/smallCard";
import { ProjectsCard } from "../cards/projectsCard";
import { MemberCard } from "../cards/membersCard";
import { useProjectData } from "@/shared/hooks/useProjectData";
import { FilterMember } from "../cards/filterMember";
import {
  IProjectWithMembers,
  ITeamWithMember,
} from "../../interfaces/select.interfaces";

export const GeneralViewArea = () => {
  const { getProjectsData, selectedProjects, selectMembersFromAllTeams } =
    useProjectData();

  const [uniqueMembers, setUniqueMembers] = useState<ITeamWithMember[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const calculateUniqueMembers = (
    projects: IProjectWithMembers[]
  ): ITeamWithMember[] => {
    return Array.from(
      projects
        .flatMap((project) => project.teams.flatMap((team) => team.members))
        .reduce(
          (map, member) => map.set(member.id, member),
          new Map<string, ITeamWithMember>()
        )
        .values()
    );
  };

  const handleInformationBnp = async () => {
    await getProjectsData().then(() => {
      const members = calculateUniqueMembers(selectMembersFromAllTeams);
      setUniqueMembers(members);
    });
  };

  useEffect(() => {
    if (uniqueMembers.length !== 0) return;
    handleInformationBnp();
  }, [uniqueMembers]);

  return (
    <main className="w-full grid grid-cols-4 gap-5">
      <div className="col-span-4 grid grid-cols-4 gap-5">
        <SmallCard
          title="Total de projetos"
          value={selectedProjects.length}
          isLoading={!selectedProjects.length}
        />

        <SmallCard
          title="Colaboradores"
          value={uniqueMembers.length}
          isLoading={!uniqueMembers.length}
        />

        <div className="col-span-4 lg:col-span-2 border-2 border-gray-200 rounded-md p-5">
          <label className="text-lg font-black" datatype="project-card">
            Projetos
          </label>
          {selectedProjects.map((project) => (
            <ProjectsCard
              key={project.id}
              id={project.id}
              name={project.name}
              isLoading={!uniqueMembers.length}
            />
          ))}
        </div>
      </div>

      <FilterMember
        members={uniqueMembers}
        searchQuery={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />

      {!searchQuery && (
        <div className="col-span-4 border-2 border-gray-200 rounded-md p-5 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {uniqueMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isLoading={!uniqueMembers.length}
            />
          ))}
        </div>
      )}
    </main>
  );
};
