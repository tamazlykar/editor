export interface Class {
  name: string;
  isAbstract: boolean;
  visibility: number;
  attributes: Property[];
  operations: Operation[];

  comment: any[];
  supplierDependencies: Dependency[];
  clientDependencies: Dependency[];
}

export interface Property {
  name: string;
  type: UMLClassifier;
  visibility: VisibilityKind;
  isStatic: boolean;
  supplierDependencies: Dependency[];
  clientDependencies: Dependency[];
  isLeaf: boolean;
  aggregation: AggregationKind;
}

export interface Operation {
  name: string;
  type: UMLClassifier;
  visibility: VisibilityKind;
  isStatic: boolean;
  supplierDependencies: Dependency[];
  clientDependencies: Dependency[];
  isLeaf: boolean;
  parameters: Parameter[];
  isAbstract: boolean;
}

export interface Parameter {
  name: string;
  visibility: VisibilityKind;
  type: UMLClassifier;
  operation: Operation;
  supplierDependencies: Dependency[];
  clientDependencies: Dependency[];
}

export interface Dependency {

}
