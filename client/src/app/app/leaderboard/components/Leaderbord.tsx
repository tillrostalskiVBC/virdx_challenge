import React from "react";
import MainWrapper from "../../components/MainWrapper";
import LeaderboardTable from "./LeaderboardTable";
import useApplicants from "../../../hooks/useApplicants";
import { availableChallenges } from "../../../constants";
import { computeRanks } from "../../../utils/applicantUtils";

interface Props {}

const Leaderbord = (props: Props) => {
  const { data: rawData, isLoading, error } = useApplicants();

  if (isLoading || !rawData) {
    return <div>Loading...</div>;
  }

  const data = computeRanks(rawData);

  return (
    <div className="w-full h-full">
      <LeaderboardTable applicants={data} />
    </div>
  );
};

export default Leaderbord;
