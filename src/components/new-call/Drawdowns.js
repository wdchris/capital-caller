import React from "react";
import { formatUkDate } from "../../utils/date";
import styled from "styled-components";

const Header = styled.th`
  max-width: 250px;
`;

const Drawdowns = ({ commitmentDrawdowns, funds }) => {
  const fundmap = funds.reduce((map, obj) => {
    map[obj.id] = obj.name;
    return map;
  }, {});

  return (
    <table>
      <thead>
        <tr>
          <Header>Commitment ID</Header>
          <Header>Fund ID</Header>
          <Header>Date</Header>
          <Header>Fund</Header>
          <Header>Commited Amounts</Header>
          <Header>
            Undrawn Capital Commitment before Current Drawdown Notice
          </Header>
          <Header>Total Drawdown Notice</Header>
          <Header>
            Undrawn Capital Commitment after Current Drawdown Notice
          </Header>
        </tr>
      </thead>
      <tbody>
        {commitmentDrawdowns.map(drawdown => (
          <tr
            data-test={`commitment-drawdown-${drawdown.commitmentId}`}
            key={drawdown.commitmentId}
          >
            <td
              data-test={`commitment-drawdown-${
                drawdown.commitmentId
              }-commitment-id`}
            >
              {drawdown.commitmentId}
            </td>
            <td
              data-test={`commitment-drawdown-${drawdown.commitmentId}-fund-id`}
            >
              {drawdown.fundId}
            </td>
            <td data-test={`commitment-drawdown-${drawdown.commitmentId}-date`}>
              {formatUkDate(drawdown.date)}
            </td>
            <td data-test={`commitment-drawdown-${drawdown.commitmentId}-fund`}>
              {fundmap[drawdown.fundId]}
            </td>
            <td
              data-test={`commitment-drawdown-${
                drawdown.commitmentId
              }-commited-amounts`}
            >
              {drawdown.commitedAmount.toLocaleString()}
            </td>
            <td
              data-test={`commitment-drawdown-${
                drawdown.commitmentId
              }-undrawn-commitment-before-notice`}
            >
              {drawdown.undrawnCommitmentBeforeNotice.toLocaleString()}
            </td>
            <td
              data-test={`commitment-drawdown-${
                drawdown.commitmentId
              }-drawdown-notice`}
            >
              {drawdown.drawdownNotice.toLocaleString()}
            </td>
            <td
              data-test={`commitment-drawdown-${
                drawdown.commitmentId
              }-undrawn-commitment-after-notice`}
            >
              {drawdown.undrawnCommitmentAfterNotice.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Drawdowns;
