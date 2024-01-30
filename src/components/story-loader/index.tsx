import Stories from '@/components/react-insta-stories';

/**
 * This component is not just a loader. The `react-insta-stories` library bugs out
 * when we try to prevent a story to play unless its showed on screen. So this prevents 
 * the stories to be rendered as a whole, unless it is on screen.
 * 
 * @returns React.FC
 */
export default function StoryLoader() {
  return (
    <Stories
      isPaused={true} // this does not work
      stories={[{
        content: () => {
          return (
            <div className='shimmer' />
          )
        }
      }]}
      defaultInterval={2500}
      height="100%"
      width="inherit"
    />
  )
}