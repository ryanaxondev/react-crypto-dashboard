import { useState } from 'react';
import type { SavedView } from '@/hooks/useSavedViews';
import { SavedViewItem } from './SavedViewItem';
import { SavedViewsEmpty } from './SavedViewsEmpty';

type Props<T> = {
  views: SavedView<T>[];
  onSave: (name: string) => void;
  onApply: (slug: string) => void;
  onRename?: (slug: string, name: string) => void;
  onDelete: (slug: string) => void;
};

export function SavedViewsPanel<T>({
  views,
  onSave,
  onApply,
  onRename,
  onDelete,
}: Props<T>) {
  const [name, setName] = useState('');

  const isValidName = !!name.trim();

  const handleSave = () => {
    if (!isValidName) return;

    onSave(name.trim());
    setName('');
  };

  const handleDelete = (slug: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this view?'
    );
    if (!confirmed) return;

    onDelete(slug);
  };

  return (
    <section className="space-y-3">
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-3 py-2 text-sm"
          placeholder="Save current view..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          disabled={!isValidName}
          onClick={handleSave}
          className="
            rounded bg-blue-600 px-3 py-2 text-sm text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Save
        </button>
      </div>

      {views.length === 0 ? (
        <SavedViewsEmpty />
      ) : (
        <div className="space-y-2">
          {views.map((view) => (
            <SavedViewItem
              key={view.slug}
              name={view.name}
              onApply={() => onApply(view.slug)}
              onRename={
                onRename
                  ? (newName) =>
                      onRename(view.slug, newName)
                  : undefined
              }
              onDelete={() =>
                handleDelete(view.slug)
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
