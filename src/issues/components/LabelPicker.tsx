import { FC } from "react";
import UseLabels from "../../hooks/UseLabels";
import Loading from "../../shared/components/Loading";

interface Props {
  selectedLabel: string[];
  onChange: (labelName: string) => void;
}
export const LabelPicker: FC<Props> = ({ selectedLabel, onChange }) => {
  const { query } = UseLabels();

  if (query.isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {query.data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabel.includes(label.name) && "label-active"
          }`}
          onClick={() => onChange(label.name)}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
