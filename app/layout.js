import './globals.css';
import { SITE } from '@/lib/site';

// Minimal root layout — <html>/<body> are rendered by app/[lang]/layout.js so each
// locale carries the right lang attribute. See the App Router i18n pattern.
export const metadata = { metadataBase: new URL(SITE) };

export default function RootLayout({ children }) {
  return children;
}
