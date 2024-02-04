import { STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { useEffect, useState } from "react";

export default function useStoryPause() {
  const [pause, setPause] = useState<boolean>(true);
  const { isPaused, setContextValues } = useFactsStore();
  const [bufferAction, setBufferAction] = useState<boolean>(true);

  // Syncs the user defined `isPaused` with library specific `pause`
  useEffect(() => {
    if (typeof isPaused === "boolean") {
      setPause(isPaused);
    }
  }, [isPaused]);

  // This sets the helper functions so that we can use it later
  useEffect(() => {
    setContextValues({
      playStory,
      pauseStory,
    })
  }, [])

  const toggleState = (action: string, bufferAction?: boolean) => {
    setPause(action === "pause");
    setBufferAction(!!bufferAction);
  };

  const pauseStory = () => {
    if (pause) {
      console.log("stories are already paused")
      return
    }
    toggleState(STORY_STATE_TYPE.PAUSE)
  }

  const playStory = () => {
    if (!pause) {
      console.log("stories are already playing")
      return
    }
    toggleState(STORY_STATE_TYPE.PLAY)
  }

  return {
    pause,
    toggleState,
    bufferAction,
  }
}