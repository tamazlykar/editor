export enum AggregationKind {
  none,
  shared,
  composite
}

export class Visibility {
  public static elements = [
    { viewValue: '+', name: 'public', value: 0 },
    { viewValue: '#', name: 'protected', value: 1 },
    { viewValue: '-', name: 'private', value: 2 }
  ];
}

export enum VisibilityKind {
  public = 0,
  protected,
  private
}

