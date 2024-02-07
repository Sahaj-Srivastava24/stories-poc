import { useShallow } from "zustand/react/shallow";
import { useEffect, useRef, useState } from "react";
import { STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";

export default function useStoryPause() {
  const { isPaused, setContextValues } = useFactsStore(useShallow(state => ({
    isPaused: state.isPaused,
    setContextValues: state.setContextValues,
  })));

  const [pause, setPause] = useState<boolean>(isPaused);
  const setFunctionsToGlobalStore = useRef<boolean>(false)
  const [bufferAction, setBufferAction] = useState<boolean>(true);

  // Syncs the user defined `isPaused` with library specific `pause`
  useEffect(() => {
    if (typeof isPaused === "boolean" && isPaused !== pause) {
      setPause(isPaused);
    }

  }, [isPaused, pause]);

  useEffect(() => {
    if(!setFunctionsToGlobalStore.current){
      setContextValues({
        playStory,
        pauseStory,
      }) 
      setFunctionsToGlobalStore.current = true
    }
  }, [])

  const toggleState = (action: string, newBufferAction?: boolean) => {
    console.log("toggle state", action, action === "pause")

    if(action === STORY_STATE_TYPE.PAUSE && pause){
      console.warn("REACT-INSTA-STORIES:: stories are already paused")
    }
    else if (action === STORY_STATE_TYPE.PLAY && !pause) {
      console.warn("REACT-INSTA-STORIES:: stories are already playing")
    }
    else {
      setPause(action === STORY_STATE_TYPE.PAUSE);
    }

    if(!!newBufferAction && newBufferAction !== bufferAction){
      setBufferAction(bufferAction);
    }
  };

  const pauseStory = () => {
    console.log("inside pausestory", pause)
    toggleState(STORY_STATE_TYPE.PAUSE)
  }

  const playStory = () => {
    console.log("inside playstory", pause)
    toggleState(STORY_STATE_TYPE.PLAY)
  }

  return {
    pause,
    toggleState,
    bufferAction,
  }
}