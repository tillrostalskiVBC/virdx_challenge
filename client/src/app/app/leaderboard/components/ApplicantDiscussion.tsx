import useMe from "@/app/hooks/useMe";
import { Applicant, DiscussionComment } from "@/app/types";
import { formatDate, sortByDate } from "@/app/utils/dateUtils";
import React, { useState, FormEvent } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Props {
  applicant: Applicant;
  onCommentSubmit: (comment: string) => void; // Callback when a new comment is submitted
  handleDeleteComment: (commentId: number) => void;
}

const ApplicantDiscussion = (props: Props) => {
  const { applicant, onCommentSubmit, handleDeleteComment } = props;
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
    <div className="h-full flex-col">
      <form onSubmit={handleCommentSubmit} className="">
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
      <div className="h-72 w-full overflow-y-auto">
        <div className="pr-4 space-y-1">
          {applicant.discussion
            .sort((a, b) => sortByDate(a.created_at, b.created_at))
            .map((comment: DiscussionComment) => (
              <div
                key={comment.id}
                className="border-b border-gray-200 py-2 w-full"
              >
                <div className="bg-sky-50 rounded p-2">
                  <pre className="text-gray-700 font-sans">
                    {comment.content}
                  </pre>
                </div>
                <div className="flex flex-row text-xs items-center justify-between text-gray-300">
                  <span>{comment.user.full_name}</span>
                  <div className="flex items-center">
                    <span>{formatDate(comment.created_at)}</span>
                    {me?.id === comment.user.id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <FaRegTrashAlt size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDiscussion;
