import Header from "./component";
import { useProjectData } from "@/shared/hooks/useProjectData";
import { useSprintData } from "@/shared/hooks/useSprintData";
import NavPills from "../NavPills.tsx";
import { GeneralViewArea } from "@/modules/dashboard/components/generalViewArea";
import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";

export const HeaderComponent: React.FC = () => {
  const {
    selectedProjects,
    selectProject,
    onClickedSelectAreaProject,
    setSelectProject,
    getProjectByIdData,
  } = useProjectData();
  const {
    selectedSprints,
    getSprintsData,
    onSprintChange,
    getLastSprint,
    selecteSprint,
  } = useSprintData();

  const onProjectChange = async (value: string) => {
    setSelectProject(value);

    await getProjectByIdData(value);

    await getLastSprint(value);
  };

  const tabs = [
    {
      key: "overview",
      label: "Visão Geral",
      content: <GeneralViewArea />,
      onClick: () => console.log("ok"),
    },
    {
      key: "project",
      label: "Projeto",
      content: <div>{/* Add TestResultsChart */}</div>,
      disabled: !selectProject,
    },
    {
      key: "tests",
      label: "Testes",
      content: <div>{/* Add TestResultsChart */}</div>,
      disabled: !selectProject,
    },
    {
      key: "bugs",
      label: "Bugs",
      content: <div>{/* Add BugTrendsChart and BugDetailsTable */}</div>,
      disabled: !selectProject,
    },
    {
      key: "inconsistencies",
      label: "Inconsistências",
      content: <div>{/* Add inconsistencies chart */}</div>,
      disabled: !selectProject,
    },
  ];

  return (
    <header>
      <Header
        projects={selectedProjects}
        sprints={selectedSprints}
        onProjectChange={onProjectChange}
        onSprintChange={onSprintChange}
        onClickProjectSelect={onClickedSelectAreaProject}
        onClickSprintSelect={() => getSprintsData(selectProject)}
        sprintValue={selecteSprint?.name as ISelectDataDTO | undefined}
      />
      <section className="px-6 py-4">
        <NavPills tabs={tabs} />
      </section>
    </header>
  );
};
