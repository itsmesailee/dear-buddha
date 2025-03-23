
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Nature-inspired palette
				sage: {
					50: '#f2f5f3',
					100: '#e6ece7',
					200: '#cfdbd3',
					300: '#b0c3b4',
					400: '#8fa795',
					500: '#718c78',
					600: '#5a7161',
					700: '#495b50',
					800: '#3d4b43',
					900: '#353f39',
					950: '#1c221f',
				},
				earth: {
					50: '#f9f7f4',
					100: '#f0ebe3',
					200: '#e2d6c5',
					300: '#d1ba9f',
					400: '#c0a07c',
					500: '#b38c65',
					600: '#a57a5a',
					700: '#8a624c',
					800: '#725244',
					900: '#5e443c',
					950: '#332320',
				},
				sky: {
					50: '#f1f6fa',
					100: '#e2ecf4',
					200: '#cbdde9',
					300: '#aac7da',
					400: '#82aac7',
					500: '#668eb6',
					600: '#5374a0',
					700: '#475e83',
					800: '#3e506c',
					900: '#36445b',
					950: '#242c3d',
				},
				saffron: {
					50: '#fff8ed',
					100: '#ffefd3',
					200: '#ffdca6',
					300: '#ffc36d',
					400: '#ffa232',
					500: '#ff880a',
					600: '#ff6b00',
					700: '#cc4c02',
					800: '#a23a0b',
					900: '#84320d',
					950: '#481600',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-up': {
					'0%': { 
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': { 
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': { 
						opacity: '0',
						transform: 'scale(0.95)'
					},
					'100%': { 
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'progress': {
					'0%': { width: '0%' },
					'100%': { width: 'var(--progress-width)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-up': 'fade-up 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'breathe': 'breathe 4s ease-in-out infinite',
				'progress': 'progress 1.5s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
