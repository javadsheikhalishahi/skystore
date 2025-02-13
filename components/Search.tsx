"use client";

import { getFiles } from "@/lib/actions/file.action";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
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
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 350);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResult([])
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), "" ));

      }
      setLoading(true);

     try {
      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResult(files.documents);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };
  fetchFiles();
}, [debouncedQuery]);

  useEffect(() => {
    if(!searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);

    router.push(`/${file.type === 'video' || file.type === "audio" ? 'media' : file.type + 's'}?query=${query}`)
  }

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-blue font-bold">{part}</span>
      ) : (
        part
      )
    );
  };
  
  return (
    <div className="search">
      <div className="input-search-wrapper focus-within:shadow-glow">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={30}
          height={30}
          className="transition-transform duration-300 ease-in-out hover:scale-110 active:rotate-12"
        />
        <Input
          value={query}
          placeholder="Search ..."
          className="input-search"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 300)}
        />

{open && (
  <ul className="search-result open">
    {loading ? (
      <div className="loading-spinner">
        <span className="animate-spin h-6 w-6 border-4 border-blue border-t-transparent rounded-full"></span>
      </div>
    ) : result.length > 0 ? (
      result.map((file) => (
        <li
          className="search-item flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200"
          key={file.$id}
          onClick={() => handleClickItem(file)}
        >
          <div className="flex gap-3 items-center">
            <Thumbnail
              className="size-9 min-w-9 rounded-md shadow-xl"
              type={file.type}
              extension={file.extension}
              url={file.url}
            />
            <div>
              <p className="file-name text-sm font-semibold text-gray-900 ">
                {highlightText(file.name, query)}
              </p>
              <p className="file-type text-xs text-gray-500 ">
                {file.type.toUpperCase()}
              </p>
            </div>
          </div>
          <FormattedDateTime
            date={file.$createdAt}
            className="text-xs text-gray-500 "
          />
        </li>
      ))
    ) : (
      <p className="result-empty animate-caret-blink">No matching results found</p>
    )}
  </ul>
)}

      </div>
    </div>
  );
};

export default Search;
