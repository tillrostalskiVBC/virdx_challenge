import useMe from "@/app/hooks/useMe";
import {
  Applicant,
  UserSession,
  DiscussionComment,
  DiscussionCommentCreate,
} from "@/app/types";
import { formatDate } from "@/app/utils/dateUtils";
import React, { useState, FormEvent } from "react";

interface Props {
  applicant: Applicant;
  onCommentSubmit: (comment: string) => void; // Callback when a new comment is submitted
}

const ApplicantDiscussion = (props: Props) => {
  const { applicant, onCommentSubmit } = props;
  const { me, isLoading, error } = useMe();
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();
    onCommentSubmit(newComment);
    setNewComment("");
  };

  if (isLoading) return null;

  return (
    <div className="">
      <form onSubmit={handleCommentSubmit} className="w-full">
        <textarea
          className="w-full p-2 border rounded focus:outline-none focus:border-secondary-color transition duration-200 resize-none"
          rows={2}
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCommentSubmit(e);
            }
          }}
        />
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className={`text-xs text-primary-color rounded ${
              !newComment.trim() ? "opacity-50 " : "transition hover:underline "
            }`}
            disabled={!newComment.trim()}
          >
            Post Comment
          </button>
        </div>
      </form>
      <div className="mt-2 w-full ">
        {applicant.discussion.map(
          (comment: DiscussionComment) => (
            (
              <div
                key={comment.id}
                className="border-b border-gray-200 py-4 w-full"
              >
                <p className="text-gray-700">{comment.content}</p>
                <small className="text-gray-400">
                  Commented on {formatDate(comment.created_at)}
                </small>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ApplicantDiscussion;
