import React, { useEffect, useState } from 'react'
import { ReactInstaStoriesProps, GlobalCtx, Story, Tester, Renderer } from './interfaces'
import Container from './components/Container'
import { renderers as defaultRenderers } from './renderers/index';
import withHeader from './renderers/wrappers/withHeader'
import withSeeMore from './renderers/wrappers/withSeeMore'
import useFactsStore from './store/useFactStore';
import generateStories from './util/generateStories';
import StoriesContext from './context/Stories';

const FactStories = function (props: ReactInstaStoriesProps) {
    const { setContextValues } = useFactsStore()
    const renderers = props.renderers ? props.renderers.concat(defaultRenderers) : defaultRenderers;
    const [stories, setStories] = useState<{ stories: Story[] }>({ stories: generateStories(props.stories, renderers) });


    useEffect(() => {
        setContextValues(props)
        setStories({ stories: generateStories(props.stories, renderers) });
    }, [setContextValues, props, renderers])

    return (
        <StoriesContext.Provider value={stories}>
            <Container />
        </StoriesContext.Provider>
    )
}


export const WithHeader = withHeader;
export const WithSeeMore = withSeeMore;

export default FactStories
