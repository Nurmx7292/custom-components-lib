# Custom Components Library

TypeScript React component library styled with CSS Modules (SCSS). Components follow MUI-like behavior (variants, floating labels, etc.).
GitHub Repository: [Link to repository](https://github.com/Nurmx7292/custom-components-lib)

## Task
Innowise Lab Internship: Custom-components-lib — build a custom UI library, publish to npm, verify in a separate React app.
Task documentation: [Link to task](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)


## Stack
- React + TypeScript
- CSS Modules (SCSS)
- ESLint + Prettier
- Jest + React Testing Library
- Storybook
- tsc (JS + d.ts output)

## Available components
- Button (variants: text, contained, outlined; sizes: small, medium, large)
- TextField (outlined, error, floating label)
- Select (floating label, placeholder/label behavior)
- Checkbox (label, disabled)
- Switch (checked, onChange, disabled)
- Modal (open, onClose, children)

## How to run (dev)
```bash
npm install
npm run lint        # lint
npm run lint:fix    # lint + fix
npm run test        # unit tests
npm run build       # tsc -> dist (js + d.ts)
npm run storybook   # interactive playground
```

## Usage (consumer project)
Install the package from npm and import from the package root (barrel exports):
```tsx
import React from 'react';
import {
  Button,
  TextField,
  Select,
  Checkbox,
  Switch,
  Modal,
} from 'custom-components-lib';
import type {
  ButtonProps,
  TextFieldProps,
  SelectProps,
} from 'custom-components-lib';

export function Demo() {
  return (
    <div>
      <Button variant="contained" size="medium">Click</Button>
      <TextField label="Email" type="email" />
      <Select label="Age" options={[{ value: '10', label: 'Ten' }]} />
      <Checkbox label="Accept terms" />
      <Switch checked={false} onChange={() => {}} />
      <Modal open={false} onClose={() => {}}>Content</Modal>
    </div>
  );
}
```

## Peer dependencies
The consumer app must provide React:
```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## Publish (maintainer)
```bash
npm run build
npm version patch
npm publish --access public
```
