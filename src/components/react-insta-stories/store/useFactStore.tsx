import React, { CSSProperties } from 'react'
import { create } from 'zustand';
import { Story } from '../interfaces';


type NumberOrString = number | string

export type TFactsStore = {
  loop: boolean;
  stories: Story[]
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

  setContextValues: (defaultProps: TPartialFactsStore) => void
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
  preventDefault: true,
  preloadCount: 1,
  stories: [],

  setContextValues: (defaultProps: TPartialFactsStore) => set((state) => ({
    ...defaultProps,
    ...state
  }))
}));

export default useFactsStore;
