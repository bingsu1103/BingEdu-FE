import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import lessonService from "@/services/lesson.service";
interface CourseProps {
  courses: ICourses;
}
const CreateLesson: React.FC<CourseProps> = ({ courses }) => {
  const [type, setType] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [course, setCourse] = useState<ICourses>(courses);

  useEffect(() => {
    setCourse(courses);
  }, [courses]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("type", type);
      formData.append("level", level);
      const data = {
        title: formData.get("title"),
        type: formData.get("type"),
        level: formData.get("level"),
        courses: {
          id: course._id,
          type: course.type,
        },
      };
      const newLesson = await lessonService.createLessonAPI(data);
      if (!newLesson.status) {
        message.error("Create lesson failed!");
        return;
      }
      formRef.current?.reset();
      setType("");
      closeRef.current?.click();
      message.success("Create lesson successfully!");
    } catch (error) {
      console.log(error);
      message.error("Create lesson failed!");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="Title" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="level">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Level</SelectLabel>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="role">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="multiple_choice">
                    Multiple choice
                  </SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <DialogTrigger>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </div>
      </form>
    </>
  );
};
export default CreateLesson;
