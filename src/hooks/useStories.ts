import { TStorySet } from "@/helpers/story-data";
import { useRef, useState } from "react";

const checkUpperBound = (index: number, len: number) => {
  return index < len
}

const checkLowerBound = (index: number) => {
  return index >= 0
}


export default function useStories(structuredStories: TStorySet[]) {
  const currentStorySet = useRef<number>(0)
  const [currentStory, setCurrentStory] = useState<number>(0)
  const STORY_SET_LENGTH = structuredStories.length - 1

  const storyViewedRef = useRef(new Array(structuredStories.length).fill(0))
  const [storyData, setStoryData] = useState<TStorySet>(structuredStories[currentStorySet.current])

  const nextStorySet = () => {
    console.log("nextStorySet called")
    if (currentStorySet.current >= STORY_SET_LENGTH) {
      console.log("No more stories available", currentStorySet.current, STORY_SET_LENGTH)
      return
    }
    currentStorySet.current = currentStorySet.current + 1
    setStoryData(structuredStories[currentStorySet.current])
    if (checkUpperBound(storyViewedRef.current[currentStorySet.current], storyData.stories.length)) {
      setCurrentStory(storyViewedRef.current[currentStorySet.current])
    }
    console.log(currentStory)
  }

  const prevStorySet = () => {
    console.log("prevStorySet called")
    if (currentStorySet.current <= 0) {
      console.log("No stories before this", currentStorySet.current, STORY_SET_LENGTH)
      return
    }
    currentStorySet.current = currentStorySet.current - 1
    setStoryData(structuredStories[currentStorySet.current])
    if (checkLowerBound(storyViewedRef.current[currentStorySet.current])) {
      setCurrentStory(storyViewedRef.current[currentStorySet.current])
    }
    setCurrentStory(storyViewedRef.current[currentStorySet.current])
    console.log(currentStory)
  }

  return {
    storyData,
    prevStorySet,
    nextStorySet,
    currentStory,
    storyViewedRef,
    currentStorySet,
  }
}