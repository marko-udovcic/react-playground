import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api/commentsApi";

import CommentForm from "./CommentForm";

import { useEffect, useState } from "react";

import { Comment } from "./Comment";
const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments.filter(
    (comment) => comment.parentId === null
  );

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove this comment?")) {
      deleteCommentApi(commentId).then(() => {
        const deleteRecursive = (commentId) => {
          const updatedComments = backendComments.filter((comment) => {
            if (comment.id === commentId) return false;
            if (comment.parentId === commentId) {
              deleteRecursive(comment.id);
              return false;
            }
            return true;
          });
          setBackendComments(updatedComments);
        };

        deleteRecursive(commentId);
      });
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text, commentId).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <div className="flex justify-between items-center mb-4">
        <h3 className="comments-title">Comments</h3>
      </div>
      <div className="comments-container">
        <CommentForm submitLabel="Write" handleSubmit={addComment} />
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            comments={backendComments}
            currentUserId={currentUserId}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
