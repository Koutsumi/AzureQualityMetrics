import ProjectSelect from "@/components/Selects/ProjectSelect";
import SprintSelect from "@/components/Selects/SprintSelect";
import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";
interface HeaderProps {
  projects: ISelectDataDTO[];
  sprints: ISelectDataDTO[];
  onProjectChange: (value: string) => void;
  onSprintChange: (value: ISelectDataDTO) => void;
  onClickProjectSelect: () => void;
  onClickSprintSelect: () => void;
  sprintValue: ISelectDataDTO | undefined;
}

const Header: React.FC<HeaderProps> = ({
  projects,
  sprints,
  onProjectChange,
  onSprintChange,
  onClickProjectSelect,
  onClickSprintSelect,
  sprintValue,
}) => (
  <div className="flex justify-between items-center py-4 px-6">
    <h1 className="text-4xl font-bold">Dashboard</h1>
    <div className="flex space-x-4">
      <ProjectSelect
        projects={projects}
        onChange={onProjectChange}
        onClick={onClickProjectSelect}
      />
      <SprintSelect
        sprints={sprints}
        onChange={onSprintChange}
        onClick={onClickSprintSelect}
        value={sprintValue}
      />
    </div>
  </div>
);

export default Header;
