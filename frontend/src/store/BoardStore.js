import {create} from 'zustand';

const useBoardStore = create((set) => ({
  searchString: '',
  setSearchString: (searchString) => set({ searchString }),
  clearSearchString: () => set({ searchString: null }),
}));

export default useBoardStore;
