import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { JsonLd } from "../components/JsonLd";
import { Seo } from "../components/Seo";
import { FAQ_ITEMS } from "../data/faqContent";
import { trackEvent } from "../lib/analytics";
import { buildFaqPageJsonLd } from "../seo/structuredData";

const MotionLink = motion(Link);

const ctaRestShadow =
  "0 2px 16px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.22), 0 0 28px rgba(34, 211, 238, 0.1)";
const ctaHoverShadow =
  "0 8px 28px rgba(0, 0, 0, 0.45), 0 0 28px rgba(167, 139, 250, 0.35), 0 0 40px rgba(34, 211, 238, 0.16)";

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
        title="שאלות נפוצות — The Witch"
        description="מחירים, זמני פיתוח, WordPress מול קוד מלא, תחזוקה ועוד. תשובות קצרות לפני שמבקשים הצעת מחיר לאתר."
        path="/faq"
      />
      <section className="py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">

        <h1 className="mb-12 text-3xl font-semibold text-white md:text-4xl">
          שאלות נפוצות
        </h1>

        <div className="space-y-4 text-right">

          {FAQ_ITEMS.map((item, index) => (
            <button
              key={index}
              type="button"
              className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 text-right backdrop-blur-md transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/70"
              onClick={() => toggle(index)}
              aria-expanded={openIndex === index}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-medium text-white md:text-lg">
                  {item.question}
                </h3>
                <span className="shrink-0 text-2xl text-white" aria-hidden>
                  {openIndex === index ? "−" : "+"}
                </span>
              </div>

              {openIndex === index ? (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-300">{item.answer}</p>
              ) : null}
            </button>
          ))}

        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-base text-slate-300 md:text-lg">
            עדיין מתלבט?
          </p>

          <p className="mb-6 text-base text-slate-300">
            ממלאים את השאלון ורואים אם זה מתאים.
          </p>

          <div className="relative mx-auto mt-3 flex w-full max-w-[260px] justify-center overflow-visible md:mt-0 md:w-fit md:max-w-none">
            <div
              className="pointer-events-none absolute inset-[-5px] rounded-full bg-gradient-to-r from-cyan-400/45 via-violet-500/40 to-fuchsia-500/40 opacity-75 blur-md md:inset-[-6px] md:opacity-80 md:blur-lg"
              aria-hidden
            />
            <MotionLink
              to="/apply#contact"
              aria-label="בדיקת התאמה לפרויקט — מעבר לטופס יצירת קשר"
              className="group relative z-10 flex w-full min-w-0 touch-manipulation rounded-full bg-gradient-to-l from-cyan-400 via-violet-500 to-fuchsia-500 p-[1.5px] no-underline shadow-[0_0_1px_rgba(255,255,255,0.12)] transition-shadow duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400/80 active:opacity-95 md:inline-flex md:w-auto"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "faq_primary",
                  link_url: "/apply#contact",
                })
              }
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, boxShadow: ctaRestShadow }}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: ctaHoverShadow,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <span className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-gradient-to-b from-slate-900/98 via-slate-950/98 to-slate-950 px-6 py-3 text-center text-base font-medium text-white shadow-inner shadow-black/40 ring-1 ring-inset ring-white/12 backdrop-blur-md transition-[background-color,box-shadow,ring-color] duration-300 ease-out group-hover:from-slate-900/92 group-hover:via-slate-950 group-hover:to-slate-950 group-hover:ring-white/22 md:min-h-[48px] md:w-auto md:px-8 md:py-4 md:text-lg">
                {ctaLabel}
              </span>
            </MotionLink>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
