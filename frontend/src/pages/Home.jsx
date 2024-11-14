import Boards from "../components/BoardComponents/Boards";
import SearchBar from "../components/SearchBar";
import useBoardStore from "../store/BoardStore";

export function Home() {
  const { searchString, setSearchString } = useBoardStore();
  return (
    <div className="flex flex-col items-center p-14">
      <h1 className="text-4xl">Welcome to Quip</h1>
      <SearchBar
        type={"board"}
        placeholder={"Search a board..."}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      <Boards />
    </div>
  );
}
