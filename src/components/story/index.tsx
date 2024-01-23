import { useEffect } from 'react';
import Stories from 'react-insta-stories';
import { TStorySet, renderStories } from '@/helpers/story-data';

type TStoryProps = {
  isPlaying: boolean
  storySet: TStorySet
  switchToNextStory: () => void
}

export default function StoriesComponent({ isPlaying, storySet, switchToNextStory }: TStoryProps) {

  useEffect(() => {
    if (history && history.state) {
      history.pushState({ hash: storySet.hash }, "")
    }
  }, [storySet.hash])

  // console.log(isPlaying)

  return (
    <div className='h-full w-full'>
      <Stories
        isPaused={!isPlaying}
        stories={renderStories(storySet.stories)}
        defaultInterval={2500}
        onStoryStart={(currIndex: number, b: object) => {
          if (isPlaying) {
            history.replaceState(null, "", '/')
            history.replaceState(null, "", `${storySet.hash}/story-${currIndex + 1}`)
          }
        }}
        onAllStoriesEnd={switchToNextStory}
        height="100%"
        width="inherit"
        preloadCount={3}
      />
    </div>
  )
}