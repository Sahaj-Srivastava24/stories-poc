import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";

export default function useStoryPause() {
  const { isPaused, setContextValues } = useFactsStore(useShallow(state => ({
    isPaused: state.isPaused,
    setContextValues: state.setContextValues,
  })));

  const [pause, setPause] = useState<boolean>(isPaused);
  const [bufferAction, setBufferAction] = useState<boolean>(true);

  // Syncs the user defined `isPaused` with library specific `pause`
  useEffect(() => {
    if (typeof isPaused === "boolean") {
      setPause(isPaused);
    }

    setContextValues({
      playStory,
      pauseStory,
    })
  }, [isPaused, setContextValues]);

  const toggleState = (action: string, bufferAction?: boolean) => {
    console.log("toggle state", action, action === "pause")
    setPause(action === "pause");
    setBufferAction(!!bufferAction);
  };

  const pauseStory = () => {
    if (pause) {
      console.warn("REACT-INSTA-STORIES:: stories are already paused")
      return
    }
    toggleState(STORY_STATE_TYPE.PAUSE)
  }

  const playStory = () => {
    console.info("REACT-INSTA-STORIES:: play story was called")
    if (!pause) {
      console.warn("REACT-INSTA-STORIES:: stories are already playing")
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