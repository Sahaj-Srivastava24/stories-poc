import "./container.css"
import { useState, useEffect, useCallback } from "react";
import Story from "@/components/react-insta-stories/components/Story";
import ProgressContext from "@/components/react-insta-stories/context/Progress";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import useIsMounted from "@/components/react-insta-stories/util/use-is-mounted";
import { usePreLoader } from "@/components/react-insta-stories/util/usePreLoader";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";
import ProgressArray from "@/components/react-insta-stories/components/ProgressArray";
import useKeyboardNavigation from "@/components/react-insta-stories/components/container/hooks/useKeyboardNavigation";
import useStoryPause from "@/components/react-insta-stories/components/container/hooks/useStoryPause";
import useStoryIndex from "@/components/react-insta-stories/components/container/hooks/useStoryIndex";
import Overlay from "@/components/react-insta-stories/components/container/Overlay";

export default function Container() {
  const factStore = useFactsStore(state => ({
    containerStyles: {
      width: state.width,
      height: state.height
    },
    onNext: state.onNext,
    onPrevious: state.onPrevious,
    setContextValues: state.setContextValues
  }));

  const isMounted = useIsMounted();
  const { stories } = useStoriesContext();
  const { onNext, onPrevious, setContextValues } = factStore;
  const { pause, toggleState, bufferAction } = useStoryPause();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const { currentId, setCurrentIdWrapper, updateNextStoryIndex } = useStoryIndex(toggleState)

  useKeyboardNavigation()
  usePreLoader(stories, currentId);

  const previousStory = useCallback(() => {
    onPrevious();
    setCurrentIdWrapper((prev: number) => (prev > 0 ? prev - 1 : prev));
  }, [onPrevious, setCurrentIdWrapper])

  const nextStory = useCallback(() => {
    onNext();
    isMounted() && updateNextStoryIndex()
  }, [isMounted, onNext, updateNextStoryIndex])

  // This sets the helper functions so that we can use it later
  // Also dont add these functions to deps, that causes infinite rendering.
  useEffect(() => {
    setContextValues({
      nextStory,
      previousStory
    })
  }, [setContextValues])


  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000);
  };

  return (
    <div className="container" style={{ ...factStore.containerStyles }}>
      <ProgressContext.Provider
        value={{
          bufferAction: bufferAction,
          videoDuration: videoDuration,
          currentId,
          pause,
          next: nextStory,
        }}
      >
        <ProgressArray />
      </ProgressContext.Provider>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        story={stories[currentId]}
        getVideoDuration={getVideoDuration}
      />
      <Overlay pause={pause} />
    </div>
  );
}