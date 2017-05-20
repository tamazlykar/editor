export enum AggregationKind {
  none,
  shared,
  composite
}

export class Visibility {
  public static elements = [
    { name: 'public', value: 0 },
    { name: 'protected', value: 1 },
    { name: 'private', value: 2 }
  ];
}

export enum VisibilityKind {
  public = 0,
  protected,
  private
}

