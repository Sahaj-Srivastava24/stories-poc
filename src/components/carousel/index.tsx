import { useCarousel } from "./useCarousel";
import { structuredStories } from "@/helpers/story-data";
import StoryWrapper from "../story-wrapper";
import CarouselWrapper from "./Wrapper";
import NavigationButton from "../navigation";

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


  return (
    <div className="flex items-center gap-10">
      <NavigationButton
        cls="hidden md:block"
        text={"←"}
        cb={() => {
          console.log("prev clicked")
          prevStory(currentStory)
        }}
      />
      <CarouselWrapper
        cellSize={cellSize}
        carouselRef={carouselRef}
      >
        <StoryWrapper
          currentStory={currentStory}
          radius={radius}
          nextStory={nextStory}
        />
      </CarouselWrapper>
      <NavigationButton
        cls="hidden md:block"
        text={"→"}
        cb={() => {
          console.log("next clicked")
          nextStory(currentStory)
        }}
      />
    </div >
  );
};
