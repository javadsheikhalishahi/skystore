"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertFileSize } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// colors to each category
const CATEGORY_COLORS: { [key: string]: string } = {
  Documents: "#f04e35",
  Images: "#35b1f0",
  Media: "#50E3C2",
  Others: "#e366dd",
};

export const CategoryChart = ({ usageSummary }: { usageSummary: any[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<any[]>(usageSummary);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update data whenever new usageSummary is passed
  useEffect(() => {
    setData(usageSummary);
  }, [usageSummary]);

  // filtering logic
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "All") {
      setData(usageSummary);
    } else {
      setData(usageSummary.filter((item) => item.title === category));
    }
  };

  // Map categories
  const chartData =
    data?.map((item, index) => ({
      name: item.title,
      value: item.size,
      color: CATEGORY_COLORS[item.title] || "#ccc",
      sizeFormatted: convertFileSize(item.size),
    })) || [];

  const totalUsage = chartData.reduce((acc, item) => acc + item.value, 0);

  const allZero = chartData.every((item) => item.value === 0);

  if (!isClient) return null;

  return (
    <Card className="bg-white shadow-lg rounded-2xl p-2 mt-5 sm:p-4 border border-gray-300 transition-all hover:shadow-xl">
      <CardHeader className="text-center mt-0">
        <CardTitle className="text-xl sm:text-2xl mb-4 font-bold text-gray-800 ">
           Storage Capacity Overview
        </CardTitle>
        <select
          value={selectedCategory}
          onChange={handleFilterChange}
          className="w-auto px-3 py-0.5 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue"
        >
          <option value="All">All Categories</option>
          <option value="Documents">Documents</option>
          <option value="Images">Images</option>
          <option value="Media">Media</option>
          <option value="Others">Others</option>
        </select>
      </CardHeader>
      <CardContent className="flex justify-center items-center relative">
        {allZero ? (
          <p className="text-center text-lg text-gray-600 animate-bounce">
            No data available for this category.
          </p>
        ) : (
          <>
            {/* Centered total usage text */}
            <div className="absolute flex flex-col items-center justify-center self-center top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm  text-gray-800 font-semibold">
              <p className="text-sm font-medium text-gray-700">Total Usage</p>
              <p className="text-xl font-bold text-black mt-1 animate-pulse">
                {convertFileSize(totalUsage)}
              </p>

              <div className="my-0.5 w-12 border-t-2 border-gray-300" />

              <p className="text-xs text-gray-500 mt-1">2GB</p>
            </div>

            {/* Pie chart */}
            <ResponsiveContainer
              width="100%"
              height={
                window.innerWidth < 640
                  ? 260
                  : window.innerWidth < 1024
                    ? 300
                    : 350
              }
            >
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={
                    window.innerWidth < 640
                      ? 80
                      : window.innerWidth < 1024
                        ? 90
                        : 100
                  }
                  innerRadius={
                    window.innerWidth < 640
                      ? 50
                      : window.innerWidth < 1024
                        ? 60
                        : 70
                  }
                  paddingAngle={2}
                  cornerRadius={7}
                  labelLine={false}
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    name,
                    payload,
                    percent,
                  }) => {
                    if (window.innerWidth >= 640) {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius + 10;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill={payload.color}
                          textAnchor={x > cx ? "start" : "end"}
                          dominantBaseline="central"
                          fontSize="13"
                          fontWeight="bold"
                        >
                          {` ${payload.sizeFormatted} (${(percent * 100).toFixed(1)}%)`}
                        </text>
                      );
                    }
                    return "";
                  }}
                  strokeWidth={2}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="transition-transform transform hover:scale-110 duration-700"
                      style={{
                        transformOrigin: "center",
                        transition: "all 0.8s ease",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    color: "#333",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                  formatter={(value) => convertFileSize(value as number)}
                />
                <Legend
                  verticalAlign={window.innerWidth < 640 ? "top" : "bottom"}
                  align="center"
                  iconType="circle"
                  wrapperStyle={{
                    color: "#333",
                    fontSize:
                      window.innerWidth < 640
                        ? "12px"
                        : window.innerWidth < 1024
                          ? "12px"
                          : "14px",
                    marginTop: "10px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </CardContent>
    </Card>
  );
};
