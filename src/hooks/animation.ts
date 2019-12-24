import { useSpring } from 'react-spring';

export function useFadeIn(duration = 400) {
    const animationProps = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration },
    });

    return animationProps;
}
