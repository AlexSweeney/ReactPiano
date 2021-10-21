// ====================================== Consts ====================================== //
export const UNESCAPED_SHARP_KEYS = [
	'C3', 'C#3',  'D3', 'D#3', 'E3',  'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
];

// Key = escapes # automatically => need to use escaped for reference
export const OCTAVE_KEYS_SHARP = [
	'C3', 'C\#3',  'D3', 'D\#3', 'E3',  'F3', 'F\#3', 'G3', 'G\#3', 'A3', 'A\#3', 'B3',
];

export const OCTAVE_KEYS_FLAT = [
	'C3',  'Db3', 'D3',  'Eb3', 'E3', 'F3',  'Gb3', 'G3', 'A3', 'Bb3', 'B3',
];

export const WHITE_KEYS = [
	'C3',  'D3',  'E3',  'F3',  'G3', 'A3', 'B3',
];

export const SHARP_KEYS = [
	'C\#3', 'D\#3', 'E\#3', 'G\#3', 'A\#3',
];

export const FLAT_KEYS = [
	'Cb3', 'Db3', 'Eb3', 'Gb3', 'Ab3',
];

export const BLACK_KEYS = [
	...SHARP_KEYS,
	...FLAT_KEYS,
];

export const ALL_KEYS = [
	...WHITE_KEYS,
	...SHARP_KEYS,
	...FLAT_KEYS,
];

// ====================================== Fns ========================================== //