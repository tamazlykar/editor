import { Injectable } from '@angular/core';
import { ObjectModelService } from '../model-services';
import {
  ObjectModel,
  ElementType,
  ClassModel,
  InterfaceModel,
  PropertyModel,
  OperationModel
} from '../../data-model/object-model';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ElementNameService {
  private startRange = 1;
  private endRange = 100;
  private className = 'ClassName';
  private interfaceName = 'InterfaceName';
  private attributeName = 'Attribute';
  private operationName = 'Operation';

  constructor(
    private modelService: ObjectModelService
  ) {
    this.startRange = 1;
  }


  public getClassName(): Observable<string> {
    return this.getClassifierName(this.findClassifierByName.bind(this), this.className);
  }

  public getInterfaceName(): Observable<string> {
    return this.getClassifierName(this.findClassifierByName.bind(this), this.interfaceName);
  }

  public getAttributeName(classifierId: string): Observable<string> {
    return this.getFeatureName(this.findAttributeByName.bind(this), classifierId, this.attributeName);
  }

  public getOperationName(classifierId: string): Observable<string> {
    return this.getFeatureName(this.findOperationByName.bind(this), classifierId, this.operationName);
  }

  private getClassifierName(findElementByName: Function, nameBase: string): Observable<string> {
    let index: number;
    return Observable.range(this.startRange, this.endRange)
      .flatMap(i => {
        index = i;
        return findElementByName(nameBase + i);
      })
      .first(val => val === null || val === undefined)
      .map(obj => nameBase + index)
      .first();
  }

  private getFeatureName(findElementByName: Function, classifierId: string, nameBase: string): Observable<string> {
    let index: number;
    return Observable.range(this.startRange, this.endRange)
      .flatMap(i => {
        index = i;
        return findElementByName(nameBase + i, classifierId);
      })
      .first(val => val === null || val === undefined)
      .map(obj => nameBase + index)
      .first();
  }

  private findClassifierByName(name: string): Observable<ObjectModel> {
    return this.modelService.getElements()
      .map(elements => elements.find((value: ClassModel | InterfaceModel) => {
        return value.elementType === ElementType.class && value.name === name;
      }));
  }

  private findAttributeByName(name: string, classifierId: string): Observable<PropertyModel> {
    return this.modelService.getElementById(classifierId)
      .map((model: any) => {
        if (!model.attributes) {
          return undefined;
        }
        return model.attributes.find((attr: PropertyModel) => attr.name === name);
      });
  }

  private findOperationByName(name: string, classifierId: string): Observable<OperationModel> {
    return this.modelService.getElementById(classifierId)
      .map((model: any) => {
        if (!model.operations) {
          return undefined;
        }
        return model.operations.find((attr: OperationModel) => attr.name === name);
      });
  }
}
