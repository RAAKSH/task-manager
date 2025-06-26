import { Search } from "lucide-react";


export default function SearchBar() {
    return (
        <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search To-Do"
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
    );
  }
  