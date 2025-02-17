import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api/commentsApi";

import CommentForm from "./CommentForm";
import { useState } from "react";

export const Comment = ({
  comment,
  comments,
  currentUserId,
  activeComment,
  setActiveComment,
  addComment,
  deleteComment,
  updateComment,
  level = 0,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const canDelete = currentUserId === comment.userId && !timePassed;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const isReplying =
    activeComment?.type === "replying" && activeComment.id === comment.id;
  const isEditing =
    activeComment?.type === "editing" && activeComment.id === comment.id;

  const replies = comments.filter((c) => c.parentId === comment.id);

  return (
    <div className="comment">
      <div className="comment-image-container">{comment.username[0]}</div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>

        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => setActiveComment(null)}
          />
        )}

        <div className="comment-actions">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
          {replies.length > 0 && (
            <div
              className="comment-action"
              onClick={() => setShowReplies(!showReplies)}
            >
              {showReplies
                ? "Hide Replies"
                : `Show Replies (${replies.length})`}
            </div>
          )}
        </div>

        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment.id)}
          />
        )}

        {replies.length > 0 && showReplies && (
          <div className="replies ml-8">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                comments={comments}
                currentUserId={currentUserId}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
