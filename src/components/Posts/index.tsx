import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userFullName, setUserFullName] = useState("Anonymous");

  // TODO 1: GET method
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/posts`);
        setPosts(res.data.posts);
      } catch (error) {
        alert("Error fetching list of posts");
        console.error(error);
      }
    };

    fetchAllPosts();
  }, [API_URL]);

  // TODO: Get user fullname
  useEffect(() => {
    const getAuthenticatedUserName = async () => {
      try {
        const token = localStorage.getItem("auth-token");

        if (!token) {
          throw new Error("User token not found");
        }

        const res = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserFullName(`${res.data.firstName} ${res.data.lastName}`);
      } catch {
        alert("Error to fetch user data");
      }
    };

    getAuthenticatedUserName();
  }, [API_URL]);

  // TODO 2: POST method
  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/posts/add`, {
        title,
        body,
        userId: 5,
      });

      setPosts([res.data, ...posts]);
      setTitle("");
      setBody("");
    } catch (error) {
      alert("Error adding a new post");
      console.error(error);
    }
  };

  // TODO 3: DELETE method
  const deletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const res = await axios.delete(`${API_URL}/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== res.data.id));
    } catch (error) {
      alert(`Error removing the post id ${id}`);
      console.error(error);
    }
  };

  // TODO 4: PUT method
  const editPost = async (id: number, title: string, body: string) => {
    if (!confirm("Are you sure you want to edit this post?")) {
      return;
    }

    try {
      const res = await axios.put(`${API_URL}/posts/${id}`, {
        id,
        title,
        body,
      });

      setPosts(
        posts.map((post) => (post.id === res.data.id ? res.data : post))
      );
    } catch (error) {
      alert(`Error editing the post id ${id}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-5">Hello, {userFullName}</h1>
      <form className="mb-10" onSubmit={addPost}>
        <input
          className="w-full mb-2 p-2 border rounded border-gray-200"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full mb-2 p-2 border rounded border-gray-200"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded pl-5 pr-5 w-full cursor-pointer"
        >
          Add Post
        </button>
      </form>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          onDelete={deletePost}
          onEdit={editPost}
        />
      ))}
    </div>
  );
};

export default Posts;

