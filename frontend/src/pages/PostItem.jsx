import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeletePost from './DeletePost';
import { faPencil} from '@fortawesome/free-solid-svg-icons';
import DefaultAvatar from "./default.jpg"
const PostItem = ({ postId, postTitle, postDescription, author, postDate, category, postThumbnail, icons }) => {

  return (
    <div className="post-card">
      <Link to={`/post/${postId}`} className='postLink'>
        <img src={`https://drive.google.com/thumbnail?id=${postThumbnail}&sz=w1000`} alt={postTitle} className="post-image" />
        <div className="post-details">
          <h1 className="post-title">{postTitle.length > 30 ? postTitle.substring(0, 30) + '...' : postTitle}</h1>
          <p className="post-content">
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postDescription) }}></div>
          </p>
          <div className='post-footer'>
            <Link to={`/posts/author/${author._id}`} className='postLink'>
              <div className='post-profile'>
              <img 
                className='post-avatar' 
                src={author.avatar ? `https://drive.google.com/thumbnail?id=${author.avatar}&sz=w1000` : DefaultAvatar}
                alt='avatar' 
              />

                <div>
                  <h6>By {author.username}</h6>
                  <p><TimeAgo createdAt={postDate} /></p>
                </div>
              </div>
            </Link>
            <div>
              <button className='btn'>
                <Link to={`/posts/categories/${category}`} className='postLink'>{category}</Link>
              </button>
            </div>
          </div>
          {icons.length !== 0 && (
            <div style={{display:"flex",justifyContent:"space-around"}}>
                <Link to={`/edit/${postId}`} className='post-link'><button className='btn'>Edit <FontAwesomeIcon icon={faPencil}/></button></Link>
                <DeletePost postId={postId}/>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}

export default PostItem;
