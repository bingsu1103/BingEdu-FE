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
const CreateCourses = () => {
  const [type, setType] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("type", type);
      const data = {
        title: formData.get("title"),
        type: formData.get("type"),
        description: formData.get("description"),
        thumbnail:
          "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400",
      };
      const courses = await coursesService.createCourseAPI(data);
      if (!courses.status) {
        message.error("Create course failed!");
        return;
      }
      formRef.current?.reset();
      setType("");
      closeRef.current?.click();
      message.success("Create course successfully!");
    } catch (error) {
      console.log(error);
      message.error("Create course failed!");
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
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Description"
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
              <Button ref={closeRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </div>
      </form>
    </>
  );
};
export default CreateCourses;
