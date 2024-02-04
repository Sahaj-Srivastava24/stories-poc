import { ProgressProps } from './../interfaces'
import ProgressWrapper from './ProgressWrapper'
import useFactsStore from '../store/useFactStore';
import { useProgressContext } from '../context/Progress';

export default function Progress(props: ProgressProps) {
    const { width, active } = props
    const { progressStyles } = useFactsStore();
    const { pause, bufferAction } = useProgressContext()

    const getProgressStyle = (active: number) => {
        if (active === 1) return { transform: `scaleX(${props.count / 100})` }
        if (active === 2) return { width: '100%' }
        return { width: 0 }
    }

    return (
        <ProgressWrapper width={width} pause={pause} bufferAction={bufferAction}>
            <div className='progressbar__inner'
                style={{
                    ...progressStyles,
                    ...getProgressStyle(active),
                }} />
        </ProgressWrapper>
    )
}
