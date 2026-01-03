import { useEffect, useState } from 'react';

type Props = {
  name: string;
  onApply: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
};

export function SavedViewItem({
  name,
  onApply,
  onRename,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);

  // Sync local value when parent name changes
  useEffect(() => {
    setValue(name);
  }, [name]);

  const handleRename = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    onRename(trimmed);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setValue(name);
  };

  const handleDelete = () => {
    const ok = window.confirm(
      'Are you sure you want to delete this saved view?'
    );
    if (ok) onDelete();
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border p-2">
      {isEditing ? (
        <input
          className="flex-1 rounded border px-2 py-1 text-sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') handleCancelEdit();
          }}
          autoFocus
        />
      ) : (
        <span className="text-sm font-medium">
          {name}
        </span>
      )}

      <div className="flex items-center gap-1">
        {isEditing ? (
          <button
            className="text-xs text-green-600"
            onClick={handleRename}
          >
            ✔
          </button>
        ) : (
          <>
            <button
              className="text-xs text-blue-600"
              onClick={onApply}
            >
              Apply
            </button>

            <button
              className="text-xs text-muted-foreground"
              onClick={() => setIsEditing(true)}
            >
              ✏
            </button>

            <button
              className="text-xs text-red-600"
              onClick={handleDelete}
            >
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}
