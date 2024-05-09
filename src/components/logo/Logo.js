import * as React from 'react';

function Logo({ height = 500, color = 'default', logo = 'default', ...rest }) {
  switch (logo) {
    // Churchill logos
    case 'small':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 446 331.07"
          height={height}
          {...rest}
        >
          <path
            d="m64.82,52.75c6.41-2.32,12.83-4.6,19.25-6.9-.42,66.57-1.55,133.14-1.83,199.72,28.63-2.9,58.82-1.81,85.28,10.6,11.69,5.57,22.38,13.52,30.42,23.72,5.63,7.91,11.72,15.8,14.7,25.17,1.71,5.23,1.92,10.89.62,16.23-3.78-18.87-17.11-34.46-33.04-44.58-21.89-14.18-48.52-18.77-74.21-18.85-13.92-.13-27.8,1.06-41.63,2.38.39-69.16-.44-138.33.44-207.49Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m200.68.1c14.87.08,29.74-.14,44.63-.1.02,15.67-.02,31.34,0,47.03,20.43-.13,40.86-.1,61.29.11-.02,14.58.24,29.15.3,43.74-20.53.53-41.05.35-61.58.38.02,51.48-.37,102.97.19,154.44-14.98.06-29.95-.08-44.94-.3.34-51.42.14-102.83.19-154.25-20.49.21-41.01.3-61.5-.14.21-14.58.02-29.17.02-43.75,20.49-.26,40.99-.35,61.48-.34.05-15.61-.02-31.21-.1-46.82Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m362.05,45.99c6.33,2.11,12.6,4.39,18.96,6.42,1.45,69.32.4,138.68.61,208.01-29.08-3.28-59.18-4.79-87.58,3.6-20.08,5.8-39.15,17.29-51.28,34.61-4.76,6.85-8.12,14.67-9.73,22.86-2-6.87-.88-14.27,2.04-20.7,3.41-7.74,8.58-14.5,13.46-21.34,12.59-15.73,31.15-25.73,50.48-30.57,21.15-5.35,43.27-5.52,64.87-3.43-.3-66.49-1.34-132.97-1.83-199.46Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m29.86,85.76c5.65-4.13,12.62-5.58,19.09-7.91-.69,66.61-1.17,133.22-1.64,199.84,33.69-9.9,70.2-15.1,104.58-5.48,21.55,6.45,42.41,19.08,54.03,38.88-12.47-8.89-24.87-18.51-39.6-23.35-18.19-5.58-37.33-7.62-56.31-7.32-27.22.47-54.1,5.69-80.44,12.27.04-68.98-.2-137.96.29-206.93Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m397.25,77.78c6.49,2.39,12.97,4.83,19.45,7.26-.42,69.18-.04,138.37-.2,207.56-26.38-6.48-53.26-11.76-80.51-12.22-20.22-.4-40.62,2.11-59.81,8.62-13.03,4.88-23.79,13.98-35.71,20.9,14.79-22.09,39.76-35.87,65.59-40.44,30.99-5.58,62.85-.62,92.74,8.23-.37-66.64-1.04-133.28-1.55-199.91Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m426.83,109.12c6.38,2.4,12.75,4.85,19.14,7.23.06,69.14.02,138.27.02,207.4-22.97-8.32-46.32-15.82-70.29-20.68-28.44-5.84-58.05-7.73-86.69-2.19-8.14,1.67-16.35,3.44-23.92,6.95-13.03,5.85-24.24,14.84-35.66,23.24,3.78-5.39,7.88-10.58,12.43-15.33,20.95-17.96,48.35-27.88,75.87-28.56,37.99-1.62,75.24,8.71,110.59,21.68-.41-66.58-1.13-133.16-1.49-199.74Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
          <path
            d="m.08,116.37c6.42-2.37,12.82-4.81,19.24-7.2-.43,66.56-1.14,133.12-1.5,199.69,35.54-12.98,72.99-23.52,111.19-21.6,26,1.04,52.36,9.31,72.32,26.41,5.85,5.03,11.02,10.85,15.28,17.29-11.14-8.33-22.25-16.96-34.95-22.81-10.53-4.94-22.08-7.02-33.49-8.78-36.44-5.1-73.39,1.23-108.43,11.31-13.4,3.87-26.61,8.31-39.74,13,.28-69.1.17-138.2.08-207.31Z"
            fill={color === 'default' ? '#ff8a65' : color}
          />
        </svg>
      );
    case 'horizontal':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 791.52 160"
          height={height}
          {...rest}
        >
          <g>
            <path
              d="m31.33,25.49c3.1-1.12,6.2-2.22,9.3-3.33-.2,32.17-.75,64.34-.88,96.52,13.84-1.4,28.43-.87,41.21,5.12,5.65,2.69,10.82,6.53,14.7,11.46,2.72,3.82,5.66,7.64,7.1,12.16.83,2.53.93,5.26.3,7.84-1.83-9.12-8.27-16.65-15.97-21.54-10.58-6.85-23.45-9.07-35.86-9.11-6.73-.06-13.44.51-20.12,1.15.19-33.42-.21-66.85.21-100.28Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m96.98.05c7.19.04,14.37-.07,21.57-.05,0,7.57,0,15.15,0,22.73,9.87-.06,19.75-.05,29.62.05,0,7.05.12,14.09.15,21.14-9.92.25-19.84.17-29.76.19,0,24.88-.18,49.76.09,74.64-7.24.03-14.47-.04-21.72-.15.16-24.85.07-49.69.09-74.54-9.9.1-19.82.15-29.72-.07.1-7.05,0-14.1,0-21.14,9.9-.12,19.81-.17,29.71-.16.02-7.54,0-15.08-.05-22.63Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m174.97,22.23c3.06,1.02,6.09,2.12,9.16,3.1.7,33.5.19,67.02.29,100.53-14.05-1.59-28.6-2.31-42.33,1.74-9.7,2.8-18.92,8.36-24.78,16.73-2.3,3.31-3.92,7.09-4.7,11.05-.97-3.32-.43-6.9.99-10,1.65-3.74,4.15-7.01,6.5-10.31,6.08-7.6,15.05-12.43,24.4-14.77,10.22-2.59,20.91-2.67,31.35-1.66-.14-32.13-.65-64.26-.88-96.39Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m14.43,41.45c2.73-2,6.1-2.7,9.23-3.82-.33,32.19-.57,64.38-.79,96.58,16.28-4.78,33.93-7.3,50.54-2.65,10.41,3.12,20.5,9.22,26.11,18.79-6.03-4.3-12.02-8.95-19.14-11.28-8.79-2.7-18.04-3.68-27.21-3.54-13.15.23-26.15,2.75-38.87,5.93.02-33.34-.1-66.67.14-100Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m191.98,37.59c3.14,1.16,6.27,2.33,9.4,3.51-.2,33.43-.02,66.87-.1,100.31-12.75-3.13-25.74-5.68-38.91-5.91-9.77-.19-19.63,1.02-28.9,4.17-6.3,2.36-11.5,6.76-17.26,10.1,7.15-10.68,19.22-17.34,31.7-19.54,14.98-2.7,30.37-.3,44.82,3.98-.18-32.21-.5-64.41-.75-96.61Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m206.28,52.74c3.08,1.16,6.16,2.34,9.25,3.49.03,33.41,0,66.82,0,100.23-11.1-4.02-22.39-7.65-33.97-9.99-13.74-2.82-28.05-3.74-41.9-1.06-3.93.81-7.9,1.66-11.56,3.36-6.3,2.83-11.71,7.17-17.23,11.23,1.83-2.6,3.81-5.11,6.01-7.41,10.12-8.68,23.37-13.47,36.67-13.8,18.36-.78,36.36,4.21,53.45,10.48-.2-32.18-.55-64.35-.72-96.53Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m.04,56.24c3.1-1.15,6.2-2.32,9.3-3.48-.21,32.17-.55,64.33-.72,96.51,17.18-6.27,35.27-11.37,53.74-10.44,12.57.5,25.3,4.5,34.95,12.76,2.83,2.43,5.33,5.24,7.38,8.36-5.38-4.03-10.75-8.2-16.89-11.02-5.09-2.39-10.67-3.39-16.18-4.24-17.61-2.46-35.47.59-52.4,5.47-6.48,1.87-12.86,4.02-19.21,6.28.14-33.39.08-66.79.04-100.19Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
          </g>
          <g>
            <path
              d="m321.83,114.68c-5.12,8.01-16.03,14.45-29.43,14.45-19.97,0-33.76-13.4-33.76-35.08s12.61-34.03,33.11-34.03c9.33,0,18.92,2.63,27.33,7.62v20.23h-18v-9.72c-2.63-1.31-5.52-1.97-8.28-1.97-8.67,0-13.14,6.7-13.14,17.08,0,11.82,5.91,18.52,14.98,18.52,6.7,0,12.61-3.94,16.16-8.67l11.04,11.56Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m400.92,112.84v14.71h-35.21v-14.71h7.49v-25.09c0-6.96-4.2-11.3-10.64-11.3-5.91,0-9.98,3.81-10.77,10.64v25.75h7.36v14.71h-35.21v-14.71h7.88V46.37h-7.88v-14.71h27.85v36.52c4.07-5.25,10.25-8.15,17.87-8.15,14.45,0,23.52,10.12,23.52,26.27v26.54h7.75Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m475.68,112.84v14.71h-25.36v-9.46c-3.94,7.09-11.17,11.17-20.76,11.17-13.93,0-22.6-8.41-22.6-25.75v-26.93h-7.75v-14.71h27.85v40.2c0,7.23,3.94,10.77,9.98,10.77,6.83,0,10.77-4.47,10.77-12.35v-23.91h-7.88v-14.71h27.85v50.97h7.88Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m528.1,60.56v19.71h-2.23c-11.3,0-18.52,6.96-19.05,17.21l.13,15.37h13.53v14.71h-41.38v-14.71h7.88v-36.26h-7.88v-14.71h25.36l-.13,13.53c3.81-9.2,11.43-14.85,21.02-14.85h2.76Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m594.05,114.68c-5.12,8.01-16.03,14.45-29.43,14.45-19.97,0-33.76-13.4-33.76-35.08s12.61-34.03,33.11-34.03c9.33,0,18.92,2.63,27.33,7.62v20.23h-18v-9.72c-2.63-1.31-5.52-1.97-8.28-1.97-8.67,0-13.14,6.7-13.14,17.08,0,11.82,5.91,18.52,14.98,18.52,6.7,0,12.61-3.94,16.16-8.67l11.04,11.56Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m673.14,112.84v14.71h-35.21v-14.71h7.49v-25.09c0-6.96-4.2-11.3-10.64-11.3-5.91,0-9.98,3.81-10.77,10.64v25.75h7.36v14.71h-35.21v-14.71h7.88V46.37h-7.88v-14.71h27.85v36.52c4.07-5.25,10.25-8.15,17.87-8.15,14.45,0,23.52,10.12,23.52,26.27v26.54h7.75Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m712.69,112.84v14.71h-35.6v-14.71h7.88v-36.26h-7.88v-14.71h27.85v50.97h7.75Zm-29.03-70.81c0-6.31,4.99-11.3,11.3-11.3s11.17,4.99,11.17,11.3-4.99,11.3-11.17,11.3-11.3-5.12-11.3-11.3Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m751.32,112.84v14.71h-35.6v-14.71h7.88V46.37h-7.88v-14.71h27.85v81.19h7.75Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m791.52,112.84v14.71h-35.6v-14.71h7.88V46.37h-7.88v-14.71h27.85v81.19h7.75Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
          </g>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 461.28 435.94"
          height={height}
          {...rest}
        >
          <g>
            <path
              d="m72.15,52.75c6.41-2.32,12.83-4.6,19.25-6.9-.42,66.57-1.55,133.14-1.83,199.72,28.63-2.9,58.82-1.81,85.28,10.6,11.69,5.57,22.38,13.52,30.42,23.72,5.63,7.91,11.72,15.8,14.7,25.17,1.71,5.23,1.92,10.89.62,16.23-3.78-18.87-17.11-34.46-33.04-44.58-21.89-14.18-48.52-18.77-74.21-18.85-13.92-.13-27.8,1.06-41.63,2.38.39-69.16-.44-138.33.44-207.49Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m208.01.1c14.87.08,29.74-.14,44.63-.1.02,15.67-.02,31.34,0,47.03,20.43-.13,40.86-.1,61.29.11-.02,14.58.24,29.15.3,43.74-20.53.53-41.05.35-61.58.38.02,51.48-.37,102.97.19,154.44-14.98.06-29.95-.08-44.94-.3.34-51.42.14-102.83.19-154.25-20.49.21-41.01.3-61.5-.14.21-14.58.02-29.17.02-43.75,20.49-.26,40.99-.35,61.48-.34.05-15.61-.02-31.21-.1-46.82Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m369.38,45.99c6.33,2.11,12.6,4.39,18.96,6.42,1.45,69.32.4,138.68.61,208.01-29.08-3.28-59.18-4.79-87.58,3.6-20.08,5.8-39.15,17.29-51.28,34.61-4.76,6.85-8.12,14.67-9.73,22.86-2-6.87-.88-14.27,2.04-20.7,3.41-7.74,8.58-14.5,13.46-21.34,12.59-15.73,31.15-25.73,50.48-30.57,21.15-5.35,43.27-5.52,64.87-3.43-.3-66.49-1.34-132.97-1.83-199.46Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m37.19,85.76c5.65-4.13,12.62-5.58,19.09-7.91-.69,66.61-1.17,133.22-1.64,199.84,33.69-9.9,70.2-15.1,104.58-5.48,21.55,6.45,42.41,19.08,54.03,38.88-12.47-8.89-24.87-18.51-39.6-23.35-18.19-5.58-37.33-7.62-56.31-7.32-27.22.47-54.1,5.69-80.44,12.27.04-68.98-.2-137.96.29-206.93Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m404.58,77.78c6.49,2.39,12.97,4.83,19.45,7.26-.42,69.18-.04,138.37-.2,207.56-26.38-6.48-53.26-11.76-80.51-12.22-20.22-.4-40.62,2.11-59.81,8.62-13.03,4.88-23.79,13.98-35.71,20.9,14.79-22.09,39.76-35.87,65.59-40.44,30.99-5.58,62.85-.62,92.74,8.23-.37-66.64-1.04-133.28-1.55-199.91Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m434.16,109.12c6.38,2.4,12.75,4.85,19.14,7.23.06,69.14.02,138.27.02,207.4-22.97-8.32-46.32-15.82-70.29-20.68-28.44-5.84-58.05-7.73-86.69-2.19-8.14,1.67-16.35,3.44-23.92,6.95-13.03,5.85-24.24,14.84-35.66,23.24,3.78-5.39,7.88-10.58,12.43-15.33,20.95-17.96,48.35-27.88,75.87-28.56,37.99-1.62,75.24,8.71,110.59,21.68-.41-66.58-1.13-133.16-1.49-199.74Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m7.41,116.37c6.42-2.37,12.82-4.81,19.24-7.2-.43,66.56-1.14,133.12-1.5,199.69,35.54-12.98,72.99-23.52,111.19-21.6,26,1.04,52.36,9.31,72.32,26.41,5.85,5.03,11.02,10.85,15.28,17.29-11.14-8.33-22.25-16.96-34.95-22.81-10.53-4.94-22.08-7.02-33.49-8.78-36.44-5.1-73.39,1.23-108.43,11.31-13.4,3.87-26.61,8.31-39.74,13,.28-69.1.17-138.2.08-207.31Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
          </g>
          <g>
            <path
              d="m54.7,423.31c-4.44,6.94-13.87,12.51-25.47,12.51-17.29,0-29.23-11.6-29.23-30.36s10.92-29.45,28.66-29.45c8.07,0,16.38,2.27,23.65,6.6v17.51h-15.58v-8.42c-2.27-1.14-4.78-1.71-7.16-1.71-7.51,0-11.37,5.8-11.37,14.78,0,10.24,5.12,16.04,12.96,16.04,5.8,0,10.92-3.41,13.99-7.51l9.55,10.01Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m123.17,421.72v12.74h-30.48v-12.74h6.48v-21.72c0-6.03-3.64-9.78-9.21-9.78-5.12,0-8.64,3.3-9.33,9.21v22.29h6.37v12.74h-30.48v-12.74h6.82v-57.54h-6.82v-12.74h24.11v31.62c3.53-4.55,8.87-7.05,15.47-7.05,12.51,0,20.36,8.76,20.36,22.74v22.97h6.71Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m187.88,421.72v12.74h-21.95v-8.19c-3.41,6.14-9.67,9.67-17.97,9.67-12.05,0-19.56-7.28-19.56-22.29v-23.31h-6.71v-12.74h24.11v34.8c0,6.25,3.41,9.33,8.64,9.33,5.91,0,9.33-3.87,9.33-10.69v-20.7h-6.82v-12.74h24.11v44.12h6.82Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m233.26,376.46v17.06h-1.93c-9.78,0-16.03,6.03-16.49,14.9l.11,13.31h11.71v12.74h-35.82v-12.74h6.82v-31.39h-6.82v-12.74h21.95l-.11,11.71c3.3-7.96,9.89-12.85,18.2-12.85h2.39Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m290.35,423.31c-4.44,6.94-13.87,12.51-25.47,12.51-17.29,0-29.23-11.6-29.23-30.36s10.92-29.45,28.66-29.45c8.07,0,16.38,2.27,23.65,6.6v17.51h-15.58v-8.42c-2.27-1.14-4.78-1.71-7.16-1.71-7.51,0-11.37,5.8-11.37,14.78,0,10.24,5.12,16.04,12.96,16.04,5.8,0,10.92-3.41,13.99-7.51l9.55,10.01Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m358.81,421.72v12.74h-30.48v-12.74h6.48v-21.72c0-6.03-3.64-9.78-9.21-9.78-5.12,0-8.64,3.3-9.33,9.21v22.29h6.37v12.74h-30.48v-12.74h6.82v-57.54h-6.82v-12.74h24.11v31.62c3.53-4.55,8.87-7.05,15.47-7.05,12.51,0,20.36,8.76,20.36,22.74v22.97h6.71Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m393.05,421.72v12.74h-30.82v-12.74h6.82v-31.39h-6.82v-12.74h24.11v44.12h6.71Zm-25.13-61.3c0-5.46,4.32-9.78,9.78-9.78s9.67,4.32,9.67,9.78-4.32,9.78-9.67,9.78-9.78-4.44-9.78-9.78Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m426.48,421.72v12.74h-30.82v-12.74h6.82v-57.54h-6.82v-12.74h24.11v70.28h6.71Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
            <path
              d="m461.28,421.72v12.74h-30.82v-12.74h6.82v-57.54h-6.82v-12.74h24.11v70.28h6.71Z"
              fill={color === 'default' ? '#ff8a65' : color}
            />
          </g>
        </svg>
      );
  }
}

const SVG = React.memo(Logo);
export { SVG as Logo };
