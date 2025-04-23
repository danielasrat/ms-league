// import React, { useEffect, useState } from 'react';
// import { getPosts } from '../api/forum';
// import Post from '../components/Post';
// import PostForm from '../components/PostForm';

// const Forum = () => {
//   const [posts, setPosts] = useState([]);

//   const fetchPosts = async () => {
//     try {
//       const res = await getPosts();
//       setPosts(res.data);
//     } catch (err) {
//       console.error('Failed to fetch posts', err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Forum</h1>
//       <PostForm onPostCreated={fetchPosts} />
//       {posts.map((post) => (
//         <Post key={post._id} post={post} onUpdate={fetchPosts} />
//       ))}
//     </div>
//   );
// };

// export default Forum;




















import React, { useEffect, useState } from 'react';
import { getPosts, createPost, likePost, deletePost, addComment, updatePost, updateComment, deleteComment } from '../api/forum';
import { getCurrentUserId } from '../api/auth';
import Topbar from './user/Topbar';
import Sidebar from './user/Sidebar';

// Updated Comment component with new UI
const Comment = ({ comment, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);
  const currentUserId = getCurrentUserId();
  const isAuthor = comment.author._id === currentUserId;

  const handleUpdate = async () => {
    try {
      await updateComment(comment._id, { content: text });
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
    <div key={comment._id} className="bg-gray-50 p-3 rounded-md border mb-2">
      <p className="font-medium text-gray-700">{comment.author.name}:</p>
      {editing ? (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded p-2 w-full"
            rows="3"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate} 
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => {
                setEditing(false);
                setText(comment.content);
              }} 
              className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800">{comment.content}</p>
          {isAuthor && (
            <div className="flex gap-2 mt-2 text-sm">
              <button 
                onClick={() => setEditing(true)} 
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Updated CommentForm component with new UI
const CommentForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        placeholder="Write a reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border p-3 rounded-md mb-2"
        rows="3"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        Post Reply
      </button>
    </form>
  );
};

// Updated Post component with new UI
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
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border border-gray-100">
      <div className="mb-3">
        <p className="text-sm text-gray-600">Posted by {post.author.name}</p>
      </div>
      
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="border p-3 rounded-md w-full"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="4"
          />
          <div className="flex gap-2">
            <button 
              onClick={handleUpdatePost} 
              className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
            >
              Save
            </button>
            <button 
              onClick={() => {
                setEditing(false);
                setEditedContent(post.content);
              }} 
              className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-800 mb-3">{post.content}</p>
          {isAuthor && (
            <div className="flex gap-2 text-sm mb-3">
              <button 
                onClick={() => setEditing(true)} 
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <button 
          onClick={handleLike} 
          className="flex items-center gap-1 hover:text-blue-500"
        >
          ❤️ {post.likes.length}
        </button>
        <button 
          onClick={() => setShowComments(!showComments)} 
          className="flex items-center gap-1 hover:text-blue-500"
        >
          💬 {post.comments.length} Comments
        </button>
      </div>

      {showComments && (
        <div className="mt-4">
          <div className="space-y-2 mb-4">
            {post.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} onUpdate={onUpdate} />
            ))}
          </div>
          <CommentForm onSubmit={handleAddComment} />
        </div>
      )}
    </div>
  );
};

// Updated PostForm component with new UI
const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ content });
      setContent('');
      onPostCreated();
    } catch (err) {
      console.error('Failed to create post', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-100">
      <h2 className="text-lg font-semibold mb-3">Create a new post</h2>
      <textarea
        className="w-full p-3 border rounded-md mb-3"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="4"
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
      >
        Post
      </button>
    </form>
  );
};

// Main Forum component with Topbar and Sidebar
const Forum = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Forum Discussions</h1>
            <PostForm onPostCreated={fetchPosts} />
            <div className="space-y-4">
              {posts.map((post) => (
                <Post key={post._id} post={post} onUpdate={fetchPosts} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Forum;