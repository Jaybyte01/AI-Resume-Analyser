import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <title>ResumeAI - AI-Powered Resume Analysis</title>
        <meta
          name="description"
          content="Optimize your resume with AI-powered analysis. Get ATS scores, keyword suggestions, and job matching insights."
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              function setTheme() {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              }
              setTheme();
              window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setTheme);
            })();
          `,
          }}
        />
      </head>
      <body className="h-full">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
