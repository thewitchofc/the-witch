import { useState } from "react";
import { CustomLink } from "../components/CustomLink";
import { JsonLd } from "../components/JsonLd";
import { Seo } from "../components/Seo";
import { FAQ_ITEMS } from "../data/faqContent";
import { trackEvent } from "../lib/analytics";
import { primaryCtaInnerClass, primaryCtaOuterClass } from "../lib/primaryCtaClasses";
import { buildFaqPageJsonLd } from "../seo/structuredData";

const ctaLabel = "בדיקת התאמה לפרויקט";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <JsonLd data={buildFaqPageJsonLd()} />
      <Seo
        title="שאלות נפוצות, The Witch"
        description="מחירים, זמני פיתוח, WordPress מול קוד מלא, תחזוקה ועוד. תשובות קצרות לפני שמבקשים הצעת מחיר לאתר."
        path="/faq"
      />
      <div className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#020617] text-white supports-[min-height:100dvh]:min-h-[100dvh]">
        <div
          className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-28 top-80 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.10),transparent_48%)]"
          aria-hidden
        />

        <div className="relative z-10">
          <section className="px-4 py-20 text-center md:py-24">
            <div className="mx-auto max-w-3xl">
              <header className="mb-12 md:mb-14">
                <p className="mx-auto mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-1 text-xs font-medium text-cyan-100">
                  לפני שמתחילים
                </p>
                <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
                  שאלות נפוצות
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-300 md:text-lg">
                  כל מה שכדאי לדעת לפני שבונים אתר: תהליך, מחירים, קוד מלא, תחזוקה ומה קורה אחרי העלייה לאוויר.
                </p>
              </header>

              <div className="space-y-4 text-right">
                {FAQ_ITEMS.map((item, index) => {
                  const isOpen = openIndex === index
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`group w-full cursor-pointer rounded-3xl border p-5 text-right ring-1 ring-white/[0.04] backdrop-blur-md transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70 md:p-6 ${
                        isOpen
                          ? "border-cyan-300/25 bg-cyan-300/[0.07] shadow-[0_0_34px_rgba(34,211,238,0.10)]"
                          : "border-white/10 bg-white/[0.045] hover:-translate-y-0.5 hover:border-violet-300/25 hover:bg-white/[0.065]"
                      }`}
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[0.08] text-xs font-semibold text-violet-100">
                            {index + 1}
                          </span>
                          <h3 className="text-base font-semibold text-white md:text-lg">{item.question}</h3>
                        </div>
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-2xl leading-none transition ${
                            isOpen
                              ? "border-cyan-300/25 bg-cyan-300/[0.10] text-cyan-100"
                              : "border-white/10 bg-white/[0.04] text-white group-hover:border-violet-300/25"
                          }`}
                          aria-hidden
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>

                      {isOpen ? (
                        <p className="mt-5 whitespace-pre-line border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-300 md:text-base">
                          {item.answer}
                        </p>
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="mt-16 rounded-3xl border border-violet-300/15 bg-gradient-to-l from-violet-500/[0.12] via-slate-950/70 to-cyan-500/[0.08] px-6 py-10 text-center shadow-[0_0_46px_rgba(139,92,246,0.12)] ring-1 ring-white/[0.05] backdrop-blur-xl md:px-10 md:py-12">
                <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
                  עדיין מתלבט?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                  ממלאים שאלון קצר ובודקים אם הפרויקט מתאים, בלי התחייבות.
                </p>

                <div className="relative mx-auto mt-7 flex w-full max-w-[260px] justify-center overflow-visible md:w-fit md:max-w-none">
                  <CustomLink
                    to="/apply#contact"
                    aria-label="בדיקת התאמה לפרויקט, מעבר לטופס יצירת קשר"
                    className={primaryCtaOuterClass}
                    onClick={() =>
                      trackEvent("cta_click", {
                        cta_location: "faq_primary",
                        link_url: "/apply#contact",
                      })
                    }
                  >
                    <span className={primaryCtaInnerClass}>{ctaLabel}</span>
                  </CustomLink>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
