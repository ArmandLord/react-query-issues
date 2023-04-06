import { useQuery } from "@tanstack/react-query";
import { Issue } from "../issues/interfaces/issue";
import { githubApi } from "../api/githubApi";

export const getIssueById = async (id: string): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${id}`);
  return data;
};
export const getIssueCommentsById = async (id: string): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>(`/issues/${id}/comments`);
  return data;
};

const UseIssueById = (id: string) => {
  const query = useQuery(["issue", id], () => getIssueById(id));
  const queryComments = useQuery(
    ["issue", id, "comments"],
    () => getIssueCommentsById(id),
    {
      // IMPORTANT! carga los comentarios solo si la query de issue se resolvio
      enabled: query.data !== undefined,
    }
  );

  return {
    query,
    queryComments,
  };
};

export default UseIssueById;
