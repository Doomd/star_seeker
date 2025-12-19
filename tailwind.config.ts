import { Theme as Colors } from './constants/Colors'
import type { Config } from 'tailwindcss'

// @ts-expect-error - nativewind preset doesn't have strict types yet
import nativewindPreset from 'nativewind/preset'

const config: Config = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
	presets: [nativewindPreset],
	theme: {
		extend: {
			colors: Colors,
		},
	},
	plugins: [],
}

export default config
