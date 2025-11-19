import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingAnimation from "../components/Loader";
import axios from "axios";
import TimeAgo from "../components/TimeAgo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";
import { UserContext } from "../context/userContext";
import DeletePost from "./DeletePost";
import DefaultAvatar from "../assets/default.jpg";

const PostDetail = () => {
  const { currentUser } = useContext(UserContext);
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState({});
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);
  const [authorLoading, setAuthorLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "Post not found"
            : "An error occurred while fetching the post"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (!post?.authorId) return;

    const fetchAuthor = async () => {
      setAuthorLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${post.authorId}`
        );
        setAuthor(response.data);
      } catch (err) {
        setError(
          <>
            <FontAwesomeIcon icon={faCircleExclamation} />
            {err.response?.data?.message || "An error occurred."}
          </>
        );
      } finally {
        setAuthorLoading(false);
      }
    };

    fetchAuthor();
  }, [post]);

  if (loading || authorLoading) {
    return <LoadingAnimation />;
  }

  if (!post) return null;

  return (
    <div className="post-detail">
      <div className="card" style={{ width: "40rem" }}>
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
              <img
                className="post-avatar"
                src={author.avatar || DefaultAvatar}
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
  );
};

export default PostDetail;
