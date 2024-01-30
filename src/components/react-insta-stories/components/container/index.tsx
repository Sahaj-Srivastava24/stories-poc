import "./container.css"
import { useState, useRef, useEffect } from "react";
import Story from "@/components/react-insta-stories/components/Story";
import ProgressContext from "@/components/react-insta-stories/context/Progress";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import useIsMounted from "@/components/react-insta-stories/util/use-is-mounted";
import { usePreLoader } from "@/components/react-insta-stories/util/usePreLoader";
import { useStoriesContext } from "@/components/react-insta-stories/context/Stories";
import ProgressArray from "@/components/react-insta-stories/components/ProgressArray";
import useKeyboardNavigation from "./hooks/useKeyboardNavigation";

export default function Container() {
  const [pause, setPause] = useState<boolean>(true);
  const [currentId, setCurrentId] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [bufferAction, setBufferAction] = useState<boolean>(true);
  const isMounted = useIsMounted();

  let mousedownId = useRef<any>();

  const {
    width,
    height,
    loop,
    currentIndex,
    isPaused,
    preventDefault,
    onAllStoriesEnd,
    onPrevious,
    onNext,
    preloadCount,
    setContextValues
  } = useFactsStore();
  const { stories } = useStoriesContext();


  usePreLoader(stories, currentId, preloadCount);
  useKeyboardNavigation()

  useEffect(() => {
    setContextValues({
      pauseStory,
      nextStory: next,
      previousStory: previous
    })
  }, [])

  useEffect(() => {
    if (typeof currentIndex === "number") {
      if (currentIndex >= 0 && currentIndex < stories.length) {
        setCurrentIdWrapper(() => currentIndex);
      } else {
        console.error(
          "Index out of bounds. Current index was set to value more than the length of stories array.",
          currentIndex
        );
      }
    }
  }, [currentIndex]);


  useEffect(() => {
    if (typeof isPaused === "boolean") {
      setPause(isPaused);
    }
  }, [isPaused]);

  const toggleState = (action: string, bufferAction?: boolean) => {
    setPause(action === "pause");
    setBufferAction(!!bufferAction);
  };

  const setCurrentIdWrapper = (callback) => {
    setCurrentId(callback);
    toggleState("pause", true);
  };

  const pauseStory = () => {
    toggleState("pause")
  }

  const previous = () => {
    if (onPrevious != undefined) {
      onPrevious();
    }
    setCurrentIdWrapper((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const next = () => {
    onNext()
    // Check if component is mounted - for issue #130 (https://github.com/mohitk05/react-insta-stories/issues/130)
    if (isMounted()) {
      if (loop) {
        updateNextStoryIdForLoop();
      } else {
        updateNextStoryId();
      }
    }
  };

  const updateNextStoryIdForLoop = () => {
    setCurrentIdWrapper((prev) => {
      if (prev >= stories.length - 1) {
        onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      }
      return (prev + 1) % stories.length;
    });
  };

  const updateNextStoryId = () => {
    setCurrentIdWrapper((prev) => {
      if (prev < stories.length - 1) return prev + 1;
      onAllStoriesEnd && onAllStoriesEnd(currentId, stories);
      return prev;
    });
  };

  const debouncePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    mousedownId.current = setTimeout(pauseStory, 200);
  };

  const mouseUp =
    (type: string) => (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      mousedownId.current && clearTimeout(mousedownId.current);
      if (pause) {
        toggleState("play");
      } else {
        type === "next" ? next() : previous();
      }
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
          next,
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
            style={{ width: "50%", zIndex: 999 }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp("previous")}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp("previous")}
          />
          <div
            style={{ width: "50%", zIndex: 999 }}
            onTouchStart={debouncePause}
            onTouchEnd={mouseUp("next")}
            onMouseDown={debouncePause}
            onMouseUp={mouseUp("next")}
          />
        </div>
      )}
    </div>
  );
}