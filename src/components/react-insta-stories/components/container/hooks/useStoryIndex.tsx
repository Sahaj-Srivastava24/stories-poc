import { SetStateAction, useState } from "react";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";

export default function useStoryIndex(setCurrentIdWrapper: (callback: SetStateAction<number>) => void) {
  const { stories } = useStoriesContext();
  const { loop, onAllStoriesEnd } = useFactsStore();
  const [currentId, setCurrentId] = useState<number>(0);

  const updateNextStoryIndex = () => {
    if (loop) {
      setCurrentIdWrapper((prev: number) => {
        if (prev < stories.length - 1) return prev + 1;
        onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
        return prev;
      });
    }
    else {
      setCurrentIdWrapper((prev: number) => {
        if (prev >= stories.length - 1) {
          onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
        }
        return (prev + 1) % stories.length;
      });
    }
  }

  return {
    currentId,
    setCurrentId,
    updateNextStoryIndex
  }
}