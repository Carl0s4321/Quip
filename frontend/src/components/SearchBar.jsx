import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ type, placeholder, searchString, setSearchString }) {
  return (
    <div
      className={`${
        type === "board" ? "m-5" : "m-2 pr-3"
      } flex w-full justify-center`}
    >
      <div
        className={`${
          type === "board" ? "w-1/2" : "w-full"
        } relative flex items-center`}
      >
        <input
          type="text"
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          className="w-full outline-none py-3 pl-12 rounded-full bg-gray-200"
          placeholder={placeholder}
        />

        <FontAwesomeIcon
          className="absolute left-4 text-xl text-gray-500"
          icon={faMagnifyingGlass}
        />
      </div>
    </div>
  );
}

export default SearchBar;
