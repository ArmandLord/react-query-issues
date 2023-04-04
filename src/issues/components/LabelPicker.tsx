import { useQuery } from "@tanstack/react-query";

import { githubApi } from "../../api/githubApi";
import { PropsLabels } from "../interfaces/label";

export const LabelPicker = () => {
  const getLabels = async (): Promise<PropsLabels[]> => {
    const { data } = await githubApi.get<PropsLabels[]>("/labels");

    return data;
  };
  const { data } = useQuery(["labels query"], getLabels, {
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <span
        className="badge rounded-pill m-1 label-picker"
        style={{ border: `1px solid #ffccd3`, color: "#ffccd3" }}
      >
        Primary
      </span>
    </div>
  );
};
