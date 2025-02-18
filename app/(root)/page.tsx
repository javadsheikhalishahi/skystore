import ActionDropdown from "@/components/ActionDropdown";
import { CategoryChart } from "@/components/CategoryChart";
import { Chart } from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import { Leaderboard } from "@/components/Leaderboard";
import Thumbnail from "@/components/Thumbnail";
import { UploadTrendChart } from "@/components/UploadTrendChart";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.action";
import { convertFileSize, countFileTypes, getUsageSummary, groupFilesByDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Models } from "node-appwrite";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 500 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);
  const uploadTrends = groupFilesByDate(files.documents); 
  const fileTypeStats = countFileTypes(files.documents);

  const getLastUploadTime = (files: any[]) => {
    if (files.length === 0) return "No uploads";
    const lastFile = files.reduce((latest, file) =>
      new Date(file.$createdAt) > new Date(latest.$createdAt) ? file : latest
    );
    return new Date(lastFile.$createdAt).toLocaleString();
  };

  return (
    <div className="container-dash">
      <section>
        {/*First chart*/}
        <Chart used={totalSpace.used} />
        {/*Second chart*/}
        <CategoryChart usageSummary={usageSummary || []} />
        {/* Upload Trend Graph */}
        <UploadTrendChart data={uploadTrends} />

        {/* File Type Leaderboard */}
        <Leaderboard fileTypeStats={fileTypeStats} />
        <ul className="summary-list-dash">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="summary-card-dash"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="image uploaded"
                    className="summary-icon"
                  />
                  <h4 className="summary-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-title">{summary.title}</h5>
                <Separator className="bg-gray-300" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="recent-files-dash">
        {/* Quick Stats Panel */}
        
        <div className="quick-stats-panel flex flex-col sm:flex-row sm:gap-1 mt-3 mb-6">
          <div className="stat-card sm:w-1/3 w-full text-center mt-2 border-2 border-gray-300">
            <div className="icon-wrapper">
              <Image
                src="/assets/icons/total.svg"
                width={40}
                height={40}
                alt="Total Files"
                className="stat-icon"
              />
            </div>
            <h4 className="text-sm text-gray-500">Total Files Uploaded</h4>
            <p className="text-lg font-semibold mt-3">
              {files.documents.length}
            </p>
          </div>
          <div className="stat-card sm:w-1/3 w-full text-center mt-2 border-2 border-gray-300">
            <div className="icon-wrapper">
              <Image
                src="/assets/icons/upload-dashboard.svg"
                width={40}
                height={40}
                alt="Largest File"
                className="stat-icon"
              />
            </div>
            <h4 className="text-sm text-gray-500">Largest File Uploaded</h4>
            <p className="text-lg font-semibold mt-3">
              {convertFileSize(
                Math.max(
                  ...files.documents.map((file: { size: any }) => file.size)
                )
              )}
            </p>
          </div>
          <div className="stat-card sm:w-1/3 w-full text-center mt-2 border-2 border-gray-300">
            <div className="icon-wrapper">
              <Image
                src="/assets/icons/clock-square.svg"
                width={40}
                height={40}
                alt="Last Upload"
                className="stat-icon"
              />
            </div>
            <h4 className="text-sm  text-gray-500">Last Upload</h4>
            <p className="font-bold text-sm mt-6">
              {getLastUploadTime(files.documents)}
            </p>
          </div>
        </div>
        <Separator className="bg-gray-300" />
        <h2 className="text-[20px] mt-5 leading-[28px] font-semibold xl:h2 text-light-100">
          Recent files Uploaded
        </h2>

        {files.documents.length > 0 ? (
          <ul className="flex flex-col mt-5 gap-2">
            {files.documents.slice(0, 20).map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="recent-file-item"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-[12px] leading-[16px] font-normal"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list2"> No files uploaded!!</p>)}
      </section>
    </div>
  );
};

export default Dashboard;
