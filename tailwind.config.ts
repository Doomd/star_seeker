import type { Config } from 'tailwindcss'

// @ts-expect-error - nativewind preset doesn't have strict types yet
import nativewindPreset from 'nativewind/preset'

import { Colors } from './constants/Colors'

const config: Config = {
	darkMode: 'class',
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
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
