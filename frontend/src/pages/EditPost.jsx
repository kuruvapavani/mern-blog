import React, { useState, useRef, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import Input from "../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingAnimation from "../components/Loader";

const EditPost = () => {
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        const post = response.data;
        setTitle(post.title);
        setCategory(post.category || "Uncategorized");
        setDescription(post.description);
        setExistingThumbnail(post.thumbnail); // store Cloudinary URL
      } catch (err) {
        setError(
          <>
            <FontAwesomeIcon icon={faCircleExclamation} />{" "}
            {err.response?.data?.message || "An error occurred."}
          </>
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading || submitLoading) return <LoadingAnimation />;

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDescriptionChange = (value) => setDescription(value);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setExistingThumbnail(null);
  };

  const handleClearThumbnail = () => {
    setThumbnail(null);
    setExistingThumbnail(null);
  };

  const handleChooseFile = () => fileInputRef.current.click();

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header", "font", "size", "bold", "italic", "underline", "strike",
    "blockquote", "list", "bullet", "indent", "link", "image", "video",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      let thumbnailUrl = existingThumbnail;
      let thumbnailPublicId = null;

      if (thumbnail) {
        const formData = new FormData();
        formData.append("file", thumbnail);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );

        thumbnailUrl = cloudinaryRes.data.secure_url;
        thumbnailPublicId = cloudinaryRes.data.public_id;
      }

      const postData = {
        title,
        category,
        description,
        thumbnail: thumbnailUrl,
        thumbnailPublicId,
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) navigate("/");
    } catch (err) {
      setError(
        <>
          <FontAwesomeIcon icon={faCircleExclamation} />{" "}
          {err.response?.data?.message || "An error occurred."}
        </>
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="create-container">
        <form onSubmit={handleSubmit} className="form">
          <h3>Update Post</h3>
          <h6 className="error">{error}</h6>

          <Input
            type="text"
            label="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />

          <select className="form-select" name="category" value={category} onChange={handleCategoryChange}>
            <option value="Uncategorized">Uncategorized</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Art">Art</option>
            <option value="Investment">Investment</option>
            <option value="Food">Food</option>
            <option value="Weather">Weather</option>
            <option value="Education">Education</option>
          </select>

          <div className="file-upload">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleThumbnailChange}
              accept="image/png, image/jpeg, image/jpg"
            />
            <button onClick={handleChooseFile} className="btn" type="button">Choose Image</button>

            {(thumbnail || existingThumbnail) && (
              <div style={{ display: "flex", gap: "3px", justifyContent: "center", marginLeft: "5px" }}>
                <img
                  src={thumbnail ? URL.createObjectURL(thumbnail) : existingThumbnail}
                  alt="Thumbnail"
                  style={{ marginTop: "7px" }}
                />
                <button onClick={handleClearThumbnail} className="remove-btn btn">
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </div>
            )}
          </div>

          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            modules={modules}
            formats={formats}
            style={{ color: "black" }}
          />

          <button className="btn" type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
