"use client";

import axios from "axios";
import FileSaver from "file-saver";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

const DEPARTMENTS = [
  "Sales and Marketing",
  "Administration",
  "Account and Finance",
  "Property Management",
  "Maintenance",
];

const JobApplicationsList: React.FC = () => {
  const [data, setData] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredData = selectedDepartment
    ? data.filter(
        (application) => application.department === selectedDepartment
      )
    : data;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching job applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectAll) {
      setSelectedRows(new Set(filteredData.map((app) => app._id)));
    } else {
      setSelectedRows(new Set());
    }
  }, [filteredData, selectAll]);

  // Handle row selection
  const handleRowSelect = (id: string, checked: boolean) => {
    setSelectedRows((prev) => {
      const newSelected = new Set(prev);
      if (checked) {
        newSelected.add(id);
      } else {
        newSelected.delete(id);
      }
      return newSelected;
    });
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
  };

  // Show error message and hide it after 3 seconds
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000); // Hide error message after 3 seconds
  };

  // ... (existing code)

  // Export to Excel
  const exportToExcel = () => {
    const selectedData = data
      .filter((application) => selectedRows.has(application._id))
      .map((application) => {
        return {
          "First Name": application.firstName,
          "Last Name": application.lastName,
          "Phone Number": application.phoneNumber,
          Email: application.email,
          Department: application.department,
          Position: application.position,
          "Years of Experience": application.yearsOfExperience,
          Address: application.address,
          "Current Job Status": application.currentJobStatus,
          "Communication Skills": application.communicationSkills,
          "Sales Skills": application.salesSkills,
          "Negotiation Skills": application.negotiationSkills,
          "Real Estate License": application.realEstateLicense ? "Yes" : "No",
          "Willing to Work Weekends": application.willingToWorkWeekends
            ? "Yes"
            : "No",
          "Applied At": new Date(application.createdAt).toLocaleDateString(),
        };
      });

    if (selectedData.length === 0) {
      showError("No rows selected for export.");
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);

    // Define custom headers
    const customHeaders = [
      "First Name",
      "Last Name",
      "Phone Number",
      "Email",
      "Department",
      "Position",
      "Years of Experience",
      "Address",
      "Current Job Status",
      "Communication Skills",
      "Sales Skills",
      "Negotiation Skills",
      "Real Estate License",
      "Willing to Work Weekends",
      "Applied At",
    ];

    // Add custom headers to the sheet
    XLSX.utils.sheet_add_aoa(ws, [customHeaders], { origin: "A1" });

    // Add data beneath headers
    XLSX.utils.sheet_add_json(ws, selectedData, {
      origin: "A2",
      skipHeader: true,
    });

    // Set column widths
    const wsCols = [
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 20 }, // Phone Number
      { wch: 30 }, // Email
      { wch: 20 }, // Department
      { wch: 20 }, // Position
      { wch: 10 }, // Years of Experience
      { wch: 30 }, // Address
      { wch: 20 }, // Current Job Status
      { wch: 15 }, // Communication Skills
      { wch: 10 }, // Sales Skills
      { wch: 15 }, // Negotiation Skills
      { wch: 15 }, // Real Estate License
      { wch: 25 }, // Willing to Work Weekends
      { wch: 15 }, // Applied At
    ];
    ws["!cols"] = wsCols;

    // Center-align all cells and make headers bold
    const range = XLSX.utils.decode_range(ws["!ref"]!);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          font: R === 0 ? { bold: true } : undefined,
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Job Applications");

    // Convert to blob and use file-saver to save
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      "Job Applications.xlsx"
    );
  };

  // ... (existing code)

  return (
    <section className="p-4">
      {/* Heading */}
      <div className="mx-auto max-w-screen-sm text-center my-5">
        <h2 className="text-xl text-darkGold font-extrabold bg-black shadow-md p-2 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 inline-block">
          Job Applications Received
        </h2>
      </div>

      {/* Container for Dropdown and Export Buttons */}
      <div className="my-4 max-w-screen-lg mx-auto flex items-center">
        {/* Filter Dropdown */}
        <div className="flex-grow">
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="department"
          >
            Sort by Department:
          </label>
          <select
            id="department"
            className="block w-full bg-white border border-gray-300 rounded-lg p-2"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Export Buttons */}
        <div className="ml-4 mb-0">
          <button
            className="bg-green-800 text-slate-200 p-2 rounded-lg"
            onClick={exportToExcel}
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="my-4 max-w-screen-lg mx-auto text-red-700 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Table or No Data Message */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-xl font-bold text-center text-red-700">
            No Application found for {selectedDepartment}.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-200 min-w-max">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
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
                <th className="border border-gray-300 p-2">
                  Current Job Status
                </th>
                <th className="border border-gray-300 p-2">
                  Communication Skills
                </th>
                <th className="border border-gray-300 p-2">Sales Skills</th>
                <th className="border border-gray-300 p-2">
                  Negotiation Skills
                </th>
                <th className="border border-gray-300 p-2">
                  Real Estate License
                </th>
                <th className="border border-gray-300 p-2">
                  Willing to Work Weekends
                </th>
                <th className="border border-gray-300 p-2">Applied At</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((application) => (
                <tr key={application._id}>
                  <td className="border border-gray-300 p-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(application._id)}
                      onChange={(e) =>
                        handleRowSelect(application._id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.firstName}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.lastName}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.phoneNumber}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.email}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.department}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.position}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.yearsOfExperience}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.address}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.currentJobStatus}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.communicationSkills}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.salesSkills}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.negotiationSkills}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.realEstateLicense ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {application.willingToWorkWeekends ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default JobApplicationsList;
