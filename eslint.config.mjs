// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/multi-word-component-names': 'off',
    // Typed optional props are `undefined` by default; that is fine.
    'vue/require-default-prop': 'off',
    // Formatting is Prettier's job.
    'vue/html-self-closing': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
})
