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

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteBlogButton;
