import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartConfig = {
  completed: {
    label: "Total Concluído",
    color: "hsl(var(--chart-2))",
  },
  inProgress: {
    label: "Em progresso",
    color: "hsl(var(--chart-4))",
  },
  pending: {
    label: "Não iniciado",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

interface TotalCompletionProps {
  totalCompleted: number;
}

export function TotalCompletion({ totalCompleted }: TotalCompletionProps) {
  const isCompleted =
    totalCompleted === 100
      ? "var(--color-completed)"
      : "var(--color-inProgress)";

  const label =
    totalCompleted === 100
      ? chartConfig.completed.label
      : totalCompleted !== 0
      ? chartConfig.inProgress.label
      : chartConfig.pending.label;

  const chartData = [
    {
      label,
      totalCompleted,
      fill: isCompleted,
    },
  ];

  return (
    <ChartContainer config={chartConfig} className="size-[172px] mx-auto">
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={450 * (totalCompleted / 100)}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[86, 74]}
        />
        <RadialBar dataKey="totalCompleted" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-4xl font-bold"
                    >
                      {chartData[0].totalCompleted.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {chartData[0].label}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
