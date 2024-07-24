import React from "react";

interface CommentDeleteButtonProps {
  commentId: string;
  onDelete: (id: string) => void;
}

const CommentDeleteButton: React.FC<CommentDeleteButtonProps> = ({
  commentId,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete(commentId);
  };

  return (
    <button
      onClick={handleDelete}
      className="py-2 px-4 rounded-lg bg-red-0 text-slate-100"
    >
      Delete
    </button>
  );
};

export default CommentDeleteButton;
