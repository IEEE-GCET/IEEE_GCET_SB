module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
	  extend: {
		keyframes: {
		  innerShine: {
			"0%": { boxShadow: "inset 0 0 0px 0 rgba(255,255,255,0)" },
			"50%": { boxShadow: "inset 0 0 15px 5px rgba(255,255,255,0.5)" },
			"100%": { boxShadow: "inset 0 0 0px 0 rgba(255,255,255,0)" },
		  },
		},
		animation: {
		  innerShine: "innerShine 3s ease-in-out infinite",
		},
	  },
	},
	plugins: [require('tailwind-scrollbar-hide')],
  };
  