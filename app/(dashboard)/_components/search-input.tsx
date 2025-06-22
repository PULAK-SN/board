"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import queryString from "query-string";
import { useDebounceCallback } from "usehooks-ts";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounced = useDebounceCallback(setValue, 500);
  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          search: value,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debounced, router, value]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search boards"
        onChange={handelChange}
        defaultValue={value}
      />
    </div>
  );
};
