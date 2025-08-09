import React, { useState, useMemo, useEffect } from "react";
import {
  Trophy,
  Medal,
  Crown,
  Target,
  Award,
  BookOpen,
  Clock,
  Star,
  BarChart3,
} from "lucide-react";
import ChartBarLabel from "@/animations/chartBarLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import userService from "@/services/user.service";
import coursesService from "@/services/courses.service";
import submissionService from "@/services/submission.service";
import lessonService from "@/services/lesson.service";

interface UserRanking {
  userId: string;
  userName: string;
  avatar: string;
  totalScore: number;
  submissionCount: number;
  averageScore: number;
  rank: number;
}
interface WeeklyTopUser {
  userId: string;
  userName: string;
  avatar: string;
  submissionCount: number;
  rank: number;
}

const RankingPage: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");
  const [listUser, setListUser] = useState<IUser[]>([]);
  const [listCourse, setListCourse] = useState<ICourses[]>([]);
  const [listSubmission, setListSubmission] = useState<ISubmission[]>([]);
  const [listLesson, setListLesson] = useState<ILesson[]>([]);
  const [allLesson, setAllLesson] = useState<ILesson[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userService.getAllUser();
      setListUser(res.data ?? []);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await coursesService.getAllCoursesAPI();
      setListCourse(res?.data ?? []);
    };
    fetchCourse();
  }, []);

  useEffect(() => {
    const fetchSubmission = async () => {
      const res = await submissionService.getAllSubmissionAPI();
      setListSubmission(res?.data || []);
    };
    fetchSubmission();
  }, []);

  useEffect(() => {
    const fetchAllLesson = async () => {
      const res = await lessonService.getAllLessonAPI();
      setAllLesson(res.data || []);
    };
    fetchAllLesson();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      if (selectedCourseId) {
        const res = await lessonService.getLessonByCourseIdAPI(
          selectedCourseId
        );
        setListLesson(res?.data || []);
      } else {
        setListLesson([]);
      }
    };
    fetchLessons();
  }, [selectedCourseId]);

  const filteredLessons = useMemo(() => {
    return listLesson;
  }, [listLesson]);

  const userRankings = useMemo(() => {
    if (!selectedLessonId) return [];

    const lessonSubmissions = listSubmission.filter(
      (submission) => submission.lessonId === selectedLessonId
    );

    const userStats: Record<
      string,
      { totalScore: number; submissionCount: number; scores: number[] }
    > = {};

    lessonSubmissions.forEach((submission) => {
      if (!userStats[submission.userId]) {
        userStats[submission.userId] = {
          totalScore: 0,
          submissionCount: 0,
          scores: [],
        };
      }
      userStats[submission.userId].totalScore += submission.score;
      userStats[submission.userId].submissionCount += 1;
      userStats[submission.userId].scores.push(submission.score);
    });

    const rankings: UserRanking[] = Object.entries(userStats)
      .map(([userId, stats]) => {
        const user = listUser.find(
          (u) => u._id === userId && u.deleted === false
        );
        if (!user) return null;
        return {
          userId,
          userName: user?.name,
          avatar:
            user?.avatar ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64",
          totalScore: stats.totalScore,
          submissionCount: stats.submissionCount,
          averageScore:
            Math.round((stats.totalScore / stats.submissionCount) * 100) / 100,
          rank: 0,
        };
      })
      .filter((item): item is UserRanking => item !== null);

    rankings.sort((a, b) => b.totalScore - a.totalScore);
    rankings.forEach((user, index) => {
      user.rank = index + 1;
    });

    return rankings;
  }, [selectedLessonId, listSubmission, listUser]);

  const weeklyTopUsers = useMemo(() => {
    const currentDate = new Date("2025-08-06T17:13:00+07:00");
    const currentDayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() -
        (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1)
    );
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklySubmissions = listSubmission.filter((submission) => {
      const submissionDate = new Date(submission.createdAt ?? "");
      return submissionDate >= startOfWeek && submissionDate <= endOfWeek;
    });

    const userSubmissionCounts: Record<string, { submissionCount: number }> =
      {};
    weeklySubmissions.forEach((submission) => {
      if (!userSubmissionCounts[submission.userId]) {
        userSubmissionCounts[submission.userId] = { submissionCount: 0 };
      }
      userSubmissionCounts[submission.userId].submissionCount += 1;
    });

    const topUsers = Object.entries(userSubmissionCounts)
      .map(([userId, { submissionCount }]) => {
        const user = listUser.find(
          (u) => u._id === userId && u.deleted === false
        );
        if (!user) return null;
        return {
          userId,
          userName: user?.name,
          avatar:
            user?.avatar ||
            "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=64",
          submissionCount,
          rank: 0,
        };
      })
      .filter(Boolean) as WeeklyTopUser[];

    topUsers.sort((a, b) => b.submissionCount - a.submissionCount);
    topUsers.forEach((user, index) => {
      user.rank = index + 1;
    });

    return topUsers.slice(0, 3);
  }, [listSubmission, listUser]);

  const selectedCourse = listCourse.find(
    (course) => course._id === selectedCourseId
  );
  const selectedLesson = filteredLessons.find(
    (lesson) => lesson._id === selectedLessonId
  );

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
            {rank}
          </div>
        );
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md";
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "grammar":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "listening":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "writing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "mixed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ChartBarLabel listSubmission={listSubmission} />
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-foreground">
                  Quick Stats
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Courses</span>
                  <span className="font-semibold text-foreground">
                    {listCourse.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Lessons</span>
                  <span className="font-semibold text-foreground">
                    {allLesson.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Total Submissions
                  </span>
                  <span className="font-semibold text-foreground">
                    {listSubmission.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-semibold text-foreground">
                    {listUser.filter((user) => user.is_active).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Top Submitters */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <Trophy className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-semibold text-foreground">
                  Top Submitters This Week
                </h3>
              </div>
              {weeklyTopUsers.length > 0 ? (
                <div className="space-y-4">
                  {weeklyTopUsers.map((user) => (
                    <div
                      key={user.userId}
                      className="flex items-center space-x-4"
                    >
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${getRankBadgeColor(
                          user.rank
                        )}`}
                      >
                        {getRankIcon(user.rank)}
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.userName}
                        className="w-10 h-10 rounded-full object-cover shadow-md border border-border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {user.userName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.submissionCount} submission
                          {user.submissionCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No submissions this week
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters */}
        {/* Filters */}
        <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-foreground">
              Select Course & Lesson
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Course
              </label>
              <Select
                value={selectedCourseId}
                onValueChange={(value) => {
                  setSelectedCourseId(value);
                  setSelectedLessonId("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a course..." />
                </SelectTrigger>
                <SelectContent>
                  {listCourse.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      <div className="flex items-center space-x-3 w-full max-w-[250px]">
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeBadgeColor(
                            course.type
                          )}`}
                        >
                          {course.type}
                        </div>
                        <span className="truncate">{course.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Lesson Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-foreground">
                Lesson
              </label>
              <Select
                value={selectedLessonId}
                onValueChange={setSelectedLessonId}
                disabled={!selectedCourseId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a lesson..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredLessons.map((lesson) => (
                    <SelectItem key={lesson._id} value={lesson._id}>
                      <div className="flex items-center space-x-3 w-full max-w-[250px]">
                        <div
                          className={`px-2 py-1 rounded-md text-xs font-medium ${getLevelBadgeColor(
                            lesson.level
                          )}`}
                        >
                          {lesson.level}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                        <div className="flex items-center text-xs text-muted-foreground flex-shrink-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {lesson.time}m
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected Course/Lesson Info */}
          {selectedCourse && selectedLesson && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
              <div className="flex items-start space-x-6">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="w-20 h-20 rounded-xl object-cover shadow-md border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-lg mb-2 truncate">
                    {selectedCourse.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 truncate">
                    {selectedLesson.title}
                  </p>
                  <div className="flex items-center flex-wrap gap-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                        selectedCourse.type
                      )}`}
                    >
                      {selectedCourse.type}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(
                        selectedLesson.level
                      )}`}
                    >
                      {selectedLesson.level}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
                      <Clock className="w-3 h-3 mr-1" />
                      {selectedLesson.time} minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rankings */}
        {selectedLessonId && userRankings.length > 0 ? (
          <div className="space-y-8">
            {/* Top 3 Podium */}
            {userRankings.length >= 3 && (
              <div className="bg-card rounded-2xl shadow-sm p-8 border border-border">
                <h3 className="text-2xl font-semibold text-foreground mb-8 text-center flex items-center justify-center space-x-3">
                  <Trophy className="w-7 h-7 text-yellow-500" />
                  <span>Top Performers</span>
                </h3>
                <div className="flex justify-center items-end space-x-12">
                  {/* Second Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={userRankings[1].avatar}
                        alt={userRankings[1].userName}
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 shadow-xl"
                      />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <p className="font-semibold text-foreground text-lg">
                        {userRankings[1].userName}
                      </p>
                      <p className="text-3xl font-bold text-gray-600 mb-1">
                        {userRankings[1].totalScore}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg: {userRankings[1].averageScore}
                      </p>
                    </div>
                    <div className="w-28 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-2xl shadow-lg"></div>
                  </div>

                  {/* First Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={userRankings[0].avatar}
                        alt={userRankings[0].userName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-2xl"
                      />
                      <div className="absolute -top-4 -right-3 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-xl">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <p className="font-semibold text-foreground text-xl">
                        {userRankings[0].userName}
                      </p>
                      <p className="text-4xl font-bold text-yellow-600 mb-1">
                        {userRankings[0].totalScore}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg: {userRankings[0].averageScore}
                      </p>
                    </div>
                    <div className="w-32 h-24 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t-2xl shadow-xl"></div>
                  </div>

                  {/* Third Place */}
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <img
                        src={userRankings[2].avatar}
                        alt={userRankings[2].userName}
                        className="w-20 h-20 rounded-full object-cover border-4 border-amber-500 shadow-xl"
                      />
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <p className="font-semibold text-foreground text-lg">
                        {userRankings[2].userName}
                      </p>
                      <p className="text-3xl font-bold text-amber-600 mb-1">
                        {userRankings[2].totalScore}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg: {userRankings[2].averageScore}
                      </p>
                    </div>
                    <div className="w-28 h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-2xl shadow-lg"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Rankings List */}
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="px-3 sm:px-6 py-4 bg-muted/30 border-b border-border">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                  <span className="truncate">Complete Rankings</span>
                </h3>
              </div>
              <div className="divide-y divide-border">
                {userRankings.map((user) => (
                  <div
                    key={user.userId}
                    className={`px-3 sm:px-6 py-3 sm:py-4 hover:bg-muted/20 transition-all duration-200 ${
                      user.rank <= 3
                        ? "bg-gradient-to-r from-blue-50/30 to-purple-50/30 dark:from-blue-950/10 dark:to-purple-950/10"
                        : ""
                    }`}
                  >
                    {/* Mobile Layout */}
                    <div className="block sm:hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          {/* Rank Badge */}
                          <div
                            className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 ${getRankBadgeColor(
                              user.rank
                            )}`}
                          >
                            {user.rank <= 3 ? (
                              getRankIcon(user.rank)
                            ) : (
                              <span className="text-xs font-bold">
                                {user.rank}
                              </span>
                            )}
                          </div>

                          {/* User Info */}
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <img
                              src={user.avatar}
                              alt={user.userName}
                              className="w-9 h-9 rounded-full object-cover shadow-md border border-border flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-foreground text-sm truncate">
                                {user.userName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {user.submissionCount} submission
                                {user.submissionCount !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Scores */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">
                              {user.totalScore}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Total
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-base font-semibold text-blue-600">
                              {user.averageScore}
                            </p>
                            <p className="text-xs text-muted-foreground">Avg</p>
                          </div>
                        </div>
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden flex-shrink-0">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                (user.averageScore / 100) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex items-center justify-between gap-4 min-w-0">
                      <div className="flex items-center gap-4 min-w-0 flex-1">
                        {/* Rank Badge */}
                        <div
                          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 ${getRankBadgeColor(
                            user.rank
                          )}`}
                        >
                          {user.rank <= 3 ? (
                            getRankIcon(user.rank)
                          ) : (
                            <span className="text-xs sm:text-sm font-bold">
                              {user.rank}
                            </span>
                          )}
                        </div>

                        {/* User Info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img
                            src={user.avatar}
                            alt={user.userName}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shadow-md border border-border flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-foreground text-base sm:text-lg truncate">
                              {user.userName}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                              {user.submissionCount} submission
                              {user.submissionCount !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Scores */}
                      <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1 hidden sm:block">
                            Total Score
                          </p>
                          <p className="text-base sm:text-xl font-bold text-foreground">
                            {user.totalScore}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1 hidden sm:block">
                            Average
                          </p>
                          <p className="text-sm sm:text-base font-semibold text-blue-600">
                            {user.averageScore}
                          </p>
                        </div>
                        <div className="w-10 sm:w-12 h-2 bg-muted rounded-full overflow-hidden flex-shrink-0">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                (user.averageScore / 100) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : selectedLessonId && userRankings.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-card rounded-2xl shadow-sm p-12 border border-border">
              <Trophy className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                No Submissions Found
              </h3>
              <p className="text-muted-foreground text-lg">
                No users have submitted this lesson yet. Be the first to
                compete!
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-card rounded-2xl shadow-sm p-12 border border-border">
              <Target className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Select Course & Lesson
              </h3>
              <p className="text-muted-foreground text-lg">
                Choose a course and lesson above to view user rankings and
                performance statistics.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
