import { Search } from "lucide-react";
import PropTypes from "prop-types";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <label className="glass flex items-center gap-3 rounded-xl px-4 py-3">
      <Search className="h-4 w-4 text-white/40" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-white/35"
      />
    </label>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};
