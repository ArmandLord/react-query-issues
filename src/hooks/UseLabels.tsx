import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../api/githubApi";
import { PropsLabels } from "../issues/interfaces/label";

const UseLabels = () => {
  const getLabels = async (): Promise<PropsLabels[]> => {
    const { data } = await githubApi.get<PropsLabels[]>("/labels?per_page=100");

    return data;
  };
  const query = useQuery(["labels query"], getLabels, {
    staleTime: 1000 * 60 * 60,
    // placeholderData nos sirve para que muestre algo mientras hace la promesa
    // NO MAS LOADERS 🥵
    placeholderData: [
      {
        id: 69105383,
        node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
        url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        name: "Browser: IE",
        color: "c7def8",
        default: false,
      },
      {
        id: 791921801,
        node_id: "MDU6TGFiZWw3OTE5MjE4MDE=",
        url: "https://api.github.com/repos/facebook/react/labels/%E2%9D%A4%EF%B8%8F",
        name: "❤️",
        color: "ffffff",
        default: false,
      },
    ],
  });
  return {
    query,
  };
};

export default UseLabels;
