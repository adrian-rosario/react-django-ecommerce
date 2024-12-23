import React from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Paginate({
  pages,
  page,
  keyword = "",
  isAdmin = false,
}) {
  const navigate = useNavigate();

  if (keyword) {
    keyword = keyword.split("?search=")[1].split("&")[0];
  }

  console.log("keyword string: ", keyword);

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((item) => (
          <Pagination.Item
            key={item + 1}
            active={item + 1 === page}
            onClick={() =>
              !isAdmin
                ? navigate(`/?search=${keyword}&page=${item + 1}`)
                : navigate(
                    `/admin-edit-products/?search=${keyword}&page=${item + 1}`
                  )
            }
          >
            {item + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}
