import { RendererProps, Story, StoryRenderers } from "../interfaces";


// AutoPlayContent is returned for our usecase
export const getRenderer = (story: Story, renderers: StoryRenderers[]): RendererProps => {
    let probable = renderers.map(r => {
        return {
            ...r,
            testerResult: r.tester(story)
        }
    }).filter(r => r.testerResult.condition);
    probable.sort((a, b) => b.testerResult.priority - a.testerResult.priority);
    return probable[0].Renderer;
}