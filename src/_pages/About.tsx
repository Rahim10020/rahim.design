export default function AboutPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                About
              </h1>
              <p className="text-foreground text-2xl leading-relaxed mx-auto max-w-xl">
                I am a web developer, UX/UI designer and freelancer based at
                Lome/Togo.
              </p>
              <p className="text-foreground text-xl leading-relaxed mx-auto max-w-xl">
                At first I just wanted to understand how things worked. Then I
                started coding. Then I realized that writing code was only part
                of the problem. We also had to understand what people were
                actually going to use. This is where design, UX and development
                started to come together for me. Today I love being able to move
                from idea to interface and then from interface to actual
                product.
              </p>
            </div>
            <div>
              <img
                src="/images/others/rahim-cartoon.png"
                alt="Rahim image"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
