import type { Config } from 'tailwindcss'

// @ts-expect-error - nativewind preset doesn't have strict types yet
import nativewindPreset from 'nativewind/preset'

const config: Config = {
	darkMode: 'class',
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [nativewindPreset],
	theme: {
		extend: {
			colors: {
				// We are using custom utility classes in global.css instead of config-based colors
				// to ensure reliable Dark Mode switching on Native.
			},
		},
	},
	plugins: [],
}

export default config
