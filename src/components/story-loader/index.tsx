import Stories from 'react-insta-stories';

export default function StoryLoader() {

  return (
    <Stories
      isPaused={true}
      stories={[{
        content: () => {
          return (
            <div className='flex items-center bg-slate-100'>
              loading
            </div>
          )
        }
      }]}
      defaultInterval={2500}
      height="100%"
      width="inherit"
    />
  )
}