import { RootLayout } from "@/components/layouts/RootLayout";
import { WorkspaceRoot } from "./pages/workspace";
import { TopActionBar } from "./pages/workspace/components/TopActionBar";

function App() {
  return (
    <RootLayout>
      <TopActionBar />
      <WorkspaceRoot />
    </RootLayout>
  );
}

export default App;
