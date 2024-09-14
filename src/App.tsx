import { RootLayout } from "@/components/layouts/RootLayout";
import { ConfigurationPanel } from "./pages/configuration/ConfigurationPanel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/tabs";
import { WorkspaceRoot } from "./pages/workspace";

function App() {
  return (
    <RootLayout>
      <Tabs
        defaultValue="workspace"
        className="grow w-full flex flex-col items-start"
      >
        <TabsList className="mb-2">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <div className="flex gap-2 grow w-full">
          <TabsContent value="workspace" className="flex basis-1/2">
            <WorkspaceRoot />
          </TabsContent>
          <TabsContent value="configuration" className="flex basis-1/2">
            <ConfigurationPanel />
          </TabsContent>
        </div>
      </Tabs>
    </RootLayout>
  );
}

export default App;
