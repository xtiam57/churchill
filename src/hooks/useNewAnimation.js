import { animations } from 'components/presenter/animations';
import createPersistedState from 'use-persisted-state';

const ANIMATION_STORAGE_KEY = 'ANIMATION_INDEX';
const useAnimationState = createPersistedState(ANIMATION_STORAGE_KEY);

export function useNewAnimation() {
  const [animationIndex, setAnimationIndex] = useAnimationState(0);

  const nextAnimation = () => {
    setAnimationIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  const currentAnimation = animations[animationIndex];

  return {
    currentAnimation,
    nextAnimation,
    animations,
    animationIndex,
    setAnimationIndex,
  };
}
