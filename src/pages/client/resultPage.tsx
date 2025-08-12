import React, { useEffect, useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
// import { useCurrentApp } from "@/components/context/app.context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

interface ILesson {
  _id: string;
  title: string;
  index?: number;
}
interface ICourses {
  _id: string;
  title: string;
}

const ResultPage: React.FC = () => {
  // const { user } = useCurrentApp();
  const [courses, setCourses] = useState<ICourses[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [loadingLessons, setLoadingLessons] = useState(false);

  useEffect(() => {
    setLoadingCourses(true);
    // Mock data
    setTimeout(() => {
      setCourses([
        { _id: "c1", title: "Khóa học A" },
        { _id: "c2", title: "Khóa học B" },
      ]);
      setLoadingCourses(false);
    }, 500);
  }, []);

  const loadLessons = (courseId: string) => {
    setLoadingLessons(true);
    setActiveCourseId(courseId);
    setTimeout(() => {
      setLessons([
        { _id: "l1", title: "Bài 1", index: 0 },
        { _id: "l2", title: "Bài 2", index: 1 },
      ]);
      setLoadingLessons(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight">Kết quả học tập</h1>
          <p className="text-sm text-muted-foreground">
            Chọn khóa học và bài học để xem kết quả.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" /> Khóa học
                </CardTitle>
                <CardDescription>
                  Chọn một khóa để xem danh sách bài học.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {loadingCourses ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  courses.map((c) => (
                    <Button
                      key={c._id}
                      variant={activeCourseId === c._id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => loadLessons(c._id)}
                    >
                      {c.title}
                    </Button>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex-row items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base md:text-lg">
                    {activeCourseId
                      ? courses.find((c) => c._id === activeCourseId)?.title
                      : "Chưa chọn khóa học"}
                  </CardTitle>
                  <CardDescription>
                    {activeCourseId
                      ? "Chọn bài học để tiếp tục"
                      : "Vui lòng chọn một khóa học ở bên trái"}
                  </CardDescription>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!activeCourseId || loadingLessons}
                    >
                      Chọn bài học
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    <DropdownMenuLabel>Bài học</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {loadingLessons ? (
                      <Skeleton className="h-6 w-full" />
                    ) : lessons.length === 0 ? (
                      <DropdownMenuItem disabled>
                        Chưa có bài học
                      </DropdownMenuItem>
                    ) : (
                      lessons.map((l, idx) => (
                        <DropdownMenuItem key={l._id}>
                          Bài {l.index ?? idx + 1}: {l.title}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent>
                {!activeCourseId && (
                  <Alert>
                    <AlertTitle>Chưa chọn khóa học</AlertTitle>
                    <AlertDescription>
                      Hãy chọn một khóa học để xem danh sách bài học.
                    </AlertDescription>
                  </Alert>
                )}

                {activeCourseId && lessons.length === 0 && !loadingLessons && (
                  <Alert>
                    <AlertTitle>Chưa có bài học</AlertTitle>
                    <AlertDescription>
                      Khóa học này chưa có bài học nào.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
