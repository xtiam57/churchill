# Reproductor de Música Mejorado

## Funcionalidades Implementadas

### 🎵 Mini Reproductor Expandible
- **Modo Compacto**: Muestra la información básica de la canción actual con controles esenciales
- **Modo Expandido**: Al hacer clic en el botón de expandir, se muestra la lista completa de canciones
- **Animaciones**: Transiciones suaves entre los estados compacto y expandido

### 🎛️ Controles Avanzados
- **Play/Pause**: Control de reproducción con estados visuales claros
- **Siguiente**: Botón para saltar a la siguiente canción
- **Modo Aleatorio**: Activar/desactivar reproducción aleatoria con indicador visual
- **Expandir/Contraer**: Botón para alternar entre vista compacta y expandida

### 🎨 Animaciones Visuales
- **Ondas de Audio**: Animación de ondas cuando se está reproduciendo música
- **Estados de Reproducción**: Indicadores visuales claros para el estado actual
- **Transiciones**: Animaciones suaves para cambios de estado

### 🔄 Reproducción Automática
- **Auto-siguiente**: Cuando termina una canción, automáticamente reproduce la siguiente
- **Modo Aleatorio**: Reproduce canciones en orden aleatorio sin repetir hasta completar la lista
- **Historial**: Mantiene registro de canciones reproducidas en modo aleatorio

### 📱 Interfaz Mejorada
- **Diseño Responsivo**: Se adapta al contenido y estado actual
- **Tooltips**: Información contextual para cada botón
- **Estados Visuales**: Colores y iconos que indican claramente el estado actual

## Estructura de Componentes

### BackgroundMusic.js
- **Propósito**: Maneja la lógica de reproducción de audio usando `use-sound`
- **Responsabilidades**: Control de reproducción, gestión de estado, comunicación con el provider
- **Renderizado**: Solo renderiza el `MiniPlayer` component

### MiniPlayer.js
- **Propósito**: Interfaz de usuario del reproductor de música
- **Estados**: Compacto (mini) y expandido (con lista de canciones)
- **Funcionalidades**: Controles de reproducción, navegación de canciones, configuración

### AudioWaves.js
- **Propósito**: Componente de animación de ondas de audio
- **Características**: Ondas animadas que se muestran durante la reproducción
- **Personalizable**: Número de barras y velocidad de animación

## Uso

```jsx
// El componente se usa automáticamente cuando hay canciones disponibles
<BackgroundMusic />
```

## Configuración

Las canciones deben estar ubicadas en:
`Documentos/Churchill/Pistas/Fondomusical/`

Formatos soportados: `.mp3`

## Estilos

El reproductor utiliza:
- **CSS Variables**: Para colores del tema de la aplicación
- **Bootstrap**: Para componentes base (botones, listas, tooltips)
- **Styled Components**: Para estilos customizados y animaciones
- **Material-UI Icons**: Para iconografía consistente
