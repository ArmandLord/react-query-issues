import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { Issue, State } from "../issues/interfaces/issue";
import { useState, useEffect } from "react";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  page = 1,
  state,
}: Props): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) {
    params.append("state", state);
  }
  if (labels.length > 0) {
    params.append("labels", labels.join(","));
  }

  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};
const UseIssues = ({ state, labels }: Props) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const query = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ labels, state, page })
  );
  const nextPage = () => {
    if (query.data?.length === 0) return;
    setPage(page + 1);
  };
  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  return { query, page, nextPage, prevPage };
};

export default UseIssues;
