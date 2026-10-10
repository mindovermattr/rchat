import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export type OpenAPISchema = Record<string, unknown> & { type?: string };

function loadSpec(): {
  spec: Record<string, unknown>;
  schemas: Record<string, OpenAPISchema>;
} {
  const specPath = require.resolve('@rchat/contracts/openapi.yaml');
  const spec = load(readFileSync(specPath, 'utf8')) as Record<string, unknown>;

  const components = (spec.components ?? {}) as Record<string, unknown>;
  const schemas = (components.schemas ?? {}) as Record<string, OpenAPISchema>;

  return { spec, schemas };
}

const { spec, schemas } = loadSpec();

export function getSchema(name: string): OpenAPISchema {
  const schema = schemas[name];
  if (!schema) {
    throw new Error(
      `Schema "${name}" not found in @rchat/contracts/openapi.yaml`,
    );
  }
  return schema;
}

export { spec };
