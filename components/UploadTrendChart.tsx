"use client";

import { Download, FileText, Filter } from "lucide-react";
import { useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";

// Define chart config for colors and labels
const chartConfig = {
  document: { label: "Documents", color: "#f04e35" },
  image: { label: "Images", color: "#2196F3" },
  media: { label: "Media", color: "#50E3C2" },
  other: { label: "Other", color: "#e366dd" },
};

// Timeframe options
const timeframes = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "Last 6 Months": 180,
} as const;

export const UploadTrendChart = ({ data }: { data: any[] }) => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<keyof typeof timeframes>("Last 30 Days");
  const [visibleLines, setVisibleLines] = useState({
    document: true,
    image: true,
    media: true,
    other: true,
  });

  const chartRef = useRef<HTMLDivElement>(null);

  // Filter data based on selected timeframe
  const filteredData = data.slice(-timeframes[selectedTimeframe]);
  
  // Toggle visibility of lines
  const toggleLine = (key: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Download Chart as PNG
  const downloadChart = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        // Create a link to download the canvas as a PNG
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "upload_trend_chart.png";
        link.click();
      });
    }
  };

  // Download Data as CSV
  const downloadCSV = () => {
    const filteredDataForCSV = filteredData.map((item) => {
      const csvRow: any = { date: item.date };
      if (visibleLines.document) csvRow.document = item.document;
      if (visibleLines.image) csvRow.image = item.image;
      if (visibleLines.media) csvRow.media = item.media;
      if (visibleLines.other) csvRow.other = item.other;
      return csvRow;
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Date,Document,Image,Media,Other",
        ...filteredDataForCSV.map((row) =>
          Object.values(row)
            .map((value) => `"${value}"`)
            .join(",")
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "upload_trend_data.csv");
    link.click();
  };

  return (
    <Card className="bg-white shadow-lg rounded-2xl p-3 mt-5 sm:mt-6 sm:p-2 border border-gray-300 transition-all hover:shadow-xl">
      <CardHeader className="flex justify-between items-center flex-wrap gap-4">
        <CardTitle className="text-xl sm:text-2xl tracking-wide font-bold text-gray-800">
          Upload Trends
        </CardTitle>
        <div className="flex flex-wrap gap-4 justify-center items-center p-1">
          {/* Download Chart Button */}
          <Button
            variant="default"
            className="flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            onClick={downloadChart}
          >
            <Download className="h-4 w-4" /> Download Chart
          </Button>

          {/* Download Data as CSV Button */}
          <Button
            variant="default"
            className="flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            onClick={downloadCSV}
          >
            <FileText className="h-2 w-2" /> Download Data
          </Button>

          {/* Timeframe Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto">
                <Filter className="h-4 w-4" /> {selectedTimeframe}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(Object.keys(timeframes) as Array<keyof typeof timeframes>).map(
                (timeframe) => (
                  <DropdownMenuItem
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center w-full overflow-hidden p-3 sm:p-4">
        <ChartContainer config={chartConfig}>
          <div ref={chartRef} className="w-full flex-1 sm:h-[200px] md:h-[205px] lg:h-[310px] md:w-3/2 lg:w-full sm:w-3/2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData} margin={{ right: 20 }}>
                <CartesianGrid strokeDasharray="4 4" strokeOpacity={0.15} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#4b5563", fontSize: 13 }}
                  tickMargin={8}
                  reversed={true} 
                />
                <YAxis tick={{ fill: "#4b5563", fontSize: 13 }} tickMargin={8} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={30}
                  iconSize={15}
                />

                {/* Lines with Toggle Feature */}
                {visibleLines.document && (
                  <Line
                    type="bump"
                    dataKey="document"
                    stroke={chartConfig.document.color}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                      stroke: chartConfig.document.color,
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                  />
                )}
                {visibleLines.image && (
                  <Line
                    type="bump"
                    dataKey="image"
                    stroke={chartConfig.image.color}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                      stroke: chartConfig.image.color,
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                  />
                )}
                {visibleLines.media && (
                  <Line
                    type="bump"
                    dataKey="media"
                    stroke={chartConfig.media.color}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                      stroke: chartConfig.media.color,
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                  />
                )}
                {visibleLines.other && (
                  <Line
                    type="bump"
                    dataKey="other"
                    stroke={chartConfig.other.color}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{
                      r: 5,
                      stroke: chartConfig.other.color,
                      strokeWidth: 3,
                      fill: "#fff",
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        {/* Line Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 w-full">
          {Object.keys(chartConfig).map((key) => (
            <Button
              key={key}
              variant={
                visibleLines[key as keyof typeof visibleLines]
                  ? "default"
                  : "outline"
              }
              style={{
                backgroundColor: visibleLines[key as keyof typeof visibleLines]
                  ? chartConfig[key as keyof typeof chartConfig].color
                  : "",
              }}
              onClick={() => toggleLine(key as keyof typeof visibleLines)}
              className="w-full sm:w-auto text-sm"
            >
              {chartConfig[key as keyof typeof chartConfig].label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
