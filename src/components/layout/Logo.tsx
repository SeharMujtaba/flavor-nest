export default function Logo() {
  return (
    <div className="flex cursor-pointer items-center gap-3">

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-orange-500
          to-orange-600
          text-xl
          font-bold
          text-white
          shadow-md
        "
      >
        F
      </div>

      <div>

        <h1 className="text-3xl font-extrabold leading-none">

          <span className="text-slate-900">
            Flavor
          </span>

          <span className="text-orange-500">
            Nest
          </span>

        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Fresh • Fast • Delicious
        </p>

      </div>

    </div>
  );
}