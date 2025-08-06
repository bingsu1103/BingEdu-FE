import React, { useMemo } from "react";

interface SubmissionGraphProps {
  submissions: ISubmission[];
}

interface DayData {
  date: Date;
  count: number;
  level: number;
}

const SubmissionGraph: React.FC<SubmissionGraphProps> = ({ submissions }) => {
  const { calendarData, stats } = useMemo(() => {
    // Create a map of dates to submission counts
    const submissionsByDate = new Map<string, number>();

    submissions.forEach((submission) => {
      const date = new Date(submission.createdAt!);
      const dateKey = date.toISOString().split("T")[0];
      submissionsByDate.set(dateKey, (submissionsByDate.get(dateKey) || 0) + 1);
    });

    // Generate calendar data for the past year
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(endDate.getFullYear() - 1);
    startDate.setDate(startDate.getDate() + 1); // Start from one day after

    const calendarData: DayData[][] = [];
    const currentDate = new Date(startDate);

    // Find the start of the week (Sunday)
    while (currentDate.getDay() !== 0) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Generate weeks
    while (currentDate <= endDate) {
      const week: DayData[] = [];

      for (let i = 0; i < 7; i++) {
        const dateKey = currentDate.toISOString().split("T")[0];
        const count = submissionsByDate.get(dateKey) || 0;

        // Determine level (0-4) based on submission count
        let level = 0;
        if (count > 0) {
          if (count === 1) level = 1;
          else if (count === 2) level = 2;
          else if (count <= 4) level = 3;
          else level = 4;
        }

        week.push({
          date: new Date(currentDate),
          count,
          level,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      calendarData.push(week);
    }

    // Calculate statistics
    const activeDays = Array.from(submissionsByDate.values()).filter(
      (count) => count > 0
    ).length;
    const totalSubmissions = submissions.length;

    // Calculate streaks
    let maxStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = checkDate.toISOString().split("T")[0];
      const hasSubmission = submissionsByDate.has(dateKey);

      if (hasSubmission) {
        tempStreak++;
        if (i === 0) currentStreak = tempStreak;
      } else {
        maxStreak = Math.max(maxStreak, tempStreak);
        if (i === 0) currentStreak = 0;
        tempStreak = 0;
      }
    }
    maxStreak = Math.max(maxStreak, tempStreak);

    return {
      calendarData,
      stats: {
        totalSubmissions,
        activeDays,
        maxStreak,
        currentStreak,
      },
    };
  }, [submissions]);

  const getLevelColor = (level: number): string => {
    const colors = [
      "bg-gray-800", // level 0 - no submissions
      "bg-green-900", // level 1 - 1 submission
      "bg-green-700", // level 2 - 2 submissions
      "bg-green-500", // level 3 - 3-4 submissions
      "bg-green-300", // level 4 - 5+ submissions
    ];
    return colors[level];
  };

  const getMonthLabels = () => {
    const monthLabels: string[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let currentMonth = -1;

    calendarData.forEach((week) => {
      const firstDayOfWeek = week[0];
      const month = firstDayOfWeek.date.getMonth();

      if (month !== currentMonth) {
        monthLabels.push(monthNames[month]);
        currentMonth = month;
      } else {
        monthLabels.push("");
      }
    });

    return monthLabels;
  };

  const getDayLabels = () => {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  return (
    <div className="bg-background/90 p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-foreground">
          <span className="text-2xl font-bold">{stats.totalSubmissions}</span>
          <span>submissions in the past one year</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative max-w-full overflow-x-auto">
        {/* Month labels */}
        <div className="flex gap-1 mb-2 ml-8">
          {getMonthLabels().map((month, index) => (
            <div
              key={index}
              className="text-foreground text-sm w-11 text-center"
            >
              {month}
            </div>
          ))}
        </div>

        <div className="flex gap-1 min-w-max">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2">
            {getDayLabels().map((day, index) => (
              <div key={day} className="h-3 flex items-center">
                {index % 2 === 1 && (
                  <span className="text-foreground text-xs text-right w-6">
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {calendarData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`w-3 h-3 rounded-xs cursor-pointer ${getLevelColor(
                      day.level
                    )} border border-gray-700`}
                    title={`${day.date.toDateString()}: ${
                      day.count
                    } submissions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-foreground text-sm min-w-max">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-xs cursor-pointer ${getLevelColor(
                  level
                )} border border-gray-600`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionGraph;
