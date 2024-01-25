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

  function renderStorySet() {

    return structuredStories.map((storySet, index) => {
      return (
        <div
          key={index}
          className="image-full absolute"
          style={{
            transform: `rotateY(${index * theta
              }deg) translateZ(${radius}px)`,
          }}
        >
          {currentStory === index ? (
            <StoriesComponent
              isPlaying={currentStory === index}
              storySet={storySet}
              switchToNextStory={() => {
                console.log("switchToNextStory called")
                console.log("exceeded", currentStory, structuredStories.length - 1)
                if (currentStory < structuredStories.length - 1)
                  nextStory(currentStory)
              }}
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