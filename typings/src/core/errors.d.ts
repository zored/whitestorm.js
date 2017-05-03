export class CompositionError extends Error {
  constructor(classInstance, message, component) {
    super();

    const stackArray = this.stack.split('\n');
    stackArray.splice(1, 2);

    this.stack = stackArray.join('\n');

    if (!process) console.error('Component:', component);

    this.name = 'CompositionError';
    this.message = `@${classInstance}: ${message}`;
  }
}

export class DependencyError extends Error {
  constructor(classInstance, message, activeModule, dependencyModule = false) {
    super();

    const stackArray = this.stack.split('\n');
    stackArray.splice(1, 2);

    this.stack = stackArray.join('\n');

    if (!process) console.error('Active module:', activeModule);
    if (!process && dependencyModule) console.error('Dependency published by module:', dependencyModule);

    this.name = 'DependencyError';
    this.message = `@${classInstance}: ${message}`;
  }
}

export class ManagerError extends Error {
  constructor(classInstance, message, component, activeModule = false) {
    super();

    const stackArray = this.stack.split('\n');
    stackArray.splice(1, 2);

    this.stack = stackArray.join('\n');

    if (!process) console.error('Component:', dependencyModule);
    if (!process && activeModule) console.error('Active module:', activeModule);

    this.name = 'DependencyError';
    this.message = `@${classInstance}: ${message}`;
  }
}
