import React from "react";
import MainWrapper from "./MainWrapper";
import LeaderboardTable from "./LeaderboardTable";
import useApplicants from "../hooks/useApplicants";

interface Props { }

const Leaderbord = (props: Props) => {
  const { data, isLoading, error } = useApplicants()

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  return (
    <MainWrapper title="Virdx Challenge Leaderboard">
      <LeaderboardTable applicants={data} />
    </MainWrapper>
  );
};

export default Leaderbord;
