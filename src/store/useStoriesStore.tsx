import safeLocalStorage from '@/helpers/safe-local-stoage';
import { create } from 'zustand';

interface StoriesStore {
  watchedStories: Record<string, number>;
  initStore: (storySetIds: string[]) => void
  incrementWatchedStories: (storySetId: string) => void;
}

const onLocalStorageNotAvailable = () => {
  console.warn("LOCAL-STORAGE:: local storage not available")
  return "{}"
}


const useStoriesStore = create<StoriesStore>((set, get) => ({
  watchedStories: {},
  initStore: (storySetIds: string[]) => {
    set((state) => {
      if(Object.keys(state.watchedStories).length > 0) {
        // console.info("LOCAL-STORAGE:: We have some old cache for now, aborting initStore")
        return state
      }

      //  When we dont have user data.
      const updatedWatchedStories = {} as Record<string, number>;
      storySetIds.forEach(id => {
        updatedWatchedStories[id] = 0
      })

      return { watchedStories: updatedWatchedStories }
    })
  },
  incrementWatchedStories: (storySetId: string) => {
    set((state) => {
      const updatedWatchedStories = { ...state.watchedStories };
      updatedWatchedStories[storySetId] = (updatedWatchedStories[storySetId] ?? 0) + 1;

      safeLocalStorage.set('qzp_watched_stories', JSON.stringify(updatedWatchedStories), onLocalStorageNotAvailable);

      return { watchedStories: updatedWatchedStories };
    });
  },
}));

export default useStoriesStore;
