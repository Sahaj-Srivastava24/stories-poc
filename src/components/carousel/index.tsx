import { useCarousel } from "./useCarousel";
import StoriesComponent from "../story";
import { structuredStories } from "@/helpers/story-data";
import { TImageMapping } from "@/entities/images";
import { useEffect } from "react";

export const Carousel = () => {

  const {
    nextImage,
    prevImage,
    nextStory,
    prevStory,
    imagePosition,
    cellSize,
    currentStory,
    carouselRef,
    radius,
  } = useCarousel(structuredStories);

  const theta = 90;

  return (
    <div className="flex items-center gap-10">
      <div className="text-white z-[100]">
        <span className="p-5" onClick={() => {
          console.log("prev clicked")
          prevStory(currentStory)
        }}>
          Prev
        </span>
      </div>
      <div
        id="container"
        style={{
          width: cellSize,
          height: "75vh",
          backgroundColor: "black",
          cursor: "pointer",
          overflow: "hidden",
        }}
        className="relative bg-transparent"
      >
        <div
          id="scene"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            perspective: 1000,
            width: "100%",
            height: "100%",
          }}
        >
          <div
            id="carousel"
            ref={carouselRef}
            className="w-full h-full absolute preserve-3d"
          >
            {structuredStories.map((storySet, index) => {
              console.log(storySet, currentStory)
              return (
                <div
                  key={index}
                  className="image-full absolute"
                  style={{
                    transform: `rotateY(${index * theta
                      }deg) translateZ(${radius}px)`,
                  }}
                >
                  <StoriesComponent
                    isPlaying={currentStory === index}
                    storySet={storySet}
                    switchToNextStory={() => {
                      if (currentStory < structuredStories.length - 1)
                        nextStory(currentStory)
                      else console.log('dallle')
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-white z-[100]">
        <span className="p-5" onClick={() => {
          console.log("prev clicked")
          nextStory(currentStory)
        }}>
          Next
        </span>
      </div>
    </div >
  );
};
