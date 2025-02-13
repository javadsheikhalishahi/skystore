
import ActionDropdown from '@/components/ActionDropdown';
import { Chart } from '@/components/Chart';
import FormattedDateTime from '@/components/FormattedDateTime';
import Thumbnail from '@/components/Thumbnail';
import { Separator } from '@/components/ui/separator';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.action';
import { convertFileSize, getUsageSummary } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Models } from 'node-appwrite';

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);
  
  return (
    <div className='container-dash'>
      <section>
        <Chart used={totalSpace.used} />

        <ul className='summary-list-dash'>
          {usageSummary.map((summary) => (
            <Link 
              href={summary.url}
              key={summary.title}
              className='summary-card-dash'
            >
              <div className='space-y-4'>
                <div className='flex justify-between gap-3'>
                  <Image 
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt='image uploaded'
                    className='summary-icon'
                    />
                    <h4 className='summary-size'>
                      {convertFileSize(summary.size) || 0}
                    </h4>
                </div>
              
                <h5 className='summary-title'>
                   {summary.title}
                </h5>
                <Separator className='bg-light-400' />
                <FormattedDateTime
                  date={summary.latestDate}
                  className='text-center'
                />
              </div>
              </Link>
          ))}
        </ul>
      </section>

      <section className='recent-files-dash'>
        <h2 className='text-[20px] leading-[28px] font-semibold xl:h2 text-light-100'>
          Recent files Uploaded
        </h2>
        {files.documents.length > 0 ? (
          <ul className='flex flex-col mt-5 gap-5'>
            {files.documents.map((file: Models.Document) => (
              <Link 
               href={file.url}
               target='_blank'
               className='flex items-center gap-3'
               key={file.$id}
              >
                <Thumbnail 
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className='recent-file-details'>
                  <div className='flex flex-col gap-1'>
                    <p className='recent-file-name'>
                       {file.name}
                    </p>
                    <FormattedDateTime 
                       date={file.$createdAt}
                       className='text-[12px] leading-[16px] font-normal'
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className='empty-list2'> No files uploaded!!</p>
        )}
        
      </section>
    </div>
  )
}

export default Dashboard
