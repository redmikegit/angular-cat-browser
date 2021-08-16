import {
	animation, animate, style,
	trigger, animateChild, group,
	transition, state, query, stagger
} from '@angular/animations';

export let oneByOne = trigger('oneByOne', [

	transition(':enter', [ //:enter, :leave  * => *
		query('.cb-stagger', style({ transform: 'translateY(-10%)', opacity: 0 })),
		query('.cb-stagger',
			stagger(300, [
				animate('.5s', style({ transform: 'translateY(0)', opacity: 1 }))
			]))

	]),

]);//oneByOne

 

