"use client";

import { getFiles } from "@/lib/actions/file.action";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import FormattedDateTime from "./FormattedDateTime";
import Thumbnail from "./Thumbnail";
import { Input } from "./ui/input";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
     const files = await getFiles({
      searchText: query
     });
     setResult(files.documents);
     setOpen(true);
    }
    fetchFiles()
  }, [query]);

  useEffect(() => {
    if(searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);

    router.push(`/${file.type === 'video' ? 'media' : file.type + 's'}?query=${query}`)
  }

  return (
    <div className="search">
      <div className="input-search-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={30}
          height={30}
        />
        <Input
          value={query}
          placeholder="Search ..."
          className="input-search"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
             {result.length > 0 ? (
              result.map((file) => (
                <li className="flex items-center justify-between" key={file.$id} onClick={() => handleClickItem(file)} >
                  <div className="cursor-pointer flex gap-4 items-center">
                      <Thumbnail className="size-8 min-w-8" type={file.type} extension={file.extension} url={file.url} />
                        <p className="text-[14px] leading-[20px] font-semibold text-light-100 line-clamp-1">{file.name}</p>
                  </div>
                  <FormattedDateTime date={file.$createdAt} className="text-[12px] leading-[16px] font-normal text-light-200 line-clamp-1" />
                </li>
              ))
             ) : <p className="result-empty"> Not found match</p>}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
