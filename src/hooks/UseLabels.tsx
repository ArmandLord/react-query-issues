import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { PropsLabels } from "../issues/interfaces/label";

const UseLabels = () => {
  const getLabels = async (): Promise<PropsLabels[]> => {
    const { data } = await githubApi.get<PropsLabels[]>("/labels");

    return data;
  };
  const query = useQuery(["labels query"], getLabels, {
    staleTime: 1000 * 60 * 60,
  });
  return {
    query,
  };
};

export default UseLabels;
