type Props = {
  title?: string;
  description?: string;
};

export function SavedViewsEmpty({
  title = 'No saved views yet',
  description = 'Saved views let you quickly return to your preferred setup. Save your current view to reuse it anytime.',
}: Props) {
  return (
    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
      <p className="font-medium text-foreground">
        {title}
      </p>
      <p className="mt-1">
        {description}
      </p>
    </div>
  );
}
