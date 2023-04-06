import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import UseIssues from "../../hooks/UseIssues";
import Loading from "../../shared/components/Loading";
import { State } from "../interfaces/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setState] = useState<State>();

  const { query, page, nextPage, prevPage } = UseIssues({
    state,
    labels: selectedLabels,
  });

  const onChangeLabel = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {query.isLoading ? (
          <Loading />
        ) : (
          <IssueList
            issues={query.data || []}
            state={state}
            onStateChange={(state) => setState(state)}
          />
        )}
        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            disabled={query.isFetching}
            onClick={prevPage}
            className="btn btn-outline-primary"
          >
            Prev
          </button>
          <span className="">{!query.isFetching ? page : "LOADING..."}</span>
          <button
            disabled={query.isFetching}
            onClick={nextPage}
            className="btn btn-outline-primary"
          >
            Next
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabel={selectedLabels}
          onChange={(labelName: string) => onChangeLabel(labelName)}
        />
      </div>
    </div>
  );
};
