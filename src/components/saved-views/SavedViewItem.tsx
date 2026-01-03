import { useState } from 'react';

type Props = {
  name: string;
  onApply: () => void;
  onRename?: (newName: string) => void;
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

  const startEdit = () => {
    setValue(name);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setValue(name);
    setIsEditing(false);
  };

  const commitEdit = () => {
    if (!onRename) return cancelEdit();

    const trimmed = value.trim();
    if (!trimmed) return cancelEdit();

    if (trimmed !== name) {
      onRename(trimmed);
    }

    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border p-2">
      {isEditing ? (
        <input
          className="flex-1 rounded border px-2 py-1 text-sm"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={cancelEdit}
        />
      ) : (
        <span className="text-sm font-medium">
          {name}
        </span>
      )}

      {!isEditing && (
        <div className="flex items-center gap-1">
          <button
            className="text-xs text-blue-600"
            onClick={onApply}
          >
            Apply
          </button>

          {onRename && (
            <button
              className="text-xs text-muted-foreground"
              onClick={startEdit}
              title="Rename"
            >
              ✏
            </button>
          )}

          <button
            className="text-xs text-red-600"
            onClick={onDelete}
            title="Delete"
          >
            🗑
          </button>
        </div>
      )}
    </div>
  );
}
