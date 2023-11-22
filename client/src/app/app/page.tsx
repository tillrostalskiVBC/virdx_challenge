"use client";
import React from "react";
import Leaderbord from "./leaderboard/components/Leaderbord";
import useMe from "../hooks/useMe";
import Spinner from "../components/Spinner";
import MainWrapper from "./components/MainWrapper";
import { availableChallenges } from "../constants";

const Home = () => {
  const { me, isLoading, error } = useMe();

  if (isLoading) return <Spinner />;

  return (
    <MainWrapper>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-secondary-color">
          Leaderboard
        </span>
        <select placeholder="Select Challenge" className="border p-2 rounded">
          {availableChallenges.map((challenge) => (
            <option value={challenge} key={challenge}>
              {challenge}
            </option>
          ))}
        </select>
      </div>
      <Leaderbord />
    </MainWrapper>
  );
};

export default Home;
