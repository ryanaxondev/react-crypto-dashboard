type Props = {
  message?: string;
};

export function SavedViewsEmpty({ message }: Props) {
  return (
    <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
      <p className="font-medium">No saved views yet.</p>
      <p className="mt-1">
        {message ??
          'Save your current setup to reuse it later.'}
      </p>
    </div>
  );
}
