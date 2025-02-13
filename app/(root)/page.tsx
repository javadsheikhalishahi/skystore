import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.action';

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);
  
  return (
    <div>
      
    </div>
  )
}

export default Dashboard
