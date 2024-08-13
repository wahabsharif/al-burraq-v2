import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NEXT_PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface PropertyXmlDeleteButtonProps {
  propertyXmlId: string;
}

const PropertyXmlDeleteButton: React.FC<PropertyXmlDeleteButtonProps> = ({
  propertyXmlId,
}) => {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(
          `${NEXT_PUBLIC_API_URL}/api/propertyxml/${propertyXmlId}`
        );
        alert("Property deleted successfully!");
        router.refresh(); // Refresh the current page to update the list
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("An error occurred while deleting the property.");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default PropertyXmlDeleteButton;
