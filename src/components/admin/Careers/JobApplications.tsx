"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

interface JobApplication {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  department: string;
  position: string;
  yearsOfExperience: number;
  address: string;
  currentJobStatus: string;
  communicationSkills: number;
  salesSkills: number;
  negotiationSkills: number;
  realEstateLicense: boolean;
  willingToWorkWeekends: boolean;
  createdAt: string;
  updatedAt: string;
}

const JobApplications: React.FC = () => {
  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/careers`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Phone Number</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Department</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">
                Years of Experience
              </th>
              <th className="border border-gray-300 p-2">Address</th>
              <th className="border border-gray-300 p-2">Current Job Status</th>
              <th className="border border-gray-300 p-2">
                Communication Skills
              </th>
              <th className="border border-gray-300 p-2">Sales Skills</th>
              <th className="border border-gray-300 p-2">Negotiation Skills</th>
              <th className="border border-gray-300 p-2">
                Real Estate License
              </th>
              <th className="border border-gray-300 p-2">
                Willing to Work Weekends
              </th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((application) => (
              <tr key={application._id}>
                <td className="border border-gray-300 p-2">
                  {application.firstName}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.lastName}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.phoneNumber}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.email}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.department}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.position}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.yearsOfExperience}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.address}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.currentJobStatus}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.communicationSkills}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.salesSkills}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.negotiationSkills}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.realEstateLicense ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2">
                  {application.willingToWorkWeekends ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(application.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(application.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobApplications;
