import { animate, state, style, transition, trigger } from '@angular/animations';

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
