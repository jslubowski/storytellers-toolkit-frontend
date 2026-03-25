import { definePreset } from "@primeuix/themes";
import Aura from '@primeuix/themes/aura';

import { dangerColors,primaryColors } from "./colors";
import { buttonDesign } from "./components/button";

import { inputTextDesign } from '@/theme/components/inputText.ts'
import { spinnerDesign } from '@/theme/components/spinnerDesign.ts'

export const MyAppTheme = definePreset(Aura, {
  semantic: {
    primary: primaryColors,
    error: dangerColors,
  },
  components: {
    button: buttonDesign,
    progressspinner: spinnerDesign,
    inputtext: inputTextDesign,
    textarea: {
      root: {
        background: 'hsl(var(--card))',
        borderColor: 'hsl(var(--primary))',
        color: 'hsl(var(--text))',
        hoverBorderColor: 'hsl(var(--primary))',
      },
      css: () => `
          .p-textarea {
            resize: none;
          }
        `
    }
  }
});
