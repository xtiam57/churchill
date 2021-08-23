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
          subtext: `<div class="row">${options
            .map((o, i) => `<div class="col-6 ">${letters[i]} ${o}</div>`)
            .join('')}</div>`,
        }),
        Slide.create({
          title: 'Respuesta:',
          text: `${letters[correct]} ${answer.toUpperCase()}`,
          subtext: e.reference,
        }),
      ];
    })
    .reduce((accum, curr) => accum.concat(...curr), []);
}
