import React, { useState } from 'react';
import { updateComment, deleteComment } from '../api/forum';
import { getCurrentUserId } from '../api/auth';

const Comment = ({ comment, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);
  const currentUserId = getCurrentUserId();
  const isAuthor = comment.author._id === currentUserId;

  const handleUpdate = async () => {
    try {
      await updateComment(comment._id, { content: text }); // ✅ change `text` to `content
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await deleteComment(comment._id);
      onUpdate();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="border-t py-2 pl-2 text-sm text-gray-700 flex justify-between items-center">
      {editing ? (
        <div className="flex gap-2 w-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
          {/* <button onClick={handleUpdate} className="text-green-500 hover:underline">Save</button> */}




          <div className="flex gap-2">
          <button onClick={handleUpdate} className="text-green-500 hover:underline">Save</button>
              <button onClick={() => {
                setEditing(false);
                setText(comment.content);
              }} className="text-gray-500 hover:underline">Cancel</button>
            </div>
        </div>
      ) : (
        <>
          <p>{comment.content}</p>
          {isAuthor && (
          <div className="flex gap-2 text-xs">
            <button onClick={() => setEditing(true)} className="text-blue-500 hover:underline">Edit</button>
            <button onClick={handleDelete} className="text-red-500 hover:underline">Delete</button>
          </div>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;
