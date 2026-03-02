export const inputTextDesign = {
  root: {
    background: 'hsl(var(--background))',
    color: 'hsl(0 0% 100%)', // Optional: ensuring text is readable (white)
    borderColor: 'hsl(var(--input))', // Optional: slightly lighter border
    focusRing: {
      color: 'hsl(var(--ring))',
      width: '4px'
    },
    sm: {
      fontSize: '0.875rem',
      paddingX: '12px',
      paddingY: '8px',
    },
  },
};
