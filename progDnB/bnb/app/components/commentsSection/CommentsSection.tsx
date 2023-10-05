import { IComment } from "@/app/types";
import React from "react";
import Avatar from "../avatar/Avatar";
import StarRatings from "react-star-ratings";
import dayjs from "dayjs";
import Heading from "../heading/Heading";

interface CommentSectionProps {
  data: IComment[];
}

const CommentsSection: React.FC<CommentSectionProps> = ({ data }) => {
  return (
    <>
      <hr />
      <div className="mt-6">
        <div className="flex items-center gap-1">
          <Heading title="Avaliações e comentários" subtitle="" />
          <span className="mt-[2px]">({data.length})</span>
        </div>
        {data.map((comment) => {
          return (
            <div key={comment.id} className="my-4">
              <div className="flex gap-2">
                <div>
                  <Avatar src={null ?? comment.user.image} />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p>{comment.user.name}</p>
                    <p className="font-light font-neutral-500  text-[.8rem]">
                      - {dayjs(comment.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="mt-[-.5rem]">
                    <StarRatings
                      rating={comment.stars}
                      starRatedColor="#F4D03F"
                      numberOfStars={comment.stars}
                      name="rating"
                      starDimension="13px"
                      starSpacing="0px"
                      starHoverColor="#F4D03F"
                      starEmptyColor="#D5D8DC"
                    />
                    <div className="border-b w-[20%]" />
                    {comment.comment && (
                      <div className="mt-2 font-light font-neutral-500 text-[.9rem]">
                        {comment.comment}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentsSection;
