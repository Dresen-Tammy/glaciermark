import { animate, state, style, transition, trigger, group, query, keyframes } from '@angular/animations';

export const riseAnimation =
  trigger('riseAnimation', [
    state('rise', style({ transform: 'translateY(0)'})),
    state('fall', style({ transform: 'translateY(100px)'})),
    transition('rise <=> fall', animate('500ms {{ delay }} {{ timing }}'),
    { params: {delay: '0ms', timing: 'linear'}})
  ]);

export const slideUpAnimation =
trigger('slideUpAnimation', [
  state('up', style({ transform: 'translateY(0)'})),
  state('down', style({ transform: 'translateY(150px)'})),
  transition('up <=> down', animate('600ms {{ delay }} {{ timing }}'),
  { params: {delay: '0ms', timing: 'linear'}})
]);

export const menuAnimation =
  trigger('menuAnimation', [
    state('open', style({})),
    state('close', style({})),
    transition('open => close', [
      group([
      query('.icon1', animate('.5s', keyframes([
        style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0.125turn)', offset: 0}),
        style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0turn)', offset: .33}),
        style({ width: '24px', transform: 'translate(-18px, -8px) rotate(0turn)', offset: .67}),
        style({ width: '18px', transform: 'translate(-18px, -8px) rotate(0turn)', offset: 1})
      ]))),
      query('.icon2', animate('.5s', keyframes([
        style({transform: 'translate(-18px, 0px) rotate(-.125turn)', offset: 0}, ),
        style({transform: 'translate(-18px, 0px) rotate(0turn)', offset: .33}, ),
        style({transform: 'translate(-18px, 0px) rotate(0turn)', offset: 1}, )
      ]))),
      query('.icon3', animate('.5s', keyframes([
        style({ width: '24px', transform: 'translate(-18px, 0px) rotate(-.125turn)', offset: 0}),
        style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0turn)', offset: .33}),
        style({ width: '24px', transform: 'translate(-18px, 8px) rotate(0turn)', offset: .67}),
        style({ width: '12px', transform: 'translate(-18px, 8px) rotate(0turn)', offset: 1})
      ]))),
    ]),
  ]),
    transition('close => open', [
      group([
        query('.icon1', animate('.5s', keyframes([
          style({ width: '18px', transform: 'translate(-18px, -8px) rotate(0turn)', offset: 0}),
          style({ width: '24px', transform: 'translate(-18px, -8px) rotate(0turn)', offset: .33}),
          style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0turn)', offset: .67}),
          style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0.125turn)', offset: 1})
        ]))),
        query('.icon2', animate('.5s', keyframes([
          style({transform: 'translate(-18px, 0px) rotate(0turn)', offset: 0}, ),
          style({transform: 'translate(-18px, 0px) rotate(0turn)', offset: .67}, ),
          style({transform: 'translate(-18px, 0px) rotate(-.125turn)', offset: 1}, )
        ]))),
        query('.icon3', animate('.5s', keyframes([
          style({ width: '12px', transform: 'translate(-18px, 8px) rotate(0turn)', offset: 0}),
          style({ width: '24px', transform: 'translate(-18px, 8px) rotate(0turn)', offset: .33}),
          style({ width: '24px', transform: 'translate(-18px, 0px) rotate(0turn)', offset: .67}),
          style({ width: '24px', transform: 'translate(-18px, 0px) rotate(-.125turn)', offset: 1})
        ]))),
      ])
  ])
]);
