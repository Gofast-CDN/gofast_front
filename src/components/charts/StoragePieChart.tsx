"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
const chartData = [
  { filetype: "Images", size: 275, fill: "var(--color-images)" },
  { filetype: "Vidéos", size: 200, fill: "var(--color-videos)" },
  { filetype: "Documents", size: 287, fill: "var(--color-documents)" },
  { filetype: "Espace libre", size: 2400, fill: "var(--color-free)" },
];

const chartConfig = {
  size: {
    label: "Espace utilisé",
  },
  images: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  documents: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  videos: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  free: {
    label: "Free stockage",
    color: "lightgray",
  },
} satisfies ChartConfig;

export function StoragePieChart() {
  const currentStorage = 2000;
  const totalStorage = 5000;
  const isCloseToFull = currentStorage / totalStorage > 0.8;
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Espace de stockage</CardTitle>
        </CardHeader>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] mb-14"
        >
          <Skeleton className="w-full h-full rounded-full" />
        </ChartContainer>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Espace de stockage</CardTitle>
      </CardHeader>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
        style={{ marginTop: "0" }}
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="size"
            nameKey="filetype"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className={`text-2xl font-bold ${
                          isCloseToFull ? "fill-red-500" : "fill-foreground"
                        }`}
                      >
                        {currentStorage.toLocaleString()} GB
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy ? viewBox.cy + 20 : 20}
                        className="fill-muted-foreground"
                      >
                        / {totalStorage.toLocaleString()} GB
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </Card>
  );
}
