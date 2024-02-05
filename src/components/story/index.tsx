import { useEffect } from 'react';
import Stories from '@/components/react-insta-stories';
import { TStorySet, renderStories } from '@/helpers/story-data';
import useStoriesStore from '@/store/useStoriesStore';

type TStoryProps = {
  isPaused: boolean
  currentSlide?: number
  storySet: TStorySet
  switchToNextStory?: () => void
}

export default function StoriesComponent({ isPaused, currentSlide, storySet, switchToNextStory }: TStoryProps) {
  const { watchedStories, incrementWatchedStories } = useStoriesStore()

  useEffect(() => {
    if (history && history.state) {
      history.pushState({ hash: storySet.hash }, "")
    }
  }, [storySet.hash])

  const calculateCurrentIndex = () => {
    if (currentSlide)
      return currentSlide

    if (!!watchedStories ?? watchedStories[storySet.hash]) {
      const indexFetchedFromLocalStorage = watchedStories[storySet.hash]
      if (indexFetchedFromLocalStorage >= storySet.stories.length - 1)
        console.warn("CAROUSEL-ANIMATION:: All stories watched, restarting from beginning", indexFetchedFromLocalStorage)
      else return indexFetchedFromLocalStorage

    }
    return 0
  }

  return (
    <div className='h-full w-full'>
      <Stories
        currentIndex={calculateCurrentIndex()}
        isPaused={isPaused}
        stories={renderStories(storySet.stories)}
        defaultInterval={2500}
        onStoryStart={(currIndex: number, b: object) => {
          if (isPaused) {
            history.replaceState(null, "", '/')
            history.replaceState(null, "", `${storySet.hash}/story-${currIndex + 1}`)
          }
        }}
        onStoryEnd={(currIndex: number, b: object) => {
          if (currIndex >= watchedStories[storySet.hash]) {
            incrementWatchedStories(storySet.hash)
          }
        }}
        onAllStoriesEnd={() => {
          console.info("CAROUSEL-ANIMATION:: switchToNextStories called")
          !!switchToNextStory && switchToNextStory()
        }}
        height="100%"
        width="100%"
      />
    </div>
  )
}