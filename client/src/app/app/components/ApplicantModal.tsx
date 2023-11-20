import React from "react";
import ModalWrapper from "./ModalWrapper";
import { Applicant } from "../../hooks/useApplicants";
import StarRating from "./StarRating";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  applicant: Applicant;
}

const ApplicantModal: React.FC<Props> = ({ isOpen, closeModal, applicant }) => {
  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col p-4 text-gray-800 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{applicant.github_name}</h2>
          <span className="text-gray-500 text-sm">{applicant.full_name}</span>
        </div>
        <div className="flex mb-2 w-full justify-between border-2 rounded p-2">
          <span className="font-semibold">Model Accuracy: </span>
          <span className="text-lg">{applicant.accuracy + "%"}</span>
        </div>
        <div className="flex mb-2 w-full justify-between border-2 rounded p-2">
          <span className="font-semibold">Repository Link: </span>
          <a
            className="text-blue-500 hover:underline"
            href={applicant.repo_link}
            target="_blank"
          >
            View Repository
          </a>
        </div>
        <div className="mb-2 w-full justify-between border-2 rounded p-2">
          <label className="font-semibold">Comment: </label>
          <p>
            {applicant.feedback
              ? applicant.comment
              : "No feedback comment provided"}
          </p>
        </div>
        <div className="mb-2 w-full justify-between border-2 rounded p-2">
          <label className="font-semibold">Feedback: </label>
          <p>
            {applicant.feedback
              ? applicant.feedback
              : "No feedback provided provided"}
          </p>
        </div>
        <div className="flex w-full justify-center">
          <StarRating
            totalStars={5}
            onRating={() => {}}
            customClassName="text-2xl"
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ApplicantModal;
