import imageMappings, { TImageMapping } from "@/entities/images";
import Image from "next/image"
import { Story } from "@/components/react-insta-stories/interfaces"
import structureData from "./structureData";

export type TStorySet = {
  id: number,
  hash: `story-set-${number}`
  stories: (keyof typeof imageMappings)[]
}

const storyData = Object.keys(imageMappings)
export const structuredStories = structureData<TStorySet>(storyData)
export const storyHashes = structuredStories.map(story => story.hash)

export type Action = (action: string, bufferAction?: boolean) => void;

type ContentProps = {
  action: Action;
  isPaused: boolean;
  story: Story;
  config: {
    width?: number | string;
    height?: number | string;
    loader?: JSX.Element;
    header?: Function;
    storyStyles?: Object;
  };
  messageHandler: (type: string, data: any) => {
    ack: "OK" | "ERROR";
  };
}

export function renderStories(dataObject: TImageMapping[]): Story[] {
  const storyObject = dataObject.map((story, index) => ({
    content: (params: ContentProps) => {
      return (
        <div>
          <Image
            className='w-full h-full'
            src={imageMappings[story]}
            fill
            alt={`story-${index}`}
          />
        </div>
      )
    },
  }))

  return storyObject
}

