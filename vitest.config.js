import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // optional: so you can use `describe`/`it`/`expect` globally
    environment: "jsdom", // use jsdom for DOM APIs (React testing)
    // setupFiles: './tests/setupTests.js', // optional file to run before tests
    // include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],

    coverage: {
      provider: "c8", // or 'istanbul'
      reporter: ["text", "lcov"],
    },
  },
});
