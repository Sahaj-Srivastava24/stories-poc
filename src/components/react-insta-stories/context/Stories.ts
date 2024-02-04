import { createContext, useContext } from 'react';
import { StoriesContext } from '@/components/react-insta-stories/interfaces';

const StoriesContext = createContext<StoriesContext>({
	stories: [],
});

export const useStoriesContext = () => {
	return useContext<StoriesContext>(StoriesContext)
}

export default StoriesContext;