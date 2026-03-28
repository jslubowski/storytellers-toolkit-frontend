import { definePreset } from "@primeuix/themes";
import Aura from '@primeuix/themes/aura';

import { dangerColors,primaryColors, warnColors} from "./colors";
import { buttonDesign } from "./components/button";

import { inputTextDesign } from '@/theme/components/inputText.ts'
import { spinnerDesign } from '@/theme/components/spinnerDesign.ts'
import { textArea } from '@/theme/components/textArea.ts'

export const MyAppTheme = definePreset(Aura, {
  semantic: {
    primary: primaryColors,
    error: warnColors,
    danger: dangerColors,
  },
  components: {
    button: buttonDesign,
    progressspinner: spinnerDesign,
    inputtext: inputTextDesign,
    textarea: textArea
  }
});
