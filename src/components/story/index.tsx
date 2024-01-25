import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Stories from 'react-insta-stories';
import { TStorySet, renderStories } from '@/helpers/story-data';
import useShallowRouting from './useShallowRouting';

type TStoryProps = {
  isPlaying?: boolean
  currentSlide?: number
  storySet: TStorySet
  onStoryEnd?: () => void
  switchToNextStory?: () => void
}

export default function StoriesComponent(props: TStoryProps) {
  const {
    storySet,
    isPlaying = true,
    currentSlide,
    onStoryEnd = () => {},
    switchToNextStory = () => {}
  } = props
  const { routeToCurrentStory } = useShallowRouting(isPlaying)

  return (
    <div className='h-full w-full'>
      <Stories
        height="100%"
        width="inherit"
        isPaused={!isPlaying}
        defaultInterval={2500}
        onStoryEnd={onStoryEnd}
        currentIndex={currentSlide}
        onAllStoriesEnd={switchToNextStory}
        stories={renderStories(storySet.stories)}
        onStoryStart={(currIndex: number, b: object) => routeToCurrentStory(storySet, currIndex)}
      />
    </div>
  )
}