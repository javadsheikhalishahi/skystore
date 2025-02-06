import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.action";
import { Models } from "node-appwrite";

const page = async ({ params }: SearchParamProps) => {
    const type = ((await params)?.type as string) || "";
    const files = await getFiles();

  return (
    <div className="container-pages">
     <section className="w-full">
        <h1 className="capitalize text-[34px] leading-[42px] font-bold">{type}</h1>

        <div className="section-total-size">
            <p className="text-[16px] leading-[24px] font-normal">
                Total: <span className="text-[16px] leading-[24px] font-semibold">0 MB</span>
            </p>

            <div className="container-sorts">
                <p className="text-[16px] leading-[24px] font-normal hidden sm:block text-light-200">Sort by:</p>
                <Sort />
            </div>
        </div>
     </section>
     {files.total > 0 ? (
        <section className="files-list">
           {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
           ))}
        </section>
     ): <p className="empty-list">No files Uploaded</p>}
    </div>
  )
}

export default page
