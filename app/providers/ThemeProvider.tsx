import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

function ThemeProvider_({ children }: { children: ReactNode }) {

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}

export default ThemeProvider_;
