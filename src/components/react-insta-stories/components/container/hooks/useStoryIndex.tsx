import { SetStateAction, useCallback, useState } from "react";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";
import { STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";

export default function useStoryIndex(toggleState: (action: string, bufferAction?: boolean) => void) {
  const { stories } = useStoriesContext();
  const { loop, onAllStoriesEnd } = useFactsStore(state => ({
    loop: state.loop,
    onAllStoriesEnd: state.onAllStoriesEnd,
  }));
  const [currentId, setCurrentId] = useState<number>(0);

  const setCurrentIdWrapper = useCallback((callback: SetStateAction<number>) => {
    setCurrentId(callback);
    toggleState(STORY_STATE_TYPE.PAUSE, true);
  }, [toggleState])

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
    setCurrentIdWrapper,
    updateNextStoryIndex
  }
}