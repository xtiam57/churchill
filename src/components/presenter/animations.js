// Animación original
export const defaultAnimation = {
  name: 'Normal',
  motion: {
    initial: { opacity: 0, y: '-100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.25 },
  },
};

export const blurAnimation = {
  name: 'Desenfoque',
  motion: {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5 } },
    exit: { opacity: 0, filter: 'blur(8px)', transition: { duration: 0.3 } },
  },
};

export const flipVerticalAnimation = {
  name: 'Voltereta',
  motion: {
    initial: { opacity: 0, rotateX: -90, transformOrigin: 'top' },
    animate: { opacity: 1, rotateX: 0, transition: { duration: 0.5 } },
    exit: {
      opacity: 0,
      rotateX: 90,
      transformOrigin: 'bottom',
      transition: { duration: 0.4 },
    },
  },
};

export const wipeAnimation = {
  name: 'Barrido',
  motion: {
    initial: { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
    animate: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.7 },
    },
    exit: {
      opacity: 1,
      clipPath: 'inset(0 0 0 100%)',
      transition: { duration: 0.4 },
    },
  },
};

export const fromBackAnimation = {
  name: 'Zoom hacia Adelante',
  motion: {
    initial: { opacity: 0, scale: 0.2 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 10 },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.3 } },
  },
};
export const slideUpAnimation = {
  name: 'Deslizar Arriba',
  motion: {
    initial: { opacity: 0, y: '100%' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '-100%' },
  },
};

export const flipAnimation = {
  name: 'Giro 3D',
  motion: {
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: -90, transition: { duration: 0.4 } },
  },
};

export const rotateAndScaleAnimation = {
  name: 'Rotar y Escalar',
  motion: {
    initial: { opacity: 0, scale: 0, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
  },
};

export const gentleScaleAnimation = {
  name: 'Escala Suave',
  motion: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.85, transition: { duration: 0.4 } },
  },
};

export const fadeAnimation = {
  name: 'Desvanecer',
  motion: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  },
};

export const slideHorizontalAnimation = {
  name: 'Deslizar Horizontal',
  motion: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100%' },
  },
};

export const zoomAnimation = {
  name: 'Zoom',
  motion: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.25 },
  },
};

export const slideRotateAnimation = {
  name: 'Deslizar y Rotar',
  motion: {
    initial: {
      opacity: 0,
      x: -150,
      z: 230,
      rotateY: 90,
      transformOrigin: 'center left',
    },
    animate: {
      opacity: 1,
      x: 0,
      z: 0,
      rotateY: 0,
      transition: { duration: 0.4 },
    },
    exit: {
      opacity: 0,
      x: 150,
      z: -230,
      rotateY: -90,
      transformOrigin: 'center right',
      transition: { duration: 0.4 },
    },
  },
};

export const rotateHorizontalBackAnimation = {
  name: 'Girar Horizontal Atrás',
  motion: {
    initial: {
      opacity: 0,
      rotateX: 90,
      transformOrigin: 'bottom',
    },
    animate: { opacity: 1, rotateX: 0, transition: { duration: 0.5 } },
    exit: {
      opacity: 0,
      rotateX: -90,
      transformOrigin: 'top',
      transition: { duration: 0.5 },
    },
  },
};

export const animations = [
  defaultAnimation,
  fadeAnimation,
  slideHorizontalAnimation,
  slideUpAnimation,
  zoomAnimation,
  flipAnimation,
  flipVerticalAnimation,
  rotateAndScaleAnimation,
  gentleScaleAnimation,
  blurAnimation,
  wipeAnimation,
  fromBackAnimation,
  slideRotateAnimation,
  rotateHorizontalBackAnimation,
];
