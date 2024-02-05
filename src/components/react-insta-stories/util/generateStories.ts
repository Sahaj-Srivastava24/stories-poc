import { getRenderer } from '@/components/react-insta-stories/util/renderers'
import { Story, StoryRenderers } from '@/components/react-insta-stories/interfaces';

const generateStories = (stories: Story[], renderers: StoryRenderers[]) => {
  return stories.map(s => {
    let story: Story = {};

    if (typeof s === 'string') {
      story.url = s;
      story.type = 'image';
    } else if (typeof s === 'object') {
      story = Object.assign(story, s);
    }

    let renderer = getRenderer(story, renderers);
    story.originalContent = story.content;
    story.content = renderer;
    return story
  })
};

export default generateStories