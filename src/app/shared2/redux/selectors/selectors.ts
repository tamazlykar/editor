import 'rxjs/add/operator/let';
import 'rxjs/add/operator/distinctUntilChanged';

export const getObjectModels = () => {
  return state => state
    .select(s => s.model)
    .select(m => m.elements)
    .distinctUntilChanged();
};

export const getObjectModelById = (id: string) => {
  return state => state
    .let(getObjectModels())
    .map(el => {
      return el[id];
    }).distinctUntilChanged();
};



export const getViewModels = () => {
  return state => state
    .select(s => s.view)
    .select(m => m.elements)
    .distinctUntilChanged();
};

export const getViewModelById = (id: string) => {
  return state => state
    .let(getViewModels())
    .map(el => {
      return el[id];
    }).distinctUntilChanged();
};
