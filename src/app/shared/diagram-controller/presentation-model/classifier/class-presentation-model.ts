import { ClassifierPresentationModel } from './classifier-presentation-model';
import { Graphics } from '../../../graphics';
import { ClassModel, ClassView } from '../../../data-model';

export class ClassPresentationModel extends ClassifierPresentationModel {

  constructor(graphics: Graphics, model: ClassModel, view: ClassView) {
    super(graphics, model, view);
  }
}
