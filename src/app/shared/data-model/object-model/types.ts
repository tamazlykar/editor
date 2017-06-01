export type ElementType
  = 'Class'
  | 'Interface'
  | 'Property'
  | 'Operation'
  | 'Comment';

export const ElementType = {
  class: 'Class' as ElementType,
  interface: 'Interface' as ElementType,
  property: 'Property' as ElementType,
  operation: 'Operation' as ElementType,
  comment: 'Comment' as ElementType
};
