export const mockGetFunds = jest.fn();
export const mockGetCommitments = jest.fn();
export const mockGetInvestments = jest.fn();
export const mockGetCalls = jest.fn();
export const mockPostInvestments = jest.fn();
export const mockPostCall = jest.fn();

export default jest.fn().mockImplementation(() => {
  return {
    getFunds: mockGetFunds,
    getCommitments: mockGetCommitments,
    getInvestments: mockGetInvestments,
    getCalls: mockGetCalls,
    postInvestments: mockPostInvestments,
    postCall: mockPostCall
  };
});
