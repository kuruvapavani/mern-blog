import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingAnimation from "./components/Loader";
import axios from "axios";
import TimeAgo from "./TimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import { UserContext } from "./context/userContext";
import DeletePost from "./DeletePost";

const PostDetail = () => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Post not found"
            : "An error occurred while fetching the post"
        );
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post && post.authorId) {
      const fetchAuthor = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/${post.authorId}`
          );
          setAuthor(response.data);
          setIsLoading(false);
        } catch (err) {
          setError(
            <>
              <FontAwesomeIcon icon={faCircleExclamation} />
              {err.response?.data?.message || "An error occurred."}
            </>
          );
          setIsLoading(false);
        }
      };

      fetchAuthor();
    }
  }, [post]);

  if (!post) return null;

  return (
    <div>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="post-detail">
          <div className="card" style={{ width: "40rem" }}>
            {/* CLOUDINARY POST IMAGE */}
            <img className="card-img-top" src={post.thumbnail} alt="Post" />

            <div className="card-body">
              <h1 className="post-title" style={{ fontSize: "2rem" }}>
                {post.title}
              </h1>
              <p className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.description),
                  }}
                ></div>
              </p>
            </div>

            <div className="post-footer">
              <Link to={`/posts/author/${post.authorId}`} className="postLink">
                <div className="post-profile">
                  {/* CLOUDINARY AUTHOR AVATAR */}
                  <img
                    className="post-avatar"
                    src={author.avatar || "/default-avatar.jpg"}
                    alt="avatar"
                  />

                  <div>
                    <h6>By {author.username}</h6>
                    <p>
                      <TimeAgo createdAt={post.createdAt} />
                    </p>
                  </div>
                </div>
              </Link>

              <div>
                <button className="btn">
                  <Link
                    to={`/posts/categories/${post.category}`}
                    className="postLink"
                  >
                    {post.category}
                  </Link>
                </button>
              </div>
            </div>

            {currentUser?.id === post?.authorId && (
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link to={`/edit/${id}`} className="post-link">
                  <button className="btn">
                    Edit <FontAwesomeIcon icon={faPencil} />
                  </button>
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
