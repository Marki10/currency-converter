'use client';

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;

  return (
    <div className="w-full rounded-lg bg-red-50 border border-red-200 text-red-800 px-4 py-2 text-sm">
      {message}
    </div>
  );
}
