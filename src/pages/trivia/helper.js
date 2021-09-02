import { shuffle, Slide } from 'utils';

const letters = ['A)', 'B)', 'C)', 'D)'];

export function get(list) {
  return shuffle(list)
    .map((e) => {
      const answer = e.options[0];
      const options = shuffle([...e.options]);
      const correct = options.findIndex((value) => value === answer);

      return [
        Slide.create({
          text: e.question,
          subtext: `<div class="container"><div class="row">${options
            .map(
              (o, i) =>
                `<div class="col-6 opt-${i}"><div class="opts">${letters[i]} ${o}</div></div>`
            )
            .join('')}</div></div>`,
        }),
        Slide.create({
          text: `<b>Respuesta:</b>/n${
            letters[correct]
          } ${answer.toUpperCase()}`,
          subtext: e.reference,
        }),
      ];
    })
    .reduce((accum, curr) => accum.concat(...curr), []);
}
