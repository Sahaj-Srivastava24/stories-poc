import { ProgressWrapperProps } from './../interfaces'
import useFactsStore from '../store/useFactStore';

const ProgressWrapper = (props: ProgressWrapperProps) => {
    const { progressWrapperStyles } = useFactsStore();

    return (
        <div style={{
            ...styles.progress,
            ...progressWrapperStyles,
            ...getProgressWrapperStyle(props.width)
        }}>
            {props.children}
        </div>
    )
}

const getProgressWrapperStyle = (width: number) => ({
    width: `${width * 100}%`,
})

const styles = {
    progress: {
        height: 2,
        maxWidth: '100%',
        background: '#555',
        margin: 2,
        borderRadius: 2,
        WebkitBackfaceVisibility: 'hidden' as const,
        MozBackfaceVisibility: 'hidden' as const,
        msBackfaceVisibility: 'hidden',
        backfaceVisibility: 'hidden' as const,
    }
}

export default ProgressWrapper