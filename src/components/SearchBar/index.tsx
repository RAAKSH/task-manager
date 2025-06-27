import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};


export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="p-4">
        <div className="relative">
        <input
          type="text"
          placeholder="Search To-Do"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
    );
  }
  