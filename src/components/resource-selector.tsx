import { BookMarked } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Resource } from "@/types/calendar";

interface ResourceSelectorProps {
  resources: Resource[];
  selectedResource: string | null;
  onResourceChange: (resourceId: string | null) => void;
}

export function ResourceSelector({
  resources,
  selectedResource,
  onResourceChange,
}: ResourceSelectorProps) {
  const groupedResources =
    resources &&
    resources.reduce(
      (acc, resource) => {
        const type = resource.type;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(resource);
        return acc;
      },
      {} as Record<string, Resource[]>
    );

  return (
    <Select
      value={selectedResource || ""}
      onValueChange={(value) => onResourceChange(value || null)}
    >
      <SelectTrigger className="w-[200px] h-10">
        <div className="flex items-center gap-2">
          <BookMarked className="h-4 w-4" />
          <SelectValue placeholder="All Resources" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Resources</SelectItem>{" "}
        {/* Changed value from "" to "all" */}
        {groupedResources &&
          Object.entries(groupedResources).map(([type, resources]) => (
            <SelectGroup key={type}>
              <SelectLabel className="capitalize">{type}s</SelectLabel>
              {resources.map((resource) => (
                <SelectItem key={resource.id} value={resource.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: resource.color || "currentColor",
                      }}
                    />
                    {resource.name}
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
      </SelectContent>
    </Select>
  );
}
