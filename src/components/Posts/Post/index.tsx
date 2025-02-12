import { useState } from "react";

interface PostProps {
  id: number;
  title: string;
  body: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, body: string) => void;
}

const Post: React.FC<PostProps> = ({ id, title, body, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  const handleSave = () => {
    onEdit(id, editTitle, editBody);
    setIsEditing(false);
  };

  return (
    <div className="p-4 border rounded mb-4 border-gray-200">
      {isEditing ? (
        <>
          <input
            className="w-full mb-2 p-2 border rounded border-gray-200"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded border-gray-200 min-h-30"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button
            onClick={() => setIsEditing(false)}
            className=" text-indigo-500 p-2 rounded mr-5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-indigo-500 p-2 rounded mr-2 text-white pl-5 pr-5"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mb-5">{body}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded mr-2 text-indigo-500 hover:bg-gray-100 cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded cursor-pointer text-red-700 hover:bg-gray-100"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Post;
