import React from "react";
import ModalWrapper from "../../components/ModalWrapper";
import { DiscussionCommentCreate, RatingCreate } from "@/app/types";
import ApplicantDiscussion from "./ApplicantDiscussion";
import { apiUrl } from "@/app/constants";
import { toastError, toastSuccess } from "@/app/toasts";
import { fetcher } from "@/app/fetcher";
import useMe from "@/app/hooks/useMe";
import useApplicant from "@/app/hooks/useApplicant";
import { ApplicantRatings } from "./ApplicantRatings";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  applicantId: number;
}

const ApplicantModal = (props: Props) => {
  const { isOpen, closeModal, applicantId } = props;

  const {
    data: applicant,
    isLoading: applicantIsLoading,
    error: applicantError,
    mutate: mutateApplicant,
    deleteComment,
  } = useApplicant(applicantId);
  const { me, isLoading: meIsLoading, error: meError } = useMe();

  const myRatings = applicant?.ratings?.filter(
    (rating) => rating.user_id === me?.id
  );

  const handleDeleteComment = async (commentId: number) => {
    try {
      deleteComment(commentId);
    } catch (error) {
      console.error(error);
      toastError("Failed to delete comment");
    }
  };

  const onRatingsSubmit = async (ratings: RatingCreate[]) => {
    try {
      const response = await fetcher(
        apiUrl + `/applicants/${applicantId}/ratings`,
        {
          method: "POST",
          body: JSON.stringify(ratings),
        }
      );
      mutateApplicant();
      toastSuccess("Ratings submitted successfully");
    } catch (error) {
      console.error(error);
      toastError("Failed to submit ratings");
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
            <div className="mb-2 max-h-40 overflow-scroll w-full justify-between border rounded p-2">
              <label className="font-semibold">Comment</label>
              <p>
                {applicant.feedback
                  ? applicant.comment
                  : "No feedback comment provided"}
              </p>
            </div>
            <div className="mb-2 max-h-40 overflow-scroll w-full justify-between border rounded p-2">
              <label className="font-semibold">Feedback</label>
              <p>
                {applicant.feedback
                  ? applicant.feedback
                  : "No feedback provided provided"}
              </p>
            </div>
            <div className="mb-2 w-full justify-between border rounded p-2">
              <ApplicantRatings
                applicantId={applicant.id}
                ratings={applicant.ratings || []}
                myRatings={myRatings}
                onRatingsSubmit={onRatingsSubmit}
              />
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
