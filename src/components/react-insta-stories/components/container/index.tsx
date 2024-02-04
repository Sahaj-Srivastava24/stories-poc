import "./container.css"
import { useState, useRef, useEffect, SetStateAction } from "react";
import Story from "@/components/react-insta-stories/components/Story";
import ProgressContext from "@/components/react-insta-stories/context/Progress";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import useIsMounted from "@/components/react-insta-stories/util/use-is-mounted";
import { usePreLoader } from "@/components/react-insta-stories/util/usePreLoader";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";
import ProgressArray from "@/components/react-insta-stories/components/ProgressArray";
import useKeyboardNavigation from "@/components/react-insta-stories/components/container/hooks/useKeyboardNavigation";
import { MOUSE_CALLBACK_TYPE, STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";
import useMouseInteraction from "@/components/react-insta-stories/components/container/hooks/useMouseInteractions";
import useStoryPause from "@/components/react-insta-stories/components/container/hooks/useStoryPause";
import useStoryIndex from "@/components/react-insta-stories/components/container/hooks/useStoryIndex";

export default function Container() {
  const {
    width,
    height,
    onNext,
    onPrevious,
    preloadCount,
    preventDefault,
    setContextValues
  } = useFactsStore();
  const isMounted = useIsMounted();
  const { stories } = useStoriesContext();
  const { storyNavigation, pause, toggleState, bufferAction } = useStoryPause();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const { debouncePause, handleMouseUp } = useMouseInteraction(pause)
  const { currentId, setCurrentId, updateNextStoryIndex } = useStoryIndex(setCurrentIdWrapper)

  useKeyboardNavigation()
  usePreLoader(stories, currentId, preloadCount);

  // This sets the helper functions so that we can use it later
  useEffect(() => {
    console.log(nextStory, previousStory)
    setContextValues({
      nextStory: nextStory,
      previousStory: previousStory
    })
  }, [])

  function setCurrentIdWrapper(callback: SetStateAction<number>) {
    setCurrentId(callback);
    toggleState(STORY_STATE_TYPE.PAUSE, true);
  };

  const previousStory = () => {
    onPrevious(); // We have default functions, so we dont have to check if they're undefined
    setCurrentIdWrapper((prev: number) => (prev > 0 ? prev - 1 : prev));
  };

  const nextStory = () => {
    onNext(); // We have default functions, so we dont have to check if they're undefined
    // Check if component is mounted - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
    isMounted() && updateNextStoryIndex()
  };

  const getVideoDuration = (duration: number) => {
    setVideoDuration(duration * 1000);
  };

  return (
    <div className="container" style={{ width, height }}>
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
      {!preventDefault && (
        <div className="overlay">
          <div
            className="overlay__pane"
            onTouchStart={debouncePause}
            onTouchEnd={handleMouseUp(MOUSE_CALLBACK_TYPE.PREVIOUS)}
            onMouseDown={debouncePause}
            onMouseUp={handleMouseUp(MOUSE_CALLBACK_TYPE.PREVIOUS)}
          />
          <div
            className="overlay__pane"
            onTouchStart={debouncePause}
            onTouchEnd={handleMouseUp(MOUSE_CALLBACK_TYPE.NEXT)}
            onMouseDown={debouncePause}
            onMouseUp={handleMouseUp(MOUSE_CALLBACK_TYPE.NEXT)}
          />
        </div>
      )}
    </div>
  );
}