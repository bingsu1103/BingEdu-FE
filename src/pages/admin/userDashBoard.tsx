import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import userService from "@/services/user.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExportOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UserDashBoard = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const listUserRes = await userService.getUserWithPaginateAPI(
        page,
        limit,
        search
      );
      setUserData(listUserRes.data?.users || []);
      setTotal((t) => listUserRes.data?.total || t);
    };
    fetchUserData();
  }, [page, limit, search]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {/* Search + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <Input
          placeholder="Find user by name"
          className="w-full sm:w-1/2"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer flex items-center gap-1"
                >
                  <UserAddOutlined />
                  <span>Create User</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add User</DialogTitle>
                  <DialogDescription>
                    Fill all fields below to add an user
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="User name" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" placeholder="Phone number" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>

          <Button className="cursor-pointer flex items-center gap-1">
            <ExportOutlined />
            <span>Export to CSV</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow className="leading-12" key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>
              <TableCell className="text-center">{user.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="pt-10">
          <PaginationContent className="justify-center">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default UserDashBoard;
