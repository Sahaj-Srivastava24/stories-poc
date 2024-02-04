import { useEffect, useState } from 'react'
import { ReactInstaStoriesProps, Story } from '@/components/react-insta-stories/interfaces'
import Container from '@/components/react-insta-stories/components/container'
import { renderers as defaultRenderers } from '@/components/react-insta-stories/renderers/index';
import withHeader from '@/components/react-insta-stories/renderers/wrappers/withHeader'
import withSeeMore from '@/components/react-insta-stories/renderers/wrappers/withSeeMore'
import useFactsStore from '@/components/react-insta-stories/store/useFactStore';
import generateStories from '@/components/react-insta-stories/util/generateStories';
import StoriesContext from '@/components/react-insta-stories/context/Stories';

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
