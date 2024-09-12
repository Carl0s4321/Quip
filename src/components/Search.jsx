import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Search = ({placeholder}) => {
  return (
    <form className="flex justify-center border-2 rounded-md p-2 shadow-md flex-1 bg-white px-5">
        <input type="text" placeholder={placeholder} className="flex-1 outline-none p-2"/>
        <button type="submit">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="h-7 w-7 text-lightBlue"/>
        </button>
    </form>
  )
}

export default Search;