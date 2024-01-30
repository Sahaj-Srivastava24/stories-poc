import safeLocalStorage from '@/helpers/sage-local-stoage';
import { create } from 'zustand';

interface StoriesStore {
  watchedStories: Record<string, number>;
  initStore: (storySetIds: string[]) => void
  incrementWatchedStories: (storySetId: string) => void;
}

const onLocalStorageNotAvailable = () => {
  console.log("local storage not available")
}


const useStoriesStore = create<StoriesStore>((set, get) => ({
  watchedStories: JSON.parse(safeLocalStorage.get('qzp_watched_stories', onLocalStorageNotAvailable)),
  initStore: (storySetIds: string[]) => {
    set((state) => {
      const updatedWatchedStories = { ...state.watchedStories };
      storySetIds.forEach(id => {
        updatedWatchedStories[id] = 0
      })

      return { watchedStories: updatedWatchedStories }
    })
  },
  incrementWatchedStories: (storySetId: string) => {
    set((state) => {
      const updatedWatchedStories = { ...state.watchedStories };
      updatedWatchedStories[storySetId] = (updatedWatchedStories[storySetId] || 0) + 1;

      safeLocalStorage.set('qzp_watched_stories', JSON.stringify(updatedWatchedStories), onLocalStorageNotAvailable);

      return { watchedStories: updatedWatchedStories };
    });
  },
}));

export default useStoriesStore;
