"use client"

import NavigationButton from "@/components/navigation";
import StoriesComponent from "@/components/story";
import { TStorySet, structuredStories } from "@/helpers/story-data";
import useStories from "@/hooks/useStories";
import { useEffect, useRef, useState } from "react";


export default function Home() {
  const {
    storyData,
    prevStorySet,
    nextStorySet,
    currentStory,
    storyViewedRef,
    currentStorySet
  } = useStories(structuredStories)

  return (
    <div className="flex items-center justify-center md:gap-10 h-screen w-full">
      <NavigationButton
        cls="hidden md:block"
        text={"←"}
        cb={() => {
          prevStorySet()
          console.log("prev clicked")
        }}
      />
      <div className="h-screen w-screen md:h-[70%] md:w-[40%] md:max-w-[400px]">
        <StoriesComponent
          storySet={storyData}
          currentSlide={currentStory}
          onStoryEnd={() => {
            console.log(storyViewedRef.current, currentStorySet.current)
            storyViewedRef.current[currentStorySet.current] = storyViewedRef.current[currentStorySet.current] + 1
          }}
          switchToNextStory={nextStorySet}
        />
      </div>
      <NavigationButton
        cls="hidden md:block"
        text={"→"}
        cb={() => {
          nextStorySet()
          console.log("next clicked")
        }}
      />
    </div >
  );
}
