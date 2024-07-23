// components/CommentsList.tsx

"use client";

import React, { useEffect, useState } from "react";

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

  if (loading) {
    return <p>Loading comments...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <div className="container mx-auto px-4 py-6">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comments.length === 0 ? (
                  <p>No comments available.</p>
                ) : (
                  <>
                    {comments.map((comment) => (
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
                        <td className="px-6 py-4 max-w-xs">
                          {comment.comment}
                        </td>
                        <td>{new Date(comment.createdAt).toLocaleString()}</td>
                        <td>{new Date(comment.updatedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </>
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
