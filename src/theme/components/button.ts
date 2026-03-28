export const buttonDesign = {
  root: {
    sm: {
      fontSize: '0.8rem'
    },
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          color: '#111418',
          hoverBackground: '{primary.800}',
          hoverBorderColor: '{primary.600}',
        },
        warn: {
          background: '{error.500}',
          hoverBackground: '{error.400}',
          activeBackground: '{error.900}',
          borderColor: '{error.500}',
          hoverBorderColor: '{error.400}',
          activeBorderColor: '{error.700}',
          color: 'white',
          hoverColor: 'white',
          activeColor: 'white',
        },
        danger: {
          color: 'white',
        }
      }
    },
    dark: {
      root: {
        primary: {
          color: '#111418',
          hoverBackground: '{primary.600}',
          hoverBorderColor: '{primary.600}',
        },
        warn: {
          background: 'transparent',
          hoverBackground: '{error.500}',
          activeBackground: '{error.900}',
          borderColor: 'transparent',
          hoverBorderColor: '{error.500}',
          activeBorderColor: '{error.900}',
          color: 'white',
          hoverColor: 'white',
          activeColor: 'white',
        },
        danger: {
          color: 'white',
          hoverColor: 'white',
          background: '{danger.500}',
          borderColor: '{danger.500}',
          hoverBackground: '{danger.600}',
          hoverBorderColor: '{danger.600}',
        }
      }
    },
  }
};
