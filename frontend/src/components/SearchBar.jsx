import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
function SearchBar() {
    return(
        <div className="flex w-full justify-center m-5">
            <div className="relative w-1/2 flex items-center">
                <FontAwesomeIcon className="absolute left-4 text-xl text-gray-500"icon={faMagnifyingGlass}/>
                <input className="w-full outline-none py-3 pl-12 rounded-full" type="text" placeholder="Search a board..."/>
            </div>
        </div>
    )
}

export default SearchBar