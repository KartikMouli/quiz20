import localFont from "next/font/local";
import "./globals.css";
import { QuizProvider } from "./context/quizContext";
import { ThemeProvider} from "./components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Quiz20 - Next.js App",
  description: "A Next.js quiz application powered by Quiz20",
};

export default function RootLayout({ children }) {
  return (

    <QuizProvider>

      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main className="flex-grow">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
            >
              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>

    </QuizProvider>

  );
}
