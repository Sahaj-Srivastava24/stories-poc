import CarouselWrapper from "./Wrapper";
import { useCarousel } from "./useCarousel";
import StoryWrapper from "../story-wrapper";
import NavigationWrapper from "../navigation";
import { structuredStories } from "@/helpers/story-data";

export const Carousel = () => {

  const {
    radius,
    cellSize,
    nextStory,
    prevStory,
    carouselRef,
    currentStory,
  } = useCarousel(structuredStories);

  return (
    <NavigationWrapper
      show={false} // false to not show navigation button
      nextCallback={nextStory}
      currentStory={currentStory}
      previousCallback={prevStory}
    >
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
    </NavigationWrapper>
  );
};
