import React from "react";

const NewCallDrawdowns = ({ commitmentDrawdowns }) => {
  return (
    <table>
      <thead />
      <tbody>
        {commitmentDrawdowns.map(drawdown => (
          <tr
            data-test={`commitment-drawdown-${drawdown.commitmentId}`}
            key={drawdown.commitmentId}
          >
            <td>{drawdown.commitmentId}</td>
            <td>{drawdown.fundId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NewCallDrawdowns;
