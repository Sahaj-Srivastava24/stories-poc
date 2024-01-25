import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { handleShallowRouting } from './util';
import { TStorySet } from "@/helpers/story-data";


export default function useShallowRouting(isPlaying: boolean) {
  const pathname = usePathname()
  const rootPathName = useRef<string>(pathname)

  const routeToCurrentStory = (storySet: TStorySet, currIndex: number) => {
    isPlaying && handleShallowRouting(rootPathName.current, storySet, currIndex)
  }

  useEffect(() => {
    isPlaying && history.pushState({}, '', rootPathName.current)
  }, [isPlaying])

  return {
    routeToCurrentStory
  }
}