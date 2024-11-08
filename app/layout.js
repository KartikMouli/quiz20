import localFont from "next/font/local";
import "./globals.css";
import { QuizProvider } from "./context/quizContext";

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
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <main className="flex-grow">{children}</main>
        </body>
      </html>
    </QuizProvider>
  );
}
