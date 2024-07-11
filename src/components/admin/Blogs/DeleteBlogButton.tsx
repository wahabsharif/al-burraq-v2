import axios from "axios";

interface DeleteBlogButtonProps {
  blogId: string;
  onDelete: () => void;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const DeleteBlogButton: React.FC<DeleteBlogButtonProps> = ({
  blogId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${NEXT_PUBLIC_API_URL}/api/blogs/${blogId}`);
      onDelete();
      // Handle success (e.g., display success message)
    } catch (error) {
      console.error("Error deleting blog", error);
      // Handle error
    }
  };

  return (
    <button
      className="py-2 px-4 rounded-lg bg-red-0 text-slate-100"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteBlogButton;
