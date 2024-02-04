import { getRenderer } from '@/components/react-insta-stories/util/renderers'
import { Renderer, Story, Tester } from '@/components/react-insta-stories/interfaces';

const generateStories = (stories: Story[], renderers: { renderer: Renderer, tester: Tester }[]) => {
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