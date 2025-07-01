import styled, { keyframes } from 'styled-components';

const wave = keyframes`
  0%, 100% {
    transform: scaleY(0.5);
  }
  50% {
    transform: scaleY(1);
  }
`;

const WaveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  height: 100%;
  width: 100%;
`;

const WaveBar = styled.div`
  width: 2px;
  height: 85%;
  background-color: var(--light);
  border-radius: 1px;
  animation: ${(props) => (props.isPlaying ? wave : 'none')}
    ${(props) => props.duration}ms ease-in-out infinite;
  animation-delay: ${(props) => props.delay}ms;
  transform-origin: center;
  transform: scaleY(1);
  opacity: ${(props) => (props.isPlaying ? 1 : 0.6)};
`;

export function AudioWaves({ isPlaying = false, bars = 4 }) {
  return (
    <WaveContainer>
      {Array.from({ length: bars }).map((_, index) => (
        <WaveBar
          key={index}
          isPlaying={isPlaying}
          duration={Math.random() * 200 + 400}
          delay={Math.random() * 200}
        />
      ))}
    </WaveContainer>
  );
}
