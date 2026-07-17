import Container from "../common/Container";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-br
        from-orange-50
        via-white
        to-emerald-50

        pt-12
        pb-28

        lg:pt-20
        lg:pb-40
      "
    >
      {/* ================= Background Blurs ================= */}

      {/* Orange Blur */}
      <div
        className="
          absolute
          -right-40
          top-20

          h-[500px]
          w-[500px]

          rounded-full

          bg-orange-200/40

          blur-[140px]
        "
      />

      {/* Green Blur */}
      <div
        className="
          absolute
          -left-40
          bottom-0

          h-[450px]
          w-[450px]

          rounded-full

          bg-emerald-200/40

          blur-[140px]
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-[320px]
          w-[320px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-yellow-100/50

          blur-[130px]
        "
      />

      {/* Pattern */}
      <div
        className="
          absolute
          inset-0

          opacity-[0.03]

          [background-image:radial-gradient(#0f172a_1px,transparent_1px)]

          [background-size:35px_35px]
        "
      />

      {/* ================= Content ================= */}

      <Container>
        <div
          className="
            relative
            z-10

            grid
            items-center

            gap-16

            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-24
          "
        >
          <HeroContent />

          <HeroImage />
        </div>
      </Container>
    </section>
  );
}