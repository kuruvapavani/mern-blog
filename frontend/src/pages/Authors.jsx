import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingAnimation from "./components/Loader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import DefaultAvatar from "./default.jpg";

const Authors = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [authors, setAuthors] = useState([]);
  const lastPostRef = useRef(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/authors`
        );
        setAuthors(response.data);
      } catch (err) {
        if (err.response?.data?.message) {
          setError(
            <>
              <FontAwesomeIcon icon={faCircleExclamation} />{" "}
              {err.response.data.message}
            </>
          );
        } else {
          setError(
            <>
              <FontAwesomeIcon icon={faCircleExclamation} /> An error occurred.
            </>
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    if (lastPostRef.current) {
      const navbarHeight = document.getElementById("navbar").offsetHeight;
      const postTopPosition = lastPostRef.current.offsetTop;
      const marginTop = "4rem";
      const scrollToPosition = postTopPosition - navbarHeight - marginTop;
      window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    }
  }, [authors]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="posts-grid">
      {error && <h6 className="error">{error}</h6>}

      {authors.map((author) => {
        return (
          <Link
            key={author._id}
            to={`/posts/author/${author._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="author-card">
              <div className="author-details">
                <img
                  src={author.avatar ? author.avatar : DefaultAvatar}
                  alt="author"
                />
                <h3>{author.username}</h3>
              </div>
              <h5>{author.posts} posts</h5>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Authors;
