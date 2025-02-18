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
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 350);
  const [loading, setLoading] = useState(false);

  // Detect screen size for mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch files based on the search query
  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResult([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }
      setLoading(true);

      try {
        const files = await getFiles({ types: [], searchText: debouncedQuery });
        setResult(files.documents);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [debouncedQuery]);

  // Clear query on empty search
  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  // Handle file selection
  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResult([]);
    router.push(`/${file.type === "video" || file.type === "audio" ? "media" : file.type + "s"}?query=${query}`);
  };

  // Highlight matching text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="text-blue-500 font-bold">{part}</span>
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
          onBlur={!isMobile ? () => setTimeout(() => setOpen(false), 300) : undefined} // Disable blur on mobile
        />

        {/* Desktop Search Results */}
        {!isMobile && open && (
          <ul className="search-result open z-50 hidden md:block">
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
                      <p className="file-name text-sm font-semibold text-gray-900">{highlightText(file.name, query)}</p>
                      <p className="file-type text-xs text-gray-500">{file.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <FormattedDateTime date={file.$createdAt} className="text-xs text-gray-500" />
                </li>
              ))
            ) : (
              <p className="result-empty animate-caret-blink">No matching results found</p>
            )}
          </ul>
        )}

        {/* Mobile Search Modal */}
        {isMobile && open && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 md:hidden"
            onClick={() => setOpen(false)} // Close modal on outside click
          >
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Search Results for "{query}"</h2>
                <button className="text-gray-500" onClick={() => setOpen(false)}>
                  ✕
                </button>
              </div>
              <ul className="max-h-60 overflow-y-auto scroll-smooth">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <span className="animate-spin h-6 w-6 border-4 border-blue border-t-transparent rounded-full"></span>
                  </div>
                ) : result.length > 0 ? (
                  result.map((file) => (
                    <li
                      className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                      key={file.$id}
                      onClick={() => handleClickItem(file)}
                    >
                      <div className="flex gap-3 items-center">
                        <Thumbnail className="size-9 min-w-9 rounded-md shadow-md" type={file.type} extension={file.extension} url={file.url} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{highlightText(file.name, query)}</p>
                          <p className="text-xs text-gray-500">{file.type.toUpperCase()}</p>
                        </div>
                      </div>
                      <FormattedDateTime date={file.$createdAt} className="text-xs text-gray-500" />
                    </li>
                  ))
                ) : (
                  <p className="py-3 text-center text-gray-500">No matching results found</p>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
