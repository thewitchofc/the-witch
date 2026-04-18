const pillars = [
  {
    title: 'לא תבניות',
    body: 'כל אתר נבנה מאפס.\nבלי מגבלות ובלי קיצורי דרך.',
  },
  {
    title: 'חשיבה על תוצאה',
    body: 'כל החלטה באתר נועדה להוביל לפעולה.\nלא רק להיראות טוב.',
  },
  {
    title: 'דיוק בפרטים',
    body: 'ההבדל בין אתר רגיל לאתר שמביא לקוחות נמצא בפרטים הקטנים.',
  },
] as const

/** למה לבחור — אמון בלי התחננות */
export function WhyItWorksDifferent() {
  return (
    <section
      className="mx-auto max-w-5xl px-6 py-24 text-center text-white md:py-32"
      dir="rtl"
      lang="he"
      aria-labelledby="why-fit-heading"
    >
      <h2
        id="why-fit-heading"
        className="mb-16 text-balance text-2xl font-semibold tracking-tight text-white md:text-4xl"
      >
        לא כולם מתאימים לעבוד איתי ויש לזה סיבה
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {pillars.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-md md:p-6"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
            <p className="whitespace-pre-line text-pretty text-sm leading-relaxed text-gray-300">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
