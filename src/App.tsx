/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ThemeProvider } from './shared/providers/ThemeProvider';
import { Pages } from './pages/Index';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Pages />
    </ThemeProvider>
  );
}
