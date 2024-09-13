interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full min-h-screen relative bg-white p-4">{children}</div>
  );
}
