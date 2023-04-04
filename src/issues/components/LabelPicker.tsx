import UseLabels from "../../hooks/UseLabels";

export const LabelPicker = () => {
  const { query } = UseLabels();

  if (query.isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {query.data?.map((label) => (
        <span
          key={label.id}
          className="badge rounded-pill m-1 label-picker"
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
