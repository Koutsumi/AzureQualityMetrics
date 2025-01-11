import { Select } from "antd";

interface SprintSelectProps {
  sprints: { id: string; name: string }[];
  onChange: (value: string) => void;
}

const SprintSelect: React.FC<SprintSelectProps> = ({ sprints, onChange }) => (
  <Select
    placeholder="Select Sprint"
    options={sprints.map((sprint) => ({
      label: sprint.name,
      value: sprint.id,
    }))}
    onChange={onChange}
    className="w-40"
  />
);

export default SprintSelect;
