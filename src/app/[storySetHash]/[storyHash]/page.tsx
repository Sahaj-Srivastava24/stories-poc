"use client"

import StoriesComponent from "@/components/story";
import { structuredStories } from "@/helpers/story-data";

type PageProps = {
  storySetHash: string
  storyHash: string
}

export default function Page({ params }: { params: PageProps }) {
  const storyData = structuredStories.find(story => story.hash === params.storySetHash)
  const storyIndex = params.storyHash.split("-")[1]
  console.log(storyIndex)

  if (!storyData) {
    return (
      <div>
        Invalid Story Hash - {params.storySetHash}/{params.storyHash}
      </div>
    )
  }
  return (
    <div className="h-[70%] w-[30vw]">
      <StoriesComponent currentSlide={parseInt(storyIndex)} isPlaying={true} storySet={storyData} />
    </div>
  )
}