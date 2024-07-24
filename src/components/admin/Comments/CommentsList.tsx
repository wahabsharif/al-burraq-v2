"use client";

import React, { useEffect, useState } from "react";
import CommentDeleteButton from "@/components/admin/Comments/CommentDeleteButton";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Comment {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_API_URL}/api/comments/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments(comments.filter((comment) => comment._id !== id));
      setSuccessMessage("Comment deleted!");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const formatDateTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  return (
    <section>
      <div className="container mx-auto px-4 py-6">
        {successMessage && (
          <div className="mx-auto max-w-screen-lg text-center">
            <div className="bg-green-800 text-slate-50 py-3 px-1 text-2xl m-2 bg-black shadow-md rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 flex items-center justify-center">
              {successMessage}
            </div>
          </div>
        )}
        <div className="mx-4">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-darkBg border-gray-200 shadow-md rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      No comments available.
                    </td>
                  </tr>
                ) : (
                  comments.map((comment) => (
                    <tr key={comment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {comment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {comment.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {comment.phoneNumber}
                      </td>
                      <td className="px-6 py-4 max-w-xs">{comment.comment}</td>
                      <td>{formatDateTime(comment.createdAt)}</td>
                      <td>{formatDateTime(comment.updatedAt)}</td>
                      <td>
                        <CommentDeleteButton
                          commentId={comment._id}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentsList;
