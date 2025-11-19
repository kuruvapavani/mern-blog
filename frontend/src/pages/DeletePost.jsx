import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const removePost = async () => {
    setDeleteLoading(true);

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        if (location.pathname === `/dashboard`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError(
        <>
          <FontAwesomeIcon icon={faCircleExclamation} /> Unable to delete the
          post.
        </>
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      {/* 🔥 OVERLAY LOADING ON TOP */}
      {deleteLoading && (
        <div className="overlay-loader">
          <LoadingAnimation />
        </div>
      )}

      {error && <p className="error">{error}</p>}
      <Link>
        <button
          className="btn"
          onClick={removePost}
          disabled={deleteLoading}
          style={{ opacity: deleteLoading ? 0.6 : 1 }}
        >
          Delete <FontAwesomeIcon icon={faTrashAlt} />{" "}
        </button>
      </Link>
    </>
  );
};

export default DeletePost;
