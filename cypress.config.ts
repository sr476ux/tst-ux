import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:3000/',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },

    viewportWidth: 1680,
    viewportHeight: 945,
});
