import React from "react";
//bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (e, number) => {
    e.preventDefault();
    paginate(number);
  };
  return (
    <div className="mt-5" style={{ position: "absolute", bottom: 0 }}>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a
                onClick={(e) => handleClick(e, number)}
                href=""
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
