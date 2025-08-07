import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { message, Popconfirm } from "antd";
import coursesService from "@/services/courses.service";
import { BookmarkPlus } from "lucide-react";
import CreateCourses from "../manager/createCourses";
const CoursesDashboard: React.FC = () => {
  const [coursesData, setCoursesData] = useState<ICourses[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const listCoursesRes = await coursesService.getAllCoursesAPI();
      setCoursesData(listCoursesRes.data || []);
    };
    fetchCourses();
  }, []);
  const handleDeleteCourses = async (id: string) => {
    try {
      const deleteRes = await coursesService.deleteCoursesAPI(id);
      if (deleteRes.data?.deletedCount) {
        message.success("Delete courses successfully!");
        return;
      }
      message.error("Delete courses failed");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Search + Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 text-foreground">
        <div className="flex gap-2 max-sm:flex-col">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="cursor-pointer flex items-center gap-1">
                <BookmarkPlus />
                <span>Create course</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Course</DialogTitle>
                <DialogDescription>
                  Fill all fields below to add a course
                </DialogDescription>
              </DialogHeader>
              <CreateCourses />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-foreground">
          {coursesData.map((courses) => (
            <TableRow className="leading-12 text-foreground" key={courses._id}>
              <TableCell>{courses._id}</TableCell>
              <TableCell>{courses.title}</TableCell>
              <TableCell>{courses.type}</TableCell>
              <TableCell className="font-medium">
                {courses.description}
              </TableCell>
              <TableCell className="flex gap-2 justify-center items-center">
                <Tooltip>
                  <TooltipTrigger>
                    <Popconfirm
                      title="Delete Course"
                      onConfirm={() => handleDeleteCourses(courses._id)}
                      description="Are you sure to delete this course?"
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button className="p-2 bg-transparent hover:bg-[#333] text-[#9d4042] cursor-pointer">
                        <DeleteOutlined />
                      </Button>
                    </Popconfirm>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete this course</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
export default CoursesDashboard;
