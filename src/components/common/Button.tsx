type ButtonProps = {
  text: string;
};

export default function Button({
  text,
}: ButtonProps) {
  return (
    <button
      className="
      rounded-xl
      bg-[#6C63FF]
      px-6
      py-3
      text-white
      font-semibold
      transition
      duration-300
      hover:scale-105
      hover:shadow-xl
      "
    >
      {text}
    </button>
  );
}