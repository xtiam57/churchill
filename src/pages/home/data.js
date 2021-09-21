import { Slide } from 'utils';

const NOTICES = [
  {
    id: 1,
    index: 0,
    type: 'notice',
    title: 'Recomendaciones',
    slides: [
      Slide.create({
        title: '',
        text: 'Sea usted cordialmente/n<strong class="fs-xlg" style="line-height:1">¡BIENVENIDO!</strong>/n a la Casa de Dios.',
      }),
      Slide.create({
        title: '<span class="fs-xl">📖</span>',
        text: 'Cuando <b>disfruta</b> algo no desea <b>interrupciones</b>. La <b>Palabra de Dios</b> merece respeto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🤐</span>',
        text: '<b>Evite conversar</b> o hacer ruido durante el culto. Dios quiere hablarle.',
      }),
      Slide.create({
        title: '<span class="fs-xl">📱</span>',
        text: 'Por favor <b>apague su celular</b> y evite usarlo durante el culto. Vino a ver a Dios no a su celular.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🍔</span>',
        text: 'Espere un poco más y <b>no ingiera alimentos</b> durante el culto.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🪑🚶🪑</span>',
        text: 'Permanezca en su lugar y <b>no se levante durante la predicación</b>.',
      }),
      Slide.create({
        title: '<span class="fs-xl">👦👶👧</span>',
        text: 'No deje que sus niños corran o jueguen durante el culto. <b>Llévelos a su clase</b>. Ellos también necesitan a Dios.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🧻🧼🚽</span>',
        text: 'Vaya a los servicios higiénicos <b>antes o después</b> de la predicación.',
      }),
      Slide.create({
        title: '<span class="fs-xl">⛪</span>',
        text: 'Recuerde <b>cuidar la Iglesia y sus instalaciones</b>. No olvide que es la Casa de Dios.',
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
        text: 'Cultos Generales:/n<b>Domingos</b>/n<strong class="fs-xl" style="line-height:1">10:20 AM</strong>/n<strong class="fs-xl" style="line-height:1">06:30 PM</strong>/nEscuela Dominical: <b>09:00 AM</b>',
      }),
      Slide.create({
        text: 'Oración:/n<b>Miércoles</b>/n<strong class="fs-xl" style="line-height:1">07:30 PM</strong>',
      }),
      Slide.create({
        text: 'Estudio Bíblico:/n<b>Jueves</b>/n<strong class="fs-xl" style="line-height:1">07:30 PM</strong>',
      }),
      Slide.create({
        text: 'Evangelización/n"Casa por casa":/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">09:00 AM</strong>',
      }),
      Slide.create({
        text: 'Reunión de Adolescentes:/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">03:30 PM</strong>',
      }),
      Slide.create({
        text: 'Reunión de Mayores:/n<b>Sábados</b>/n<strong class="fs-xl" style="line-height:1">06:00 PM</strong>',
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
        text: '<strong class="fs-xl" style="line-height:1">¡BAUTIZO!</strong>/n¡Hoy un pecador ha recibido a Cristo y <b>ha decidido bautizarse</b>!',
        subtext: 'Mateo 28:19',
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
        text: 'CANTO/n<strong class="fs-xl" style="line-height:1">ESPECIAL</strong>',
        subtext: 'Por favor permanezca en silencio durante la presentación.',
      }),
    ],
  },
  {
    id: 5,
    index: 4,
    type: 'notice',
    title: 'Plan de Salvación',
    slides: [
      Slide.create({
        text: 'El único/n<strong class="fs-xl" style="line-height:1">CAMINO Y LA PUERTA</strong>/nal Cielo',
      }),
      Slide.create({
        title: '<span class="fs-xl">🚧🛑🚧</span>',
        text: 'NUESTRA CONDICIÓN:/n<b>El camino al cielo y a Dios está cerrado por el pecado</b>',
      }),
      Slide.create({
        title: '<span class="fs-xl">⚖</span>',
        text: '"Y de la manera que está establecido para los hombres que mueran una sola vez, y <b>después de esto el juicio</b>"',
        subtext: 'Hebreos 9.27',
      }),
      Slide.create({
        title: '<span class="fs-xl">😦</span>',
        text: '"Como está escrito: <b>No hay justo, ni aun uno</b>"',
        subtext: 'Romanos 3:10',
      }),
      Slide.create({
        title: '<span class="fs-xl">😩</span>',
        text: '"Por cuanto <b>todos pecaron</b>, y están destituidos de la gloria de Dios"',
        subtext: 'Romanos 3:23',
      }),
      Slide.create({
        title: '<span class="fs-xl">🔥😈🔥</span>',
        text: 'LA CONSECUENCIA:/n<b>El pecado nos lleva a otro destino</b>',
      }),
      Slide.create({
        title: '<span class="fs-xl">☠</span>',
        text: '"Porque <b>la paga del pecado es muerte</b>, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro"',
        subtext: 'Romanos 6:23',
      }),
      Slide.create({
        title: '<span class="fs-xl">🔥🔥🔥</span>',
        text: '"Pero los cobardes e incrédulos, los abominables y homicidas, los fornicarios y hechiceros, los idólatras y todos los mentirosos tendrán su parte en <b>el lago que arde con fuego y azufre, que es la muerte segunda."</b>',
        subtext: 'Apocalipsis 21:8',
      }),
      Slide.create({
        title: '<span class="fs-xl">🚪</span>',
        text: 'LA SOLUCIÓN:/n<b>Jesucristo es la puerta y el camino al cielo</b>',
      }),
      Slide.create({
        title: '<span class="fs-xl">💖</span>',
        text: '"Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, <b>Cristo murió por nosotros</b>"',
        subtext: 'Romanos 5:8',
      }),
      Slide.create({
        title: '<span class="fs-xl">🎁</span>',
        text: '"Porque la paga del pecado es muerte, <b>mas la dádiva</b> <strong>(regalo)</strong> <b>de Dios es vida eterna</b> en Cristo Jesús Señor nuestro"',
        subtext: 'Romanos 6:23',
      }),
      Slide.create({
        title: '<span class="fs-xl">✝</span>',
        text: 'LA SOLUCIÓN:/n<b>Recibe a Jesús como tu Salvador</b>',
      }),
      Slide.create({
        title: '<span class="fs-xl">👄❤</span>',
        text: '"Que si confesares con tu boca que Jesús es el Señor, y creyeres en tu corazón que Dios le levantó de los muertos, serás salvo. <b>Porque con el corazón se cree para justicia, pero con la boca se confiesa para salvación.</b>"',
        subtext: 'Romanos 10:9-10',
      }),
      Slide.create({
        title: '<span class="fs-xl">🧔</span>',
        text: '"<b>Y en ningún otro hay salvación;</b> porque no hay otro nombre bajo el cielo, dado a los hombres, en que podamos ser salvos."',
        subtext: 'Hechos 4:12 ',
      }),
      Slide.create({
        title: '<span class="fs-xl">🚪❤</span>',
        text: '"He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo."',
        subtext: 'Apocalipsis 3:20 ',
      }),
      Slide.create({
        title: '<span class="fs-xl">🙏</span>',
        text: '<strong>HABLA CON DIOS Y DILE:</strong>/nSeñor Jesús <b>reconozco</b> que te he fallado y que soy pecador, pero <b>te pido perdón</b> por todos mis pecados.',
      }),
      Slide.create({
        title: '<span class="fs-xl">🙏</span>',
        text: '<b>Te acepto</b> como mi Salvador, <b>te recibo</b> en mi corazón y el día en que yo muera sé que voy a estar contigo en el cielo contigo. ',
      }),
      Slide.create({
        title: '<span class="fs-xl">🙏</span>',
        text: '<b>¡Gracias por salvarme!</b>, en el nombre de Jesús, Amén.',
      }),
    ],
  },
  // {
  //   id: 6,
  //   index: 5,
  //   type: 'notice',
  //   title: '¿Cómo guiar a otro al Bautismo?',
  //   slides: [
  //     Slide.create({
  //       title: '<span class="fs-xl">🎁</span>',
  //       text: 'Cómo guiar a otro al/n<strong class="fs-xl" style="line-height:1">BAUTISMO</strong>',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">🚧🛑🚧</span>',
  //       text: '<b>ES UN MANDATO:</b>/nAhora que aceptaste a Cristo como tu salvador, por gratitud y en obediencia a Él, debes ser bautizado.',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">⚖</span>',
  //       text: 'Por tanto, id, y haced discípulos a todas las naciones, <b>bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.</b>',
  //       subtext: 'Mateo 28:19 ',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">🚧🛑🚧</span>',
  //       text: 'Nuestro Señor Jesucristo <b>nos mandó a bautizarnos</b> después de creer en Él.',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">🚧🛑🚧</span>',
  //       text: '<b>SIGNIFICADO:</b>/nLa palabra "Bautizo" ("bapto" o "baptizo") significa <b>sumergido bajo líquido</b>.',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">⚖</span>',
  //       text: 'Porque <b>somos sepultados</b> juntamente con él <b>para muerte</b> por el bautismo, a fin de que como Cristo <b>resucitó</b> de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva.',
  //       subtext: 'Romanos 6:4 ',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">🚧🛑🚧</span>',
  //       text: 'El bautizo representa la muerte, sepultura y resurrección de nuestro Señor Jesucristo.',
  //     }),

  //     Slide.create({
  //       title: '<span class="fs-xl">🚧🛑🚧</span>',
  //       text: '<b>¿CUÁNDO HACERLO?:</b>/nEn la biblia enseña varios ejemplos de personas que creyeron e <b>INMEDIATAMENTE</b> fueron bautizadas.',
  //     }),
  //     Slide.create({
  //       title: '<span class="fs-xl">⚖</span>',
  //       text: 'Porque <b>somos sepultados</b> juntamente con él <b>para muerte</b> por el bautismo, a fin de que como Cristo <b>resucitó</b> de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva',
  //       subtext: 'Romanos 6:4 ',
  //     }),
  //   ],
  // },
];

export function getNotices(birthdaySLide) {
  const notices = JSON.parse(JSON.stringify(NOTICES));

  if (birthdaySLide.count > 0) {
    notices[0].slides.push(birthdaySLide);
  }

  return notices;
}
