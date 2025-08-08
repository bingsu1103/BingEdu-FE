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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { message } from "antd";
import { useRef, useState } from "react";
import coursesService from "@/services/courses.service";

interface ICoursesProps {
  courses: ICourses;
}
const EditCourses: React.FC<ICoursesProps> = ({ courses }) => {
  const [type, setType] = useState<string>(courses.type);
  const [title, setTitle] = useState<string>(courses.title);
  const [price, setPrice] = useState<number>(courses.price);
  const [description, setDescription] = useState<string>(
    courses.description || ""
  );
  const id = courses._id;
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async () => {
    try {
      const payload = { id, title, type, price, description };
      const courses = await coursesService.updateCourseAPI(payload);
      if (!courses.status) {
        message.error("Update course failed!");
        return;
      }
      formRef.current?.reset();
      setType("");
      closeRef.current?.click();
      message.success("Update course successfully!");
    } catch (error) {
      console.log(error);
      message.error("Update course failed!");
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="title">Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            placeholder="Title"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            name="description"
            placeholder="Description"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="price">Price</Label>
          <Input
            value={price || 0}
            onChange={(e) => setPrice(Number(e.target.value))}
            id="price"
            name="price"
            placeholder="Price"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="listening">Listening</SelectItem>
                <SelectItem value="reading">Reading</SelectItem>
                <SelectItem value="grammar">Grammar</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};
export default EditCourses;
