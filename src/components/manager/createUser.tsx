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
import userService from "@/services/user.service";
import { message } from "antd";
import { useRef, useState } from "react";
const CreateUser = () => {
  const [role, setRole] = useState<string>("");
  const [type, setType] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      formData.append("role", role);
      formData.append("type", type);
      const data = {
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
        phone: formData.get("phone"),
        role: formData.get("role"),
        type: formData.get("type"),
      };
      console.log(data);
      const user = await userService.createUserAPI(data);
      if (!user.status) {
        message.error("Create user failed!");
        return;
      }
      formRef.current?.reset();
      setRole("");
      setType("");
      closeRef.current?.click();
      message.success("Create user successfully!");
    } catch (error) {
      console.log(error);
      message.error("Create user failed!");
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} ref={formRef}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="example@gmail.com" />
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
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="vip">Vip</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button ref={closeRef} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </>
  );
};
export default CreateUser;
