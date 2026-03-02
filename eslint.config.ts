import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

import pluginVitest from '@vitest/eslint-plugin'
import { globalIgnores } from 'eslint/config'
import skipFormatting from 'eslint-config-prettier/flat'
import pluginOxlint from 'eslint-plugin-oxlint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^vue$', '^@vue', '^pinia'],
            ['^@?\\w'],
            ['^@/domain/.*/store', '^@/store'],
            ['^@/components/'],
            ['^@/types', '^@/.*/types', '^@/.*/schema'],
            ['^\\u0000'],
            ['^\\./', '^\\.\\./']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  },

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  skipFormatting
)
