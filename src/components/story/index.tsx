import { useEffect } from 'react';
import Stories from '@/components/react-insta-stories';
import { TStorySet, renderStories } from '@/helpers/story-data';
import useStoriesStore from '@/store/useStoriesStore';

type TStoryProps = {
  isPlaying: boolean
  currentSlide?: number
  storySet: TStorySet
  switchToNextStory?: () => void
}

export default function StoriesComponent({ isPlaying, currentSlide, storySet, switchToNextStory }: TStoryProps) {
  const { watchedStories, incrementWatchedStories } = useStoriesStore()

  useEffect(() => {
    if (history && history.state) {
      history.pushState({ hash: storySet.hash }, "")
    }
  }, [storySet.hash])

  const calculateCurrentIndex = () => {
    if (currentSlide)
      return currentSlide

    const indexFetchedFromLocalStorage = watchedStories[storySet.hash]
    if (indexFetchedFromLocalStorage) {
      if (indexFetchedFromLocalStorage >= storySet.stories.length - 1) {
        console.log("All stories watched, restarting from beginning", indexFetchedFromLocalStorage)
      }
      else {
        return indexFetchedFromLocalStorage
      }
    }

    return 0
  }

  return (
    <div className='h-full w-full'>
      <Stories
        currentIndex={calculateCurrentIndex()}
        isPaused={!isPlaying}
        stories={renderStories(storySet.stories)}
        defaultInterval={2500}
        onStoryStart={(currIndex: number, b: object) => {
          if (isPlaying) {
            history.replaceState(null, "", '/')
            history.replaceState(null, "", `${storySet.hash}/story-${currIndex + 1}`)
          }
        }}
        onStoryEnd={(currIndex: number, b: object) => {
          console.log(watchedStories)
          console.log(currIndex, watchedStories[storySet.hash])
          if (currIndex >= watchedStories[storySet.hash]) {
            incrementWatchedStories(storySet.hash)
          }
        }}
        onAllStoriesEnd={() => {
          console.log("switchToNextStories called")
          !!switchToNextStory && switchToNextStory()
        }}
        height="100%"
        width="100%"
      />
    </div>
  )
}