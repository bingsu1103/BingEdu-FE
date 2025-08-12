import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import userService from "@/services/user.service";
import { message } from "antd";
import { DialogClose } from "@radix-ui/react-dialog";

interface EditUserProps {
  user: IUser;
}
const EditUser: React.FC<EditUserProps> = ({ user }) => {
  const [role, setRole] = useState<string>(user.role);
  const [type, setType] = useState<string>(user.type);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("role", role);
    formData.append("type", type);
    const data = {
      id: user._id,
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
      phone: formData.get("phone"),
      role: formData.get("role"),
      type: formData.get("type"),
    };
    const result = await userService.updateUserAPI(data);
    if (!result.status) {
      message.error(result.message);
      return;
    }
    message.success(result.message);
    closeRef.current?.click();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to user's profile here. Click save when you&apos;re
            done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" defaultValue={user.email} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user.name} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" defaultValue={user.phone} />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={setRole}
              defaultValue={user.role}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="z-1002">
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="type">Type</Label>
            <Select
              defaultValue={user.type}
              value={type}
              onValueChange={setType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="z-1002">
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="vip">Vip</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <Button className="cursor-pointer" type="submit">
            Save changes
          </Button>
          <SheetClose asChild>
            <DialogClose ref={closeRef}></DialogClose>
            <Button className="cursor-pointer" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </div>
  );
};
export default EditUser;
