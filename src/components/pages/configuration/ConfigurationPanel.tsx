import { Input } from "@/components/core/input";
import { Label } from "@/components/core/label";

export function ConfigurationPanel() {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6 grid-cols-2">
        <fieldset className="flex flex-col gap-6 rounded-lg border p-4 h-full">
          <legend className="-ml-1 px-1 text-sm font-medium">
            Model settings
          </legend>
          <div className="flex flex-col gap-3">
            <Label htmlFor="model">Model</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="temperature">Temperature</Label>
            <Input id="temperature" type="number" placeholder="0.4" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="top-p">Top P</Label>
              <Input id="top-p" type="number" placeholder="0.7" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div>
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-6 rounded-lg border p-4  h-full">
          <legend className="-ml-1 px-1 text-sm font-medium">API keys</legend>
          <div className="grid gap-3">
            <Label htmlFor="temperature">Google Cloud Vision API Key</Label>
            <Input
              id="googleCloudVisionKey"
              type="password"
              placeholder="GCP Cloud vision API Key"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="openAiGptKey">OpenAI GPT API Key</Label>
            <Input
              id="openAiGptKey"
              type="password"
              placeholder="OpenAI GPT API Key"
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
}
