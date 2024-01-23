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
                if (currentStory < structuredStories.length - 1)
                  nextStory(currentStory)
                else console.log('dallle')
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