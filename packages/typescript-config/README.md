# Shared TypeScript configuration

This private workspace exports `@vaartiva/typescript-config/base.json`, `nextjs.json`, and
`node.json`. A consuming JavaScript workspace must declare this workspace package as a
`devDependency` using `workspace:*`, then extend the exported preset from its own `tsconfig.json`.

The base preset provides shared strictness and interoperability conventions without selecting a
runtime module system, target library, JSX mode, or output directory. The Next.js preset selects
bundler resolution and preserves JSX. The Node preset uses Node's ESM-aware `NodeNext` resolution;
the consuming package must declare its own module format and `@types/node` dependency if required.

The existing design-token workspace consumes the base preset in its TypeScript smoke check. This
validates package resolution and configuration use without adding a dummy application or generating
JavaScript. React Native configuration is deferred until the Expo application is initialized so
Expo can provide its required defaults.
