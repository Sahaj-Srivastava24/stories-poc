import React, { CSSProperties } from 'react'
import { create } from 'zustand';


type NumberOrString = number | string

export type TFactsStore = {
  loop: boolean;
  nextStory?: Function
  pauseStory?: Function
  playStory?: Function
  previousStory?: Function
  onNext: Function;
  header: Function;
  isPaused: boolean;
  loader: JSX.Element;
  currentIndex: number;
  width: NumberOrString;
  height: NumberOrString;
  onAllStoriesEnd: Function;
  storyStyles: CSSProperties;
  keyboardNavigation: boolean;
  progressStyles: CSSProperties;
  storyContainerStyles: CSSProperties;
  progressWrapperStyles: CSSProperties;
  progressContainerStyles: CSSProperties;
  storyInnerContainerStyles: CSSProperties;
  defaultInterval: number;
  onStoryStart: Function;
  onStoryEnd: Function;
  onPrevious: Function;
  preventDefault: boolean;
  preloadCount: number;

  setContextValues: (newState: TPartialFactsStore) => void
};

export type TPartialFactsStore = Partial<TFactsStore>;

const useFactsStore = create<TFactsStore>((set) => ({
  width: 360,
  height: 640,
  loader: <div>Loading...</div>,
  header: () => null,
  storyContainerStyles: {},
  storyInnerContainerStyles: {},
  storyStyles: {},
  progressContainerStyles: {},
  progressWrapperStyles: {},
  progressStyles: {},
  loop: true,
  defaultInterval: 4000,
  isPaused: false,
  currentIndex: 0,
  onStoryStart: () => {},
  onStoryEnd: () => {},
  onAllStoriesEnd: () => {},
  onNext: () => {},
  onPrevious: () => {},
  keyboardNavigation: true,
  preventDefault: false,
  preloadCount: 1,

  setContextValues: (newState: TPartialFactsStore) => set((defaultState) => ({
    ...defaultState,
    ...newState,
  }))
}));

export default useFactsStore;
