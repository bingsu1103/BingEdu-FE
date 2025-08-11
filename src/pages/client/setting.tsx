import { useState } from "react";
import {
  User,
  Lock,
  Mail,
  Phone,
  MapPin,
  Sun,
  Moon,
  Trash2,
  Save,
} from "lucide-react";

import { UseTheme } from "@/components/context/theme.context";
import { UseCurrentApp } from "@/components/context/app.context";

// shadcn/ui primitives
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import userService from "@/services/user.service";
import authService from "@/services/auth.service";
import { message } from "antd";

interface ISettingUser {
  user: IUser | null;
}

const SettingPage: React.FC<ISettingUser> = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [name, setName] = useState<string>(user?.name || "");
  const [location, setLocation] = useState<string>(user?.location || "");
  const { setTheme, theme } = UseTheme();
  const { setUser, setIsAuthenticated } = UseCurrentApp();

  const handleDeleteAccount = async () => {
    try {
      if (!user?._id) {
        message.warning("User not found");
        return;
      }
      await authService.logoutAPI();
      setIsAuthenticated(false);
      setUser(null);
      const res = await userService.deleteUserAPI(user._id);
      if (res.data?.modifiedCount) {
        message.success("Account deleted!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      await userService.updateUserAPI({ id: user?._id, name, phone, location });
      if (user) {
        setUser({ ...user, name, phone, location });
      }
      message.success("Your changes were saved.");
    } catch (error) {
      console.log(error);
      message.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your profile and interface preferences.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" /> Basic Information
                </CardTitle>
                <CardDescription>
                  Keep your contact info up to date.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2"
                >
                  <div className="md:col-span-1">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        disabled
                        defaultValue={user?.email || ""}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-1">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      disabled
                      defaultValue={user?.type || ""}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-9"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end pt-2">
                    <Button type="submit" className="cursor-pointer gap-2">
                      <Save className="h-4 w-4" /> Save changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Security (password only) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" /> Security
                </CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="current" className="w-full">
                  <TabsList>
                    <TabsTrigger value="current">Change password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="current" className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="current-password">Current password</Label>
                      <div className="relative mt-2">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            // simple eye-off icon using svg to avoid importing extra icons
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.46-1.07 1.11-2.09 1.93-3M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12M6.1 6.1L17.9 17.9" />
                            </svg>
                          ) : (
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="new-password">New password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        className="mt-2"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        className="mt-2"
                        placeholder="Enter confirm password"
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button type="button">Update password</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Side column */}
          <div className="space-y-6">
            {/* Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="h-5 w-5" /> Interface
                </CardTitle>
                <CardDescription>
                  Choose how the app looks to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Theme</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={theme === "light" ? "default" : "outline"}
                      className="cursor-pointer justify-start gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" /> Light
                    </Button>
                    <Button
                      type="button"
                      variant={theme === "dark" ? "default" : "outline"}
                      className="cursor-pointer justify-start gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" /> Dark
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account actions */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Export data or delete your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="cursor-pointer w-full justify-start"
                >
                  Export personal data
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full cursor-pointer justify-start gap-2"
                    >
                      <Trash2 className="h-4 w-4" /> Delete account permanently
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete account</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            <Separator />
            <p className="text-xs text-muted-foreground">
              v1.0 • UI powered by shadcn/ui
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
