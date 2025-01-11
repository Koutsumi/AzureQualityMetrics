import ProjectSelect from "@/components/Selects/ProjectSelect";
import SprintSelect from "@/components/Selects/SprintSelect";
import { ISelectInterface } from "@/modules/dashboard/interfaces/select.interfaces";
interface HeaderProps {
  projects: ISelectInterface[];
  sprints: { id: string; name: string }[];
  onProjectChange: (value: ISelectInterface[]) => void;
  onSprintChange: (value: string) => void;
  onClickProjectSelect: () => void;
}

const Header: React.FC<HeaderProps> = ({
  projects,
  sprints,
  onProjectChange,
  onSprintChange,
  onClickProjectSelect,
}) => (
  <div className="flex justify-between items-center py-4 px-6">
    <h1 className="text-4xl font-bold">Dashboard</h1>
    <div className="flex space-x-4">
      <ProjectSelect
        projects={projects}
        onChange={onProjectChange}
        onClick={onClickProjectSelect}
      />
      <SprintSelect sprints={sprints} onChange={onSprintChange} />
    </div>
  </div>
);

export default Header;
