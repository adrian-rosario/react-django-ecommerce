import React from "react";

function Rating({ rating, reviews /*, star_color */ }) {
  return (
    <div className='rating'>
      <div className='stars'>
        <span>
          <i
            className={
              // style={{ color: star_color }}
              rating >= 1
                ? "fas fa-star text-info"
                : rating >= 0.5
                ? "fas fa-star-half-alt"
                : "far fa star text-info"
            }
          ></i>
        </span>
        <span>
          <i
            // style={{ color: star_color }}
            className={
              rating >= 2
                ? "fas fa-star text-info"
                : rating >= 1.5
                ? "fas fa-star-half-alt"
                : "far fa star text-info"
            }
          ></i>
        </span>
        <span>
          <i
            // style={{ color: star_color }}
            className={
              rating >= 3
                ? "fas fa-star text-info"
                : rating >= 2.5
                ? "fas fa-star-half-alt"
                : "far fa star text-info"
            }
          ></i>
        </span>
        <span>
          <i
            // style={{ color: star_color }}
            className={
              rating >= 4
                ? "fas fa-star text-info"
                : rating >= 3.5
                ? "fas fa-star-half-alt"
                : "far fa star text-info"
            }
          ></i>
        </span>
        <span>
          <i
            // style={{ color: star_color }}
            className={
              rating >= 5
                ? "fas fa-star text-info"
                : rating >= 4.5
                ? "fas fa-star-half-alt text-info"
                : "far fa star text-info"
            }
          ></i>
        </span>
      </div>

      {rating === 0 && <small>No ratings yet.</small>}
      {rating > "0" && (
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
