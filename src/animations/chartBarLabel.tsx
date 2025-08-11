import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
// import submissionService from "@/services/submission.service";
// import { useEffect, useState } from "react";

type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

export const description = "A bar chart showing total monthly submissions";

const chartConfig = {
  submissions: {
    label: "Submissions",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ChartBarLabelProps {
  listSubmission: ISubmission[];
}

const ChartBarLabel: React.FC<ChartBarLabelProps> = ({ listSubmission }) => {
  const chartData = (() => {
    const currentDate = new Date();
    const months: { month: string; submissions: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      months.push({
        month: date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        submissions: 0,
      });
    }

    listSubmission.forEach((submission) => {
      if (!submission.createdAt) return;
      const submissionDate = new Date(submission.createdAt);
      const monthYear = submissionDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });

      const monthIndex = months.findIndex((m) => m.month === monthYear);
      if (monthIndex !== -1) {
        months[monthIndex].submissions += 1;
      }
    });

    return months;
  })();

  // Calculate trend percentage (compare latest month to previous)
  const trendPercentage = (() => {
    if (chartData.length < 2) return 0;
    const latestMonth = chartData[chartData.length - 1].submissions;
    const previousMonth = chartData[chartData.length - 2].submissions;
    if (previousMonth === 0) return latestMonth > 0 ? 100 : 0;
    return (
      Math.round(((latestMonth - previousMonth) / previousMonth) * 100 * 10) /
      10
    );
  })();

  return (
    <Card className="bg-background border-border">
      {/* Header */}
      {!chartData?.length ? (
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" /> {/* Title */}
            <Skeleton className="h-4 w-72" /> {/* Description */}
          </div>
        </CardHeader>
      ) : (
        <CardHeader>
          <CardTitle className="text-foreground">Monthly Submissions</CardTitle>
          <CardDescription className="text-muted-foreground">
            Total submissions across all lessons from {chartData[0]?.month} to{" "}
            {chartData[chartData.length - 1]?.month}
          </CardDescription>
        </CardHeader>
      )}

      {/* Content */}
      {!chartData?.length ? (
        <CardContent>
          {/* chart placeholder, chiều cao khớp biểu đồ thật */}
          <div className="w-full h-64 sm:h-72 rounded-md border border-border p-3">
            <div className="h-full grid grid-cols-12 items-end gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full rounded"
                  style={{
                    height: `${30 + ((i * 7) % 60)}%`, // cao thấp khác nhau cho tự nhiên
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => {
                  const [month, year] = value.split(" ");
                  return `${month.slice(0, 3)} ${year.slice(2)}`;
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="submissions" fill="#2B7FFF" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}

      {/* Footer */}
      {!chartData?.length ? (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-56" />
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <Skeleton className="h-4 w-64" />
        </CardFooter>
      ) : (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium text-foreground items-center">
            {trendPercentage > 0
              ? `Trending up by ${trendPercentage}% this month`
              : trendPercentage < 0
              ? `Trending down by ${Math.abs(trendPercentage)}% this month`
              : `No change in submissions this month`}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total submissions for the last 6 months
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
export default ChartBarLabel;
