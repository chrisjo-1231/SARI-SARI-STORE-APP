interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ProductModal({
  open,
  onClose,
  children,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-lg w-[500px] p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}