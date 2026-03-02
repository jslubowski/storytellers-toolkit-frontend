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
        danger: {
          background: '{error.500}',
          hoverBackground: '{error.400}',
          activeBackground: '{error.900}',
          borderColor: '{error.500}',
          hoverBorderColor: '{error.400}',
          activeBorderColor: '{error.700}',
          color: 'white',
          hoverColor: 'white',
          activeColor: 'white',
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
        danger: {
          background: '{error.500}',
          hoverBackground: '{error.400}',
          activeBackground: '{error.900}',
          borderColor: '{error.500}',
          hoverBorderColor: '{error.400}',
          activeBorderColor: '{error.700}',
          color: 'white',
          hoverColor: 'white',
          activeColor: 'white',
        }
      }
    },
  }
};
