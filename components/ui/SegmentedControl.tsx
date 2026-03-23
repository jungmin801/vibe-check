type SegmentedControlItem = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  items: SegmentedControlItem[];
  activeValue: string;
};

export function SegmentedControl({ items, activeValue }: SegmentedControlProps) {
  return (
    <div className="flex rounded-control bg-surface-elevated p-1">
      {items.map((item) => {
        const isActive = item.value === activeValue;

        return (
          <button
            key={item.value}
            type="button"
            className={
              isActive
                ? "rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white"
                : "rounded-md px-3 py-1.5 text-xs font-bold text-muted hover:text-ink"
            }
            aria-pressed={isActive}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
