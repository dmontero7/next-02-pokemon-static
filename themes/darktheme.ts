import { createTheme } from "@nextui-org/react"

export const darkTheme = createTheme({
  type: 'dark', 
  theme: {
    colors: {
        background: '#213655',
        text:'#f5efe7'
    }, // override dark theme colors
  }
});