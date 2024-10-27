import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useBoardStore from '../store/BoardStore'

function SearchBar() {
  const {searchString, setSearchString} = useBoardStore();

  return (
    <div className="flex w-full justify-center m-5">
      <div className="relative w-1/2 flex items-center">
        <input
          type="text"
          onChange={(e) => setSearchString(e.target.value)}
          value={searchString}
          className="w-full outline-none py-3 pl-12 rounded-full"
          placeholder="Search a board..."
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
