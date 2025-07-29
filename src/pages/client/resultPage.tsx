import { Trophy, Star, TrendingUp, Medal } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  points?: number;
}

function ResultPage() {
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Course",
      description: "Hoàn thành khóa học đầu tiên",
      icon: "🎯",
      earned: true,
      date: "2024-01-15",
      points: 100,
    },
    {
      id: "2",
      title: "Speed Learner",
      description: "Hoàn thành 5 khóa học trong 1 tháng",
      icon: "⚡",
      earned: true,
      date: "2024-02-20",
      points: 250,
    },
    {
      id: "3",
      title: "English Master",
      description: "Hoàn thành 10 khóa học tiếng Anh",
      icon: "📚",
      earned: true,
      date: "2024-03-10",
      points: 500,
    },
    {
      id: "4",
      title: "Streak Champion",
      description: "Học liên tục 30 ngày",
      icon: "🔥",
      earned: false,
      points: 300,
    },
    {
      id: "5",
      title: "Perfect Score",
      description: "Đạt điểm tuyệt đối trong bài kiểm tra",
      icon: "💯",
      earned: true,
      date: "2024-02-28",
      points: 200,
    },
    {
      id: "6",
      title: "Night Owl",
      description: "Học vào ban đêm 10 lần",
      icon: "🦉",
      earned: false,
      points: 150,
    },
    {
      id: "7",
      title: "Early Bird",
      description: "Học vào buổi sáng 15 lần",
      icon: "🌅",
      earned: true,
      date: "2024-03-05",
      points: 180,
    },
    {
      id: "8",
      title: "Social Learner",
      description: "Tham gia thảo luận 50 lần",
      icon: "💬",
      earned: false,
      points: 220,
    },
  ];

  const monthlyStats = [
    { month: "1st month", courses: 3, hours: 45, certificates: 2 },
    { month: "2nd month", courses: 4, hours: 52, certificates: 3 },
    { month: "3rd month", courses: 5, hours: 48, certificates: 3 },
  ];

  const totalPoints = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + (a.points || 0), 0);
  const earnedAchievements = achievements.filter((a) => a.earned).length;

  const AchievementBadge = ({ achievement }: { achievement: Achievement }) => (
    <div
      className={`bg-background rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
        achievement.earned
          ? "border-yellow-200 shadow-lg hover:shadow-xl"
          : "border-gray-200 opacity-60"
      }`}
    >
      <div className="text-center">
        <div className={`text-4xl mb-3 ${!achievement.earned && "grayscale"}`}>
          {achievement.icon}
        </div>
        <h3 className="font-bold text-foreground mb-2">{achievement.title}</h3>
        <p className="text-sm text-foreground mb-3">
          {achievement.description}
        </p>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star size={14} className="text-yellow-500" />
          <span className="text-sm font-medium text-foreground">
            {achievement.points} point
          </span>
        </div>
        {achievement.earned && achievement.date && (
          <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            {new Date(achievement.date).toLocaleDateString("vi-VN")}
          </p>
        )}
        {!achievement.earned && (
          <p className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Not achieved yet
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Achievement & Result
              </h1>
              <p className="text-foreground">
                Track your learning progress and achievements
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalPoints}
                </div>
                <div className="text-sm text-foreground">Total Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {earnedAchievements}
                </div>
                <div className="text-sm text-foreground">Achievement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Achievement Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-background rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={24} />
                <h3 className="text-lg font-semibold">Total Achievement</h3>
              </div>
              <div className="text-3xl font-bold mb-2">
                {earnedAchievements}/{achievements.length}
              </div>
              <div className="text-blue-100">Badges earned</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-background rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Star size={24} />
                <h3 className="text-lg font-semibold">Achievement Points</h3>
              </div>
              <div className="text-3xl font-bold mb-2">{totalPoints}</div>
              <div className="text-green-100">Total accumulated points</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-background rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={24} />
                <h3 className="text-lg font-semibold">Ranked</h3>
              </div>
              <div className="text-3xl font-bold mb-2">#15</div>
              <div className="text-purple-100">This month</div>
            </div>
          </div>

          {/* Progress toward next achievement */}
          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Next Achievement
            </h3>
            <div className="space-y-4">
              {achievements
                .filter((a) => !a.earned)
                .slice(0, 2)
                .map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-foreground">
                          {achievement.title}
                        </span>
                        <span className="text-sm text-foreground">
                          {achievement.points} point
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-2">
                        {achievement.description}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: "60%" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Monthly Statistics */}
          <div className="bg-background rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Monthly statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monthlyStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-background rounded-lg"
                >
                  <h4 className="font-semibold text-foreground mb-3">
                    {stat.month}
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-foreground">Courses:</span>
                      <span className="font-medium">{stat.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Studying hours:</span>
                      <span className="font-medium">{stat.hours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground">Certificate:</span>
                      <span className="font-medium">{stat.certificates}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Achievements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                All badges & achievements
              </h2>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Medal size={16} />
                <span>
                  {earnedAchievements}/{achievements.length} achieved
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
