import React from "react";

function Rating({ rating, reviews, star_color }) {
  return (
    <div className='rating'>
      <div className='stars'>
        <span>
          <i
            style={{ color: star_color }}
            className={
              rating >= 1
                ? "fas fa-star"
                : rating >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa star"
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color: star_color }}
            className={
              rating >= 2
                ? "fas fa-star"
                : rating >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa star"
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color: star_color }}
            className={
              rating >= 3
                ? "fas fa-star"
                : rating >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa star"
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color: star_color }}
            className={
              rating >= 4
                ? "fas fa-star"
                : rating >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa star"
            }
          ></i>
        </span>

        <span>
          <i
            style={{ color: star_color }}
            className={
              rating >= 5
                ? "fas fa-star"
                : rating >= 4.5
                ? "fas fa-star-half-alt"
                : "far fa star"
            }
          ></i>
        </span>
      </div>

      {rating && (
        <div>
          <small>
            {rating} from {reviews}
          </small>
        </div>
      )}
    </div>
  );
}

export default Rating;
