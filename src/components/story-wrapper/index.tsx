import { structuredStories } from "@/helpers/story-data";
import StoryLoader from "../story-loader";
import StoriesComponent from "../story";
import { theta } from "../carousel/constants";

type WrapperProps = {
  currentStory: number
  radius: number
  nextStory: (currentStoryIndex: number) => void
}

export default function StoryWrapper({ currentStory, radius, nextStory }: WrapperProps) {
  const translateCls = `translateZ(${radius}px)`

  function renderStorySet() {
    return structuredStories.map((storySet, index) => {
      const rotateYCls = `rotateY(${index * theta}deg)`
      const styleObject = {
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
              isPlaying={currentStory === index}
              switchToNextStory={switchToNextStory}
            />
          ) : (
            <StoryLoader />
          )}
        </div>
      )
    })
  }

  return (
    <>
      {renderStorySet()}
    </>
  )
}