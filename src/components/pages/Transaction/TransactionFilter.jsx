
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

export default function TransactionFilter({ filter, setFilter }) {
  const [searchTerm, setSearchTerm] = useState(filter);

  // debounce: prevents too many state updates while typing
  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter(searchTerm);
    }, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, setFilter]);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4">
      <div className="w-full sm:w-auto">
        <Label htmlFor="search" className="sr-only">
          Search transactions
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
      </div>
    </div>
  );
}


