import { RootLayout } from "@/components/layouts/RootLayout";
import { ConfigurationPanel } from "./components/pages/configuration/ConfigurationPanel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/core/tabs";

function App() {
  return (
    <RootLayout>
      <Tabs defaultValue="workspace" className="w-full">
        <TabsList className="mb-2">
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">Workspace.</TabsContent>
        <TabsContent value="configuration">
          <ConfigurationPanel />
        </TabsContent>
      </Tabs>
    </RootLayout>
  );
}

export default App;
