import SearchIcon from "@/assets/SearchIcon";

interface Props {
  value: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBox = (props: Props) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="text-white w-4 h-4" />
      </div>
      <input
        type="search"
        id="search"
        className="block w-full rounded-sm border border-neutral-800 bg-neutral-900 py-1 px-2 pl-10 outline-none transition ease-in-out hover:border-b-green-600 focus:border-b-green-500"
        placeholder="Search"
        value={props.value}
        onChange={(e) => props.setSearchKey(e.target.value)}
      />
    </div>
  )
}

export default SearchBox;