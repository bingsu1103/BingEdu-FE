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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import userService from "@/services/user.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExportOutlined,
  UserAddOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import CreateUser from "@/components/manager/createUser";
import EditUser from "@/components/manager/editUser";
import { FaCrown } from "react-icons/fa";
import { message, Popconfirm } from "antd";

const UserDashBoard: React.FC = () => {
  const [userData, setUserData] = useState<IUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);
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
  const handleDeleteUser = async (id: string) => {
    try {
      const result = await userService.deleteUserAPI(id);
      if (!result.status) {
        message.error(result.message);
        return;
      }
      message.success("Delete user successfully!");
    } catch (error) {
      console.log(error);
      message.error("Failed to delete user!");
    }
  };

  return (
    <>
      {/* Search + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 text-foreground">
        <Input
          placeholder="Find user by name"
          className="w-full sm:w-1/2"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 max-sm:flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer flex items-center gap-1">
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
              <CreateUser />
            </DialogContent>
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
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-foreground">
          {userData.map((user) => (
            <TableRow className="leading-12 text-foreground" key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>

              <TableCell className="text-center">
                {user.role === "admin" && (
                  <Badge
                    className="bg-blue-500 text-white dark:bg-blue-600"
                    variant="secondary"
                  >
                    ADMIN
                  </Badge>
                )}
                {user.role === "user" && (
                  <Badge variant="destructive"> USER</Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                {user.type === "normal" && (
                  <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                    NORMAL
                  </Badge>
                )}
                {user.type === "vip" && (
                  <Badge className="bg-[#FEB602]">
                    <FaCrown></FaCrown>VIP
                  </Badge>
                )}
              </TableCell>
              <TableCell className="flex gap-2 justify-center items-center">
                <Sheet>
                  <Tooltip>
                    <TooltipContent side="top">Edit this user</TooltipContent>
                    <SheetTrigger asChild>
                      <TooltipTrigger>
                        <Button className="p-2 bg-transparent hover:bg-[#333] text-[#165DFB] cursor-pointer">
                          <EditOutlined />
                        </Button>
                      </TooltipTrigger>
                    </SheetTrigger>
                  </Tooltip>
                  <SheetContent className="z-1001">
                    <EditUser user={user} />
                  </SheetContent>
                </Sheet>
                <Tooltip>
                  <TooltipTrigger>
                    <Popconfirm
                      title="Delete User"
                      onConfirm={() => handleDeleteUser(user._id)}
                      description="Are you sure to delete this user?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="p-2 bg-transparent hover:bg-[#333] text-[#9d4042] cursor-pointer">
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete this user</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
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
