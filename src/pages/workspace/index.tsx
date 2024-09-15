import { FileArea } from "./components/FileArea";

export function WorkspaceRoot() {
  return (
    <div
      className="grid grid-cols-2 w-full grow mt-2"
      style={{
        height: "calc(100vh - 69px)",
      }}
    >
      <FileArea />
    </div>
  );
}
