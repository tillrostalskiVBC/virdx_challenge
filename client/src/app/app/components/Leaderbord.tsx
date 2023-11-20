import React from "react";
import MainWrapper from "./MainWrapper";
import LeaderboardTable from "./LeaderboardTable";
import useApplicants from "../../hooks/useApplicants";
import { availableChallenges } from "../../constants";
import { computeRanks } from "../../utils/ApplicantUtils";

interface Props {}

const Leaderbord = (props: Props) => {
  const { data: rawData, isLoading, error } = useApplicants();

  if (isLoading || !rawData) {
    return <div>Loading...</div>;
  }

  const data = computeRanks(rawData);

  return (
    <MainWrapper title="Virdx Challenge Leaderboard">
      <select placeholder="Select Challenge" className="border p-2 rounded">
        {availableChallenges.map((challenge) => (
          <option value={challenge}>{challenge}</option>
        ))}
      </select>
      <LeaderboardTable applicants={data} />
    </MainWrapper>
  );
};

export default Leaderbord;
