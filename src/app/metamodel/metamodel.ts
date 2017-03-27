import { VisibilityKind, AggregationKind } from './types';

export interface IElement {
  comment: Array<IComment>;
}

interface INamedElement extends IElement {
  name: string;
  visibility: VisibilityKind;
  supplierDependencies: Array<IDependency>;
  clientDependencies: Array<IDependency>;
}

interface IComment {
  body: string;
  annotatedElements: Array<IElement>;
}

interface ITypedElement extends INamedElement {
  type: IClassifier;
}

interface IRedifinableElement extends INamedElement {
  isLeaf: boolean;
}

export interface IParameter extends ITypedElement {
  operation: IBehavioralFeature;
}

export interface IClassifier extends INamedElement {
  isAbstract: boolean;
}

export interface IClass extends IClassifier {
  attributes: Array<IProperty>;
  operations: Array<IOperation>;
}

export interface IInterface extends IClassifier {
  attributes: Array<IProperty>;
  operations: Array<IOperation>;
}

export interface IDataType extends IClassifier {
}

export interface IPrimitiveType extends IDataType {
}

export interface IFeature extends ITypedElement, IRedifinableElement {
  isStatic: boolean;
}

interface IStructuralFeature extends IFeature {
}

export interface IProperty extends IStructuralFeature {
  aggregation: AggregationKind;
}

interface IBehavioralFeature extends IFeature {
  parameters: Array<IParameter>;
  isAbstract: boolean;
}

export interface IOperation extends IBehavioralFeature {
}

export interface IRelationship extends IElement {
}

interface IDirectedRelationship extends IRelationship {
}

export interface IDependency extends IDirectedRelationship {
  supplier: INamedElement;
  client: INamedElement;
}

export interface IRealization extends IDependency {
}



