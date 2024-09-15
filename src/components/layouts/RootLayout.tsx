interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col w-full min-h-screen relative bg-white p-2">
      {children}
    </div>
  );
}
