import { TStorySet } from "@/helpers/story-data";

export function handleShallowRouting(pathname: string, storySet: TStorySet, currIndex: number) {
  // console.log(pathname)
  if (pathname === '/') {
    history.pushState({}, '', "/")
    history.replaceState(null, '', `${storySet.hash}/story-${currIndex + 1}`)
  }
  else {
    history.replaceState(null, '', `${pathname}/${storySet.hash}/story-${currIndex + 1}`)
  }
}