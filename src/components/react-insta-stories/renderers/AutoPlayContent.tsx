//TODO: check

import { useEffect } from 'react';
import { RendererProps, TesterProps } from './../interfaces';

export const Renderer: RendererProps = (props) => {
    useEffect(() => {
        !props.isPaused && props.action('play');
    }, [props])

    if (!!props.story?.originalContent) {
        const Content = props.story.originalContent;
        // console.info("REACT-INSTA-STORIES:: Inside AutoPlayContent Renderer, content rendered")
        return <Content {...props} />
    }

    console.error("REACT-INSTA-STORIES:: Inside AutoPlayContent Renderer, no content")
    return <div />
}

export const tester: TesterProps = (story) => {
    return {
        condition: !!story.content,
        priority: 2
    }
}

const AutoPlayContentRenderer = { Renderer, tester }
export default AutoPlayContentRenderer