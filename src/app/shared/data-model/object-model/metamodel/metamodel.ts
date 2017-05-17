import { VisibilityKind, AggregationKind } from './types';

export interface IElement {
  commentIds: Array<string>;
}

interface INamedElement extends IElement {
  name: string;
  visibility: VisibilityKind;
}

export interface IComment {
  body: string;
  annotatedElementsIds: Array<string>;
}

interface ITypedElement extends INamedElement {
  typeId: string;
  typeName: string;
}

interface IRedifinableElement extends INamedElement {
  isLeaf: boolean;
}

export interface IParameter extends ITypedElement {
}

export interface IClassifier extends INamedElement {
  isAbstract: boolean;
  supplierDependenciesIds: Array<string>;
  clientDependenciesIds: Array<string>;
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
  supplierKey: string;
  clientKey: string;
}

export interface IRealization extends IDependency {
}



