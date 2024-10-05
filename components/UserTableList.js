"use client"; // Indicate this is a client component

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchUsers } from "@/app/utils/actions/fetchUsers";
import DynamicPagination from "./common/DynamicPagination";
import { Input } from "./ui/input";

export default function UserTableList({ refreshKey }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async (page, entriesPerPage, searchTerm = "") => {
      try {
        const response = await fetchUsers(page, entriesPerPage, searchTerm);
        setUsers(response.data.result);
        setTotalPages(response.data.meta.totalPage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage, entriesPerPage, searchTerm);
  }, [currentPage, entriesPerPage, searchTerm, refreshKey]); // Empty dependency array ensures this runs only once

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing entries per page
  }; // Empty dependency array ensures this runs only once

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
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.logo} alt={`${user.name} logo`} />
                  <AvatarFallback>
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Staff
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DynamicPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
