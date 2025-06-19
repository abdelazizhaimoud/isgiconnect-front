import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [
                    [
                        'babel-plugin-styled-components',
                        {
                            displayName: true,
                            fileName: false
                        }
                    ]
                ]
            }
        }),
        tailwindcss(),
    ],
    css: {
        postcss: './postcss.config.js',
      },
    server: {
        port: 3000,
      },
});