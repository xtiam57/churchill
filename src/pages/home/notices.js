import { Slide } from 'utils';

export const NOTICES = [
  {
    id: 1,
    index: 0,
    type: 'notice',
    title: 'Recomendaciones',
    slides: [
      Slide.create({
        title: '',
        text:
          'Sea usted cordialmente/n<strong class="fs-xl" style="line-height:1">¡BIENVENIDO!</strong>/n a la Casa de Dios.',
      }),
      Slide.create({
        title: '<span class="fs-xl">📖</span>',
        text:
          'Cuando <strong>disfruta</strong> algo no desea <strong>interrupciones</strong>. La <strong>Palabra de Dios</strong> merece respeto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🤐</span>',
        text:
          '<strong>Evite conversar</strong> o hacer ruido durante el culto. Dios quiere hablarle.',
      }),
      Slide.create({
        title: '<span class="fs-xl">📱</span>',
        text:
          'Por favor <strong>apague su celular</strong> y evite usarlo durante el culto. Vino a ver a Dios no a su celular.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🍔</span>',
        text:
          'Espere un poco más y <strong>no ingiera alimentos</strong> durante el culto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🪑🚶🪑</span>',
        text:
          'Permanezca en su lugar y <strong>no se levante durante el culto</strong>.',
      }),
      Slide.create({
        title: '<span class="fs-xl">👦👶👧</span>',
        text:
          'No deje que sus niños corran o jueguen durante el culto. <strong>Llévelos a su clase</strong>. Ellos también necesitan a Dios.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🧻🧼🚽</span>',
        text:
          'Vaya a los servicios higiénicos <strong>antes o después</strong> del culto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">⛪</span>',
        text:
          'Recuerde <strong>cuidar la Iglesia y sus instalaciones</strong>. No olvide que es la Casa de Dios.',
      }),
    ],
  },
  {
    id: 2,
    index: 1,
    type: 'notice',
    title: 'Horarios',
    slides: [
      Slide.create({
        text:
          'Cultos Generales:/n<b>Domingos</b>/n<strong class="fs-xl" style="line-height:1">11:00 AM</strong>/n<strong class="fs-xl" style="line-height:1">06:00 PM</strong>/nEscuela Dominical: <b>10:00 AM</b>',
      }),
      Slide.create({
        text:
          'Culto General:/n<b>Miércoles</b>/n<strong class="fs-xl" style="line-height:1">06:00 PM</strong>',
      }),
      Slide.create({
        text:
          'Reunión de "Ganar Almas":/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">10:00 AM</strong>',
      }),
      Slide.create({
        text:
          'Reunión de Jóvenes:/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">04:00 PM</strong>',
      }),
      Slide.create({
        text:
          'Reunión de Damas:/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">07:00 PM</strong>',
      }),
    ],
  },
  {
    id: 3,
    index: 2,
    type: 'notice',
    title: 'Bautizo',
    slides: [
      Slide.create({
        text:
          '<strong class="fs-xl" style="line-height:1">¡BAUTIZO!</strong>/n¡Hoy un pecador ha recibido a Cristo y <strong>ha decidido bautizarse</strong>!',
        subtext: 'Mateo 28: 19',
      }),
    ],
  },
  {
    id: 4,
    index: 3,
    type: 'notice',
    title: 'Canto Especial',
    slides: [
      Slide.create({
        text:
          'CANTO/n<strong class="fs-xl" style="line-height:1">ESPECIAL</strong>',
        subtext: 'Por favor permanezca en silencio durante la presentación.',
      }),
    ],
  },
  {
    id: 5,
    index: 4,
    type: 'notice',
    title: 'Dedicación',
    slides: [
      Slide.create({
        text:
          'Hoy tenemos una bonita/n<strong class="fs-xl" style="line-height:1">DEDICACIÓN</strong>',
        subtext: 'Felicidades a los padres por confiar su hijo(a) al Señor.',
      }),
    ],
  },
];
