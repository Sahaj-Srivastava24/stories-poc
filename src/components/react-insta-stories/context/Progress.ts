import { createContext, useContext } from 'react';
import { ProgressContext } from '@/components/react-insta-stories/interfaces';

const ProgressCtx = createContext<ProgressContext>({
    currentId: 0,
    videoDuration: 0,
    bufferAction: false,
    pause: false,
    next: () => {}
})

export const useProgressContext = () => {
    return useContext<ProgressContext>(ProgressCtx)
}

export default ProgressCtx