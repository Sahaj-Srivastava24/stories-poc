import { STORY_STATE_TYPE } from "@/components/react-insta-stories/interfaces";
import useFactsStore from "@/components/react-insta-stories/store/useFactStore";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function useStoryPause() {
  // const { isPaused, setContextValues } = useFactsStore(useShallow(state => ({
  //   isPaused: state.isPaused,
  //   setContextValues: state.setContextValues,
  // })));

  // const [pause, setPause] = useState<boolean>(isPaused);
  const [pause, setPause] = useState<boolean>(true);
  const [bufferAction, setBufferAction] = useState<boolean>(true);

  // Syncs the user defined `isPaused` with library specific `pause`
  // useEffect(() => {
  //   if (typeof isPaused === "boolean") {
  //     setPause(isPaused);
  //   }
  // }, [isPaused]);

  // This sets the helper functions so that we can use it later
  // useEffect(() => {
  //   setContextValues({
  //     playStory,
  //     pauseStory,
  //   })
  // }, [])

  const toggleState = (action: string, bufferAction?: boolean) => {
    console.log("toggle state", action)
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
    console.log("play story was called")
    if (!pause) {
      console.log("stories are already playing")
      return
    }
    toggleState(STORY_STATE_TYPE.PLAY)
  }

  return {
    storyNavigation: { playStory, pauseStory },
    pause,
    toggleState,
    bufferAction,
  }
}