import { jsCommander } from '../commanders';

jsCommander.spec(tracer => {
  const methodNames = [...new Set(tracer.methods.map(method => method.name))];

  const name = `${tracer.name}.js`;
  const content = `import { Tracer } from './';

class ${tracer.name} extends Tracer {
  constructor(title) {
    super(title);

    this.register(${methodNames.map(methodName => `'${methodName}'`).join(', ')});
  }
}

export default ${tracer.name};`;

  return { name, content };
}).index(tracers => {
  const name = 'index.js';
  const content = [
    { name: 'Tracer' },
    ...tracers,
    { name: 'Randomize' },
  ].map(tracer => `export { default as ${tracer.name} } from './${tracer.name}';`).join('\n');
  return { name, content };
}).build();