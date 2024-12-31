import 'styled-components';
import { ThemeType } from './components/CalendarPicker/types';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
} 