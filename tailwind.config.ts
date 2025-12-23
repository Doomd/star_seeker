import type { Config } from 'tailwindcss'

// @ts-expect-error - nativewind preset doesn't have strict types yet
import nativewindPreset from 'nativewind/preset'

import { Colors } from './src/constants/Colors'

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/app/**/*.{js,jsx,ts,tsx}',
		'./src/components/**/*.{js,jsx,ts,tsx}',
	],
	presets: [nativewindPreset],
	theme: {
		extend: {
			colors: {
				palette: Colors,
			},
		},
	},
	plugins: [],
}

export default config
