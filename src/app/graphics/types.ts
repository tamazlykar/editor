export type TextAnchor = 'start' | 'middle' | 'end';

export const TextAnchor = {
  start: 'start' as TextAnchor,
  middle: 'middle' as TextAnchor,
  end: 'end' as TextAnchor
};

export type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through'

export const TextDecoration = {
  none: 'none' as TextDecoration,
  underline: 'underline' as TextDecoration,
  overline: 'overline' as TextDecoration,
  lineThough: 'line-through' as TextDecoration
};

export type FontFamily = 'Georgia, serif' |
  '"Times New Roman", Times, serif' |
  'Arial, Helvetica, sans-serif' |
  'Verdana, Geneva, sans-serif';

export const FontFamily = {
  Georgia: 'Georgia, serif' as FontFamily,
  TimesNewRoman: '"Times New Roman", Times, serif' as FontFamily,
  Arial: 'Arial, Helvetica, sans-serif' as FontFamily,
  Verdana: 'Verdana, Geneva, sans-serif' as FontFamily
};

export type Color = 'black' | 'blue' | 'white';

export const Color = {
  black: 'black' as Color,
  blue: 'blue' as Color,
  white: 'white' as Color
};

export type FontStyle = 'normal' | 'italic';

export const FontStyle = {
  normal: 'normal' as FontStyle,
  italic: 'italic' as FontStyle
};

export type FontWeight = 'normal' | 'bold';

export const FontWeight = {
  normal: 'normal' as FontWeight,
  bold: 'bold' as FontWeight
};

export type StrokeDasharray = '' | '-' | '.' | '-.' | '-..' | '. ' | '- ' | '--' | '- .' | '--.' | '--..';


export interface Params {
  [propName: string]: any;
}
