// Semantic Color Palette
// Source of Truth for both Tailwind CSS and React Native styles.

export const Colors = {
	light: {
		background: '#ffffff', // white
		panel: '#f1f5f9', // slate-100
		ui: '#e2e8f0', // slate-200
		'ui-active': '#cbd5e1', // slate-300
		primary: '#0891b2', // cyan-600
		'primary-muted': '#cffafe', // cyan-100
		destructive: '#ef4444', // red-500
		foreground: {
			DEFAULT: '#020617', // slate-950
			muted: '#475569', // slate-600
			dim: '#94a3b8', // slate-400
		},
		favorite: '#fbbf24', // amber-400
	},
	dark: {
		background: '#020617', // slate-950
		panel: '#0f172a', // slate-900
		ui: '#1e293b', // slate-800
		'ui-active': '#334155', // slate-700
		primary: '#22d3ee', // cyan-400
		'primary-muted': '#083344', // cyan-950
		destructive: '#ef4444', // red-500
		foreground: {
			DEFAULT: '#ffffff',
			muted: '#94a3b8', // slate-400
			dim: '#64748b', // slate-500
		},
		favorite: '#fbbf24', // amber-400
	},
} as const

export const Theme = Colors.dark
