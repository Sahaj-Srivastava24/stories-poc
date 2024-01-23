import Stories from 'react-insta-stories';
import { TStorySet, renderStories } from '@/helpers/story-data';
import { TImageMapping } from '@/entities/images';
import { useEffect } from 'react';

type TStoryProps = {
  isPlaying: boolean
  storySet: TStorySet
  switchToNextStory: () => void
}

export default function StoriesComponent({ isPlaying, storySet, switchToNextStory }: TStoryProps) {

  useEffect(() => {
    // isPlaying && !!history.state && history.replaceState(null, "", `${storySet.hash}`)
  }, [isPlaying, storySet.hash])

  console.log(isPlaying)

  if (!isPlaying) {
    return (
      <Stories
        isPaused={true}
        stories={[{
          content: () => {
            return (
              <div className='bg-slate-100'>
                loading
              </div>
            )
          }
        }]}
        defaultInterval={2500}
        height="100%"
        width="inherit"
      />
    )
  }
  return (
    <div className='h-full w-full'>
      <Stories
        isPaused={!isPlaying}
        stories={renderStories(storySet.stories)}
        defaultInterval={2500}
        onStoryStart={(currIndex: number, b: object) => {
          isPlaying && history.replaceState(null, "", `story-${currIndex}`)
        }}
        // onAllStoriesEnd={switchToNextStory}
        height="100%"
        width="inherit"
        preloadCount={3}
      />
    </div>
  )
}