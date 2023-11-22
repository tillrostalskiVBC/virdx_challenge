import { Rating, RatingCreate, RatingType } from "@/app/types";
import { computeAverageRating } from "@/app/utils/applicantUtils";
import React, { Fragment, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import StarRating from "./StarRating";
import useMe from "@/app/hooks/useMe";
import { Tooltip } from "react-tooltip";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  applicantId: number;
  ratings: Rating[];
  myRatings?: Rating[];
  onRatingsSubmit: (ratings: RatingCreate[]) => void;
}

export const ApplicantRatings = (props: Props) => {
  const { ratings, myRatings: myRatingsIn, applicantId } = props;
  const { me, isLoading: meIsLoading, error: meError } = useMe();

  const [editRating, setEditRating] = useState(false);
  const [myRatings, setMyRatings] = useState<RatingCreate[]>(myRatingsIn || []);

  const handleSubmit = async () => {
    const ratingsToSubmit = myRatings?.map((rating) => ({
      ...rating,
      applicant_id: applicantId,
    }));
    if (ratingsToSubmit) {
      await props.onRatingsSubmit(ratingsToSubmit);
      setEditRating(false);
    }
  };

  if (!me || meIsLoading) return null;

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <label className="font-semibold">Ratings </label>
        <button>
          {editRating ? (
            <div className="flex">
              <AiOutlineClose
                data-tooltip-id="cancel-ratings-tooltip"
                data-tooltip-content="Cancel ratings"
                size={20}
                className="text-cancel-button-color transition hover:text-hover-cancel-button-color"
                onClick={() => {
                  setEditRating(false);
                  setMyRatings(myRatingsIn || []);
                }}
              />
              <FaCheck
                data-tooltip-id="submit-ratings-tooltip"
                data-tooltip-content="Submit ratings"
                size={20}
                className="text-confirm-button-color transition hover:text-hover-confirm-button-color"
                onClick={() => {
                  setEditRating(false);
                  handleSubmit();
                }}
              />
            </div>
          ) : (
            <FaEdit
              size={20}
              className="text-primary-color transition hover:text-secondary-color"
              onClick={() => setEditRating(true)}
              data-tooltip-id="edit-ratings-tooltip"
              data-tooltip-content="Edit ratings"
            />
          )}
          <Tooltip id="submit-ratings-tooltip" />
          <Tooltip id="cancel-ratings-tooltip" />
          <Tooltip id="edit-ratings-tooltip" />
        </button>
      </div>
      <div className="flex flex-col w-full justify-center">
        {Object.keys(RatingType).map((ratingType) => (
          <div className="flex items-center justify-between" key={ratingType}>
            <span>{ratingType}</span>
            <div className="flex flex-row items-center">
              <StarRating
                disabled={!editRating}
                totalStars={5}
                rating={
                  (editRating
                    ? myRatings?.find((rating) => rating.type === ratingType)
                        ?.score
                    : computeAverageRating(ratings, ratingType)) || 0
                }
                onRating={(number) => {
                  const newRating: RatingCreate = {
                    applicant_id: applicantId,
                    user_id: me.id,
                    type: ratingType as RatingType,
                    score: number,
                  };
                  setMyRatings((prev) => {
                    const newRatings = prev.filter(
                      (rating) => rating.type !== ratingType
                    );
                    return [...newRatings, newRating];
                  });
                }}
                customClassName="text-lg"
              />
              <span className="text-gray-400 w-8 text-end pt-1">
                (
                {ratings.filter((rating) => rating.type === ratingType)?.length}
                )
              </span>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
