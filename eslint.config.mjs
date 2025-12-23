import eslintReact from '@eslint-react/eslint-plugin'
import eslintJs from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
	// Base JS recommended rules
	eslintJs.configs.recommended,
	// TypeScript recommended rules
	...tseslint.configs.recommended,
	// ESLint React recommended for TypeScript
	eslintReact.configs['recommended-typescript'],
	// Global ignores
	{
		ignores: [
			'node_modules/**',
			'.expo/**',
			'dist/**',
			'build/**',
			'scratch/**',
			'**/*.test.ts',
			'**/*.test.tsx',
			// Config files (CommonJS)
			'*.config.js',
			'*.config.ts',
			'jest.setup.js',
			'babel.config.js',
		],
	},
	// TypeScript/React overrides
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// React best practices - keep as errors
			'@eslint-react/no-missing-key': 'error',
			'@eslint-react/no-array-index-key': 'warn',
			'@eslint-react/no-unstable-context-value': 'error',
			'@eslint-react/no-unstable-default-props': 'error',

			// React 19 patterns - disable for now (project may not be on React 19)
			'@eslint-react/no-use-context': 'off',
			'@eslint-react/no-context-provider': 'off',

			// Setting state in useEffect is valid for syncing props/external state
			'@eslint-react/hooks-extra/no-direct-set-state-in-use-effect': 'off',

			// Leaked timeouts - warn for awareness but don't error
			'@eslint-react/web-api/no-leaked-timeout': 'warn',

			// TypeScript - relaxed for React Native
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
			],

			// General
			'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
		},
	},
]
