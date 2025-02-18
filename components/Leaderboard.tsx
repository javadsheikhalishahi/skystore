"use client";

import { useState } from "react";
import CountUp from "react-countup";

// Function to get background color based on file extension
const getColorByExtension = (extension: string) => {
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"];
  const audioExtensions = ["mp3", "mpeg", "wav", "aac", "flac", "ogg", "wma", "m4a", "aiff", "alac"];
  const videoExtensions = ["mkv", "mov", "avi", "wmv", "mp4", "flv", "webm", "m4v", "3gp"];
  const documentExtensions = ["pdf", "doc", "docx", "csv", "txt", "xls", "xlsx"];

  if (imageExtensions.includes(extension)) return "#2196F3"; 
  if (audioExtensions.includes(extension)) return "#50E3C2"; 
  if (videoExtensions.includes(extension)) return "#FF9800";
  if (documentExtensions.includes(extension)) return "#f04e35"; 

  return "#444";
};

export const Leaderboard = ({ fileTypeStats }: { fileTypeStats: any[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Sort the file types by count in descending order
  const sortedFileTypeStats = [...fileTypeStats].sort((a, b) => b.count - a.count);

  return (
    <div className="leaderboard-container mt-5 bg-white shadow-lg rounded-2xl sm:mt-6 border border-gray-300 transition-all hover:shadow-xl">
      <h2 className="text-lg font-semibold mb-7">Most Uploaded File Types</h2>
      <ul className="leaderboard-list cursor-pointer">
        {fileTypeStats.length === 0 ? (
          <p className="text-gray-500 animate-pulse">No files have been uploaded yet.</p>
        ) : (
          sortedFileTypeStats.map((type, index) => (
            <li
              key={index}
              className="leaderboard-item"
              style={{
                backgroundColor: index === 0 ? getColorByExtension(type.extension.toLowerCase()) : "inherit",
                color: index === 0 ? "white" : "inherit",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span>{type.extension.toUpperCase()}</span>
              <span className="font-semibold">
                <CountUp
                  start={hoveredIndex === index ? 0 : type.count}
                  end={type.count}
                  duration={2}
                  redraw={true}
                />
                &nbsp;uploads
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
