import { useEffect, useState, useCallback } from "react";
// import Select from "react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import DynamicPagination from "./common/DynamicPagination";
// import { fetchCompanies } from "@/app/utils/actions/fetchCompanies";
// import { useSession } from "next-auth/react";
import EditUserProfile from "./EditUserProfile";
import { fetchDirectors } from "@/app/utils/actions/fetchDirectors";

export default function DirectorTableList({ refreshKey }) {
  // const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchData = useCallback(
    async (page, entriesPerPage, searchTerm = "") => {
      try {
        const response = await fetchDirectors(page, entriesPerPage, searchTerm);
        setUsers(response.data.result);
        setTotalPages(response.data.meta.totalPage);
        //const companyResponse = await fetchCompanies();
        //const companyOptions = companyResponse.data.result.map((company) => ({
        //   value: company._id,
        //   label: company.name,
        // }));
        // setCompanies(companyOptions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData(currentPage, entriesPerPage, searchTerm);
  }, [currentPage, entriesPerPage, searchTerm, refreshKey, fetchData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing entries per page
  };

  // const handleCompanyChange = async (selectedOption, userId) => {
  //   if (!selectedOption) return; // Handle case where selection is cleared
  //   const company = selectedOption.value; // Get the selected company's ID
  //   const updatedFields = { company }; // Create the payload

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json", // Ensure content type is set
  //           Authorization: `Bearer ${session?.accessToken}`, // Ensure token is available
  //         },
  //         body: JSON.stringify(updatedFields), // Convert payload to JSON string
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update user profile");
  //     } else {
  //       fetchData(currentPage, entriesPerPage, searchTerm);
  //     }

  //     // Optionally update local state and refetch data...
  //   } catch (err) {
  //     console.error("Error updating user profile:", err);
  //     // Handle error (e.g., set error state)
  //   }
  // };
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleUpdateUser = async (updatedUsers) => {
    try {
      const res = await updateUserProfile(selectedUser.id, updatedUsers);

      if (res.ok) {
        fetchData(currentPage, entriesPerPage, searchTerm);
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex gap-10 mb-6">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={entriesPerPage}
          onChange={handleEntriesPerPageChange}
          className="block w-[180px] p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-black focus:border-black transition duration-150 ease-in-out"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            {/* <TableHead>Company</TableHead>
            <TableHead>Assigned Company</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              {/* <TableCell>{user.company ? user.company.name : "N/A"}</TableCell> */}
              {/* <TableCell>
                <Select
                  options={companies}
                  value={null}
                  onChange={(selectedOption) =>
                    handleCompanyChange(selectedOption, user._id)
                  }
                  isClearable
                  placeholder="Select a company"
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </TableCell> */}
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditClick(user)}
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditUserProfile
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={selectedUser}
        onSubmit={handleUpdateUser}
      />

      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
