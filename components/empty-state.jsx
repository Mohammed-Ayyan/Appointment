import { Button } from "@/components/ui/button";
import { SearchX, AlertCircle, FileX, Inbox } from "lucide-react";

const icons = {
  search: SearchX,
  alert: AlertCircle,
  file: FileX,
  empty: Inbox,
};

export default function EmptyState({
  icon = "empty",
  title = "Nothing here yet",
  description = "",
  action = null,
}) {
  const IconComponent = icons[icon] || Inbox;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in-up">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/80 mb-5">
        <IconComponent className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1.5">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-5">
          {description}
        </p>
      )}
      {action && (
        <Button variant="outline" onClick={action.onClick} className="gap-2">
          {action.label}
        </Button>
      )}
    </div>
  );
}
