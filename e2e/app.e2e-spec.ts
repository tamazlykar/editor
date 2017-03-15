import { UmlEditorPage } from './app.po';

describe('uml-editor App', () => {
  let page: UmlEditorPage;

  beforeEach(() => {
    page = new UmlEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
