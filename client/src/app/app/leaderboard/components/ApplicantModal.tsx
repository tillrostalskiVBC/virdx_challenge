import React, { useState } from "react";
import ModalWrapper from "../../components/ModalWrapper";
import StarRating from "./StarRating";
import { Applicant, DiscussionCommentCreate, RatingType } from "@/app/types";
import { computeAverageRating } from "@/app/utils/applicantUtils";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import ApplicantDiscussion from "./ApplicantDiscussion";
import { apiUrl } from "@/app/constants";
import { toastError } from "@/app/toasts";
import { fetcher } from "@/app/fetcher";
import useMe from "@/app/hooks/useMe";
import useApplicant from "@/app/hooks/useApplicant";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  applicantId: number;
}

const ApplicantModal = (props: Props) => {
  const { isOpen, closeModal, applicantId } = props;
  const [editRating, setEditRating] = useState(false);

  const {
    data: applicant,
    isLoading: applicantIsLoading,
    error: applicantError,
    mutate: mutateApplicant,
    deleteComment,
  } = useApplicant(applicantId);
  const { me, isLoading: meIsLoading, error: meError } = useMe();

  const handleDeleteComment = async (commentId: number) => {
    try {
      deleteComment(commentId);
    } catch (error) {
      console.error(error);
      toastError("Failed to delete comment");
    }
  };

  const onCommentSubmit = async (content: string) => {
    const newComment: DiscussionCommentCreate = {
      content: content,
      user_id: me!.id,
      applicant_id: applicantId,
    };

    try {
      const response = await fetcher(
        apiUrl + `/applicants/${applicantId}/comment`,
        {
          method: "POST",
          body: JSON.stringify(newComment),
        }
      );
      mutateApplicant();
    } catch (error) {
      console.error(error);
      toastError("Failed to submit comment");
    }
  };

  if (meIsLoading || applicantIsLoading || !applicant) return null;

  return (
    <ModalWrapper isOpen={isOpen} closeModal={closeModal} modalWidth="w-3/4">
      <div className="flex-1 flex-col p-4 text-gray-800 bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="flex h-12 flex-col items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{applicant.github_name}</h2>
          <span className="text-gray-500 text-sm">{applicant.full_name}</span>
        </div>
        {/* Body */}
        <div className="flex flex-1 flex-col md:flex-row gap-4 overflow-auto">
          {/* Left column content */}
          <div className="flex-1">
            <div className="flex mb-2 w-full justify-between border rounded p-2">
              <span className="font-semibold">Model Accuracy</span>
              <span className="text-xl font-bold text-complementary-primary-color">
                {applicant.accuracy + "%"}
              </span>
            </div>
            <div className="flex mb-2 w-full justify-between border rounded p-2">
              <span className="font-semibold">Repository Link</span>
              <a
                className="text-blue-500 hover:underline"
                href={applicant.repo_link}
                target="_blank"
              >
                View Repository
              </a>
            </div>
            <div className="mb-2 w-full justify-between border rounded p-2">
              <label className="font-semibold">Comment</label>
              <p>
                {applicant.feedback
                  ? applicant.comment
                  : "No feedback comment provided"}
              </p>
            </div>
            <div className="mb-2 w-full justify-between border rounded p-2">
              <label className="font-semibold">Feedback</label>
              <p>
                {applicant.feedback
                  ? applicant.feedback
                  : "No feedback provided provided"}
              </p>
            </div>
            <div className="mb-2 w-full justify-between border rounded p-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold">Ratings </label>
                <button>
                  {editRating ? (
                    <FaCheck
                      size={20}
                      className="text-confirm-button-color transition hover:text-hover-confirm-button-color"
                      onClick={() => setEditRating(false)}
                    />
                  ) : (
                    <FaEdit
                      size={20}
                      className="text-primary-color transition hover:text-secondary-color"
                      onClick={() => setEditRating(true)}
                    />
                  )}
                </button>
              </div>
              <div className="flex flex-col w-full justify-center">
                {Object.keys(RatingType).map((ratingType) => (
                  <div
                    className="flex items-center justify-between"
                    key={ratingType}
                  >
                    <span>{ratingType}</span>
                    <div className="flex flex-row items-center">
                      <StarRating
                        disabled={!editRating}
                        totalStars={5}
                        rating={
                          computeAverageRating(applicant, ratingType) || 0
                        }
                        onRating={() => {}}
                        customClassName="text-lg"
                      />
                      <span className="text-gray-400 w-8 text-end pt-1">
                        (
                        {
                          applicant.ratings.filter(
                            (rating) => rating.type === ratingType
                          )?.length
                        }
                        )
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right column content */}
          <div className="flex-1">
            <ApplicantDiscussion
              applicant={applicant}
              onCommentSubmit={onCommentSubmit}
              handleDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ApplicantModal;
