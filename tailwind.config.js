/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            animation: {
                fade: 'fadeOut 0.3s ease-in-out',
            },

            keyframes: (theme) => ({
                fadeOut: {
                    '0%': { opacity: '0%' },
                    '100%': { opacity: '100%' },
                },
            }),
        },
    },
    plugins: [require('flowbite/plugin')],
};
