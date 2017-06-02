import { ClassifierPresentationModel } from './classifier-presentation-model';
import { Graphics } from '../../../graphics';
import { InterfaceModel, InterfaceView } from '../../../data-model';

export class InterfacePresentationModel extends ClassifierPresentationModel {

  constructor(graphics: Graphics, model: InterfaceModel, view: InterfaceView) {
    super(graphics, model, view);
  }
}
