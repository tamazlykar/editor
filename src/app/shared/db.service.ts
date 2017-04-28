import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Project } from './interfaces';

@Injectable()
export class FirebaseService {
  private projects: FirebaseListObservable<Project[]>;
  private diagrams: FirebaseListObservable<any[]>;
  private viewElements: FirebaseListObservable<any[]>;

  private classesModel: FirebaseListObservable<any[]>;
  private interfacesModel: FirebaseListObservable<any[]>;
  private dependencyModel: FirebaseListObservable<any[]>;

  private classesView: FirebaseListObservable<any[]>;
  private interfacesView: FirebaseListObservable<any[]>;
  private dependencyView: FirebaseListObservable<any[]>;


  private userId: string;
  private projectId: string;
  private diagramId: string;

  constructor(private af: AngularFire) {
  }

  public login() {
    const user = this.af.auth.login({email: 'tadani7@gmail.com', password: '07021995'});
    user.then(val => {
      this.userId = val.uid;
      this.projects = this.af.database.list(`/projects/${this.userId}`);
    });
  }

  public getProjectsList() {
    let p: Project[];
    return this.projects.subscribe(val => {
      p = val;
      console.log(p);
      console.log(p[0]);
    });

  }

  public selectProject(projectId: string) {
    this.projectId = projectId;

    this.diagrams = this.af.database.list(`/diagrams/${this.projectId}`);
    this.setModelElemtntsLists();
  }

  public addProject(project: Project) {
    this.projects.push(project);
  }

  public getDiagramList() {
    return this.diagrams;
  }

  public selectDiagram(diagramId: string) {
    this.diagramId = diagramId;

    this.setViewElemtntsLists();
  }

  private setModelElemtntsLists() {
    const path = `/model-elements/${this.projectId}`;
    this.classesModel = this.af.database.list(`${path}/classes`);
    this.interfacesModel = this.af.database.list(`${path}/interfaces`);
    this.dependencyModel = this.af.database.list(`${path}/dependencies`);
  }

  private setViewElemtntsLists() {
    const path = `/view-elements/${this.projectId}/${this.diagramId}`;
    this.classesView = this.af.database.list(`${path}/classes`);
    this.interfacesView = this.af.database.list(`${path}/interfaces`);
    this.dependencyView = this.af.database.list(`${path}/dependencies`);
  }


}
