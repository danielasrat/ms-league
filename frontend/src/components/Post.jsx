import React, { useState } from 'react';
import { likePost, deletePost, addComment, updatePost } from '../api/forum';
import { getCurrentUserId } from '../api/auth';
import Comment from './Comment';
import CommentForm from './CommentForm';

const Post = ({ post, onUpdate }) => {
  const [showComments, setShowComments] = useState(false);
  const currentUserId = getCurrentUserId();
  const isAuthor = post.author._id === currentUserId;
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleLike = async () => {
    try {
      await likePost(post._id);
      onUpdate();
    } catch (err) {
      console.error('Like failed', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deletePost(post._id);
      onUpdate();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleAddComment = async (text) => {
    try {
      await addComment(post._id, { content: text });
      onUpdate();
    } catch (err) {
      console.error('Add comment failed', err);
    }
  };

  const handleUpdatePost = async () => {
    try {
      await updatePost(post._id, { content: editedContent });
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error('Update post failed', err);
    }
  };

  return (
    <div className="border rounded p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between">
        {editing ? (
          <div className="w-full flex flex-col gap-2">
            <textarea
              className="border p-2 rounded"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2">
              <button onClick={handleUpdatePost} className="text-green-600 hover:underline">Save</button>
              <button onClick={() => {
                setEditing(false);
                setEditedContent(post.content);
              }} className="text-gray-500 hover:underline">Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-800">{post.content}</p>
            {isAuthor && (
            <div className="flex gap-2 text-sm">
              <button onClick={() => setEditing(true)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>

              
            </div>
          )}
          </>
        )}
      </div>

      <div className="mt-2 flex items-center gap-4">
        <button onClick={handleLike} className="text-blue-500 hover:underline text-sm">
          👍 {post.likes.length}
        </button>
        <button onClick={() => setShowComments(!showComments)} className="text-sm text-gray-600 hover:underline">
          💬 {post.comments.length} Comments
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <CommentForm onSubmit={handleAddComment} />
          <div className="mt-2">
            {post.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onUpdate={onUpdate} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

