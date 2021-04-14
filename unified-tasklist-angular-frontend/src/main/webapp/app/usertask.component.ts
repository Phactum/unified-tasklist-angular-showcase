import { Component, Compiler, Injector, ViewChild, ViewContainerRef, isDevMode, Input } from '@angular/core';
import { UserTaskFormComponent } from '@unified-tasklist/common';

import * as tslib from 'tslib';
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as AngularForms from '@angular/forms';
import * as UnifiedTasklistCommon from '@unified-tasklist/common';
import { UserTaskService } from './usertask.service';
import { UserTaskInstance } from 'client/api';

// this list has to consist of dependencies of @unified-tasklist/common and tasklist
// otherwise "tree-shaking" would remove them and they wouldn't be found by
// external loaded modules
const knownModules = {
  '@unified-tasklist/common': UnifiedTasklistCommon,
  '@angular/core': AngularCore,
  '@angular/common': AngularCommon,
  '@angular/router': AngularRouter,
  '@angular/forms': AngularForms,
  tslib,
};

interface ComponentsMap {
  [key: string]: AngularCore.Type<any>;
}

interface TenantModulesMap {
  [key: string]: {
    module: AngularCore.NgModuleRef<any>;
    components: ComponentsMap;
  };
}

@Component({
  selector: 'app-usertask',
  templateUrl: './usertask.component.html',
  styleUrls: ['./usertask.component.css']
})
export class UserTaskComponent {

  task: UserTaskInstance;

  loadedModules: TenantModulesMap;

  @ViewChild('form', { read: ViewContainerRef }) form: ViewContainerRef;

  constructor(private compiler: Compiler,
              private injector: Injector,
              private userTaskService: UserTaskService) {
    this.loadedModules = {};
  }

  @Input()
  get taskId(): string { return this._taskId; }
  set taskId(taskId: string) {
    this._taskId = taskId;
    if (this.form) { // clear previously loaded form
      this.form.clear();
    }
    if (this._taskId) {
      this.userTaskService.getUserTaskById(this._taskId)
          .then(task => {
            this.task = task;
            this.loadTenantModule();
          });
    } else {
      this.task = undefined;
    }
  }
  private _taskId: string;

  private async loadTenantModule(): Promise<any> {

    const minifiedVersion = isDevMode() ? '' : '.min';
    const url = `/frontend/${this.task.tenant}/bundles/${this.task.tenant}.umd${minifiedVersion}.js`;
    const ucTenant = this.task.tenant.charAt(0).toUpperCase() + this.task.tenant.substring(1);
    const moduleName = `${ucTenant}Module`;

    // check for module already loaded before or load if from URL
    let moduleLoadedBefore = this.loadedModules[this.task.tenant];
    if (!moduleLoadedBefore) {

      // load module from URL
      const source = await (await fetch(url)).text();
      const newModule = this.getModuleFromSource(source);
      if (!newModule) {
          throw new Error(`Loading module according to '${url}' failed!`);
      }

      // activate module
      if (!newModule[moduleName]) {
          throw new Error(`Module loaded from '${url}' did not provide at least this module: ${moduleName}!`);
      }

      let moduleWithComponentFactories: AngularCore.ModuleWithComponentFactories<any>;
      try {
        moduleWithComponentFactories = this.compiler.compileModuleAndAllComponentsSync(newModule[moduleName]);
      } catch (e) {
        if (e.message === 'Cannot read property \'id\' of undefined') {
          const newError = new Error('The cause of this error typically occurs, if you forgot to declare a '
              + 'used module as a peerDependency in your library project');
          newError.stack += '\nCaused by: ' + e.stack;
          throw newError;
        } else {
          throw e;
        }
      }
      const module = moduleWithComponentFactories.ngModuleFactory.create(this.injector);

      // determine all components of the module
      const componentFactories = moduleWithComponentFactories.componentFactories;
      const components: ComponentsMap = componentFactories.reduce((acc, f) => ({
            ...acc,
            [f.selector]: f.componentType,
          }), {});

      moduleLoadedBefore = {
        module,
        components
      };

      // store for the next time this module is required
      this.loadedModules[this.task.tenant] = moduleLoadedBefore;

    }

    // load component

    // the component's selectoris expecteded in the form of '[tenant]-[formKey]'
    const selector = `${this.task.tenant.toLowerCase()}-${this.task.formKey.toLowerCase()}`;
    const componentType = moduleLoadedBefore.components[selector];
    if (!componentType) {
      const knownSelectors = Object.keys(moduleLoadedBefore.components);
      throw new Error(`Module loaded from '${url}' did not provide a component for the
          selector '${selector}' as part of the module '${moduleName}'! Known components are: ${knownSelectors}.`);
    }
    const factory = moduleLoadedBefore.module.componentFactoryResolver.resolveComponentFactory(
        componentType) as AngularCore.ComponentFactory<UserTaskFormComponent>;
    const component = this.form.createComponent(factory);
    component.instance.taskId = this.taskId;
    component.instance.tenant = this.task.tenant;
    component.instance.formKey = this.task.formKey;
    component.instance.readOnly = this.task.readOnly;
    component.instance.task = this.task;

  }

  private getModuleFromSource(source: string): any {

    const exports = {};

    // Hijacking require call to importing internal dependencies
    function require(name: string): any {

      // find module from list (e.g. '@unified-tasklist/shared')
      const moduleInfo = Object.keys(knownModules)
          .filter(knownModule => (name === knownModule)
              || name.startsWith(knownModule + '/'))
          .map(knownModule => {
              return {
                name: knownModule,
                sub: name.substr(knownModule.length),
                module: knownModules[knownModule]
              };
            })
          .reduce((result, info) => info, undefined);
      if (!moduleInfo) {
        throw new Error(`Didn't find module '${name}' -> extend knownModules in usertask.component.ts!`);
      }

      // find sub module (e.g. '@unified-tasklist/shared/components/CheckBox')
      const parts = moduleInfo.sub.split('/');
      let requiredModule = moduleInfo.module;
      let lastPart = null;
      parts.forEach(part => {
        if (requiredModule && (part.length > 0)) {
          lastPart = part.replace(/-/g, '');
          requiredModule = requiredModule[lastPart];
        }
      });
      if (!requiredModule) {
        console.warn(`Imported module '${moduleInfo.name}':`, moduleInfo.module);
        throw new Error(`Didn't find export '${moduleInfo.sub}' in module '${moduleInfo.name}' -> extend index.ts in that submodule to export it as '${lastPart}'!`);
      }

      return requiredModule;

    }

    // run loaded code to get all UMD exports
    try {
      eval(source); // eslint-disable-line no-eval
    } catch (e) {
      console.error(e);
    }

    return exports;

  }

}
