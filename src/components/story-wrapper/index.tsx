import { TStorySet, storyHashes, structuredStories } from "@/helpers/story-data";
import StoryLoader from "../story-loader";
import StoriesComponent from "../story";
import { theta } from "../carousel/constants";
import { useEffect } from "react";
import useStoriesStore from "@/store/useStoriesStore";

type WrapperProps = {
  currentStory: number
  radius: number
  nextStory: (currentStoryIndex: number) => void
}

export default function StoryWrapper({ currentStory, radius, nextStory }: WrapperProps) {
  const {initStore} = useStoriesStore()

  useEffect(() => {
    initStore(storyHashes)
  }, [initStore])

  const populateStorySets = () => {
    const translateCls = `translateZ(${radius}px)`

    const renderStorySet = (storySet: TStorySet, index: number) => {
      const rotateYCls = `rotateY(${index * theta}deg)`
      const styleObject = {
        // maintain the order for these transformations!!!
        transform: `${rotateYCls} ${translateCls}`
      }

      const switchToNextStory = () => {
        if (currentStory < structuredStories.length - 1) {
          nextStory(currentStory)
        }
        else {
          console.log('No next story. Current story is ', currentStory)
        }
      }

      return (
        <div
          key={index}
          style={styleObject}
          className="image-full absolute"
        >
          {currentStory === index ? (
            <StoriesComponent
              storySet={storySet}
              // currentSlide={}
              isPlaying={currentStory === index}
              switchToNextStory={switchToNextStory}
            />
          ) : (
            <StoryLoader />
          )}
        </div>
      )
    }

    return structuredStories.map((storySet, index) => renderStorySet(storySet, index))
  }

  return (
    <>
      {populateStorySets()}
    </>
  )
}