"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import {
  homeMyths,
  programmeSteps,
  resources,
  testimonials,
} from "@/lib/public-content";
import styles from "./premium-landing.module.css";

function useInViewOnce<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView] as const;
}

function useCountUp(target: number, start: boolean, duration = 1350) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration, start, target]);

  return value;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.18);
  const style = { ["--delay" as string]: `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${
        inView ? styles.revealVisible : ""
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function CounterCard({
  label,
  value,
  suffix = "",
  prefix = "",
  hint,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  hint: string;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.5);
  const display = useCountUp(value, inView, 1450);

  return (
    <article ref={ref} className={styles.counterCard}>
      <p className={styles.counterLabel}>{label}</p>
      <p className={styles.counterValue}>
        {prefix}
        {display.toLocaleString("en-US")}
        {suffix}
      </p>
      <p className={styles.counterHint}>{hint}</p>
    </article>
  );
}

export function PremiumLanding() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);
  const [pointer, setPointer] = useState({ x: 62, y: 34 });
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  const measurableTestimonials = useMemo(
    () =>
      testimonials.filter(
        (item) => item.before !== null && item.after !== null
      ),
    []
  );

  const featuredTestimonials = useMemo(() => {
    const source = measurableTestimonials.length
      ? measurableTestimonials
      : testimonials;
    const sorted = [...source].sort((a, b) => {
      const gainA =
        a.before !== null && a.after !== null ? a.after - a.before : 0;
      const gainB =
        b.before !== null && b.after !== null ? b.after - b.before : 0;
      return gainB - gainA;
    });
    return sorted.slice(0, 8);
  }, [measurableTestimonials]);

  const averageGain = useMemo(() => {
    if (!measurableTestimonials.length) return 180;
    const total = measurableTestimonials.reduce((sum, item) => {
      return sum + ((item.after ?? 0) - (item.before ?? 0));
    }, 0);
    return Math.round(total / measurableTestimonials.length);
  }, [measurableTestimonials]);

  const validatedCount = useMemo(() => {
    if (!measurableTestimonials.length) return 0;
    return measurableTestimonials.filter((item) => (item.after ?? 0) >= 785)
      .length;
  }, [measurableTestimonials]);

  const above900 = useMemo(() => {
    if (!measurableTestimonials.length) return 0;
    return measurableTestimonials.filter((item) => (item.after ?? 0) >= 900)
      .length;
  }, [measurableTestimonials]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute("data-step-index"));
          if (Number.isFinite(idx)) {
            setActiveStep((prev) => (prev === idx ? prev : idx));
          }
        });
      },
      { threshold: 0.56, rootMargin: "-10% 0px -24% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (featuredTestimonials.length < 2 || sliderPaused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredTestimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [featuredTestimonials.length, sliderPaused]);

  const activeProgramStep = programmeSteps[activeStep] ?? programmeSteps[0];
  const heroStyle = {
    ["--mx" as string]: `${pointer.x}%`,
    ["--my" as string]: `${pointer.y}%`,
  } as CSSProperties;

  const goPrev = () => {
    setSlideIndex((prev) =>
      prev === 0 ? featuredTestimonials.length - 1 : prev - 1
    );
  };

  const goNext = () => {
    setSlideIndex((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const handleHeroPointer = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setPointer({ x: Math.max(8, Math.min(92, x)), y: Math.max(8, Math.min(88, y)) });
  };

  return (
    <div className={styles.pageShell}>
      <section className={styles.hero}>
        <div
          className={styles.heroGrid}
          onMouseMove={handleHeroPointer}
          onMouseLeave={() => setPointer({ x: 62, y: 34 })}
          style={heroStyle}
        >
          <div className={styles.heroPanel}>
            <p className={styles.heroKicker}>Deep Training For TOEIC - Performance System</p>
            <h1 className={styles.heroTitle}>
              Tu ne revises plus au hasard.
              <br />
              <span>Tu entres dans un systeme.</span>
            </h1>
            <p className={styles.heroLead}>
              Une methode rigoureuse, un plan d&apos;execution, un Coach IA
              integre et un suivi structure. Ici, la progression n&apos;est pas
              une promesse marketing, c&apos;est un protocole.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryBtn}>
                Entrer dans le systeme
              </Link>
              <Link href="/programme" className={styles.secondaryBtn}>
                Explorer les 5 etapes
              </Link>
            </div>
            <div className={styles.heroStats}>
              <CounterCard
                label="Gain moyen"
                value={averageGain}
                prefix="+"
                suffix=" pts"
                hint="Progression mesuree"
              />
              <CounterCard
                label="Scores 785+"
                value={validatedCount}
                hint="Validation TOEIC"
              />
              <CounterCard
                label="Scores 900+"
                value={above900}
                hint="Performances elite"
              />
            </div>
            <div className={styles.scrollCue}>Scroll pour voir le systeme</div>
          </div>

          <div className={styles.commandCard}>
            <div className={styles.commandTop}>
              <p className={styles.commandTitle}>Mode mission active</p>
              <span className={styles.commandTag}>Coach IA ON</span>
            </div>
            <div className={styles.commandValueRow}>
              <span className={styles.scoreBadge}>545</span>
              <span className={styles.commandArrow}>-&gt;</span>
              <span className={`${styles.scoreBadge} ${styles.scoreTarget}`}>
                785
              </span>
            </div>
            <div className={styles.meterStack}>
              <div className={styles.meterRow}>
                <span className={styles.meterLabel}>Listening</span>
                <span className={styles.meterTrack}>
                  <span className={styles.meterFill} style={{ width: "74%" }} />
                </span>
                <span className={styles.meterValue}>372</span>
              </div>
              <div className={styles.meterRow}>
                <span className={styles.meterLabel}>Reading</span>
                <span className={styles.meterTrack}>
                  <span className={styles.meterFill} style={{ width: "59%" }} />
                </span>
                <span className={styles.meterValue}>305</span>
              </div>
              <div className={styles.meterRow}>
                <span className={styles.meterLabel}>Rigueur</span>
                <span className={styles.meterTrack}>
                  <span className={styles.meterFill} style={{ width: "83%" }} />
                </span>
                <span className={styles.meterValue}>83%</span>
              </div>
            </div>
            <div className={styles.commandFoot}>
              <span>Etape 3 - Reading sous chrono</span>
              <span className={styles.commandHint}>J-34</span>
            </div>
            <div className={styles.floatingCluster}>
              <span className={styles.floatingBadge}>Discipline</span>
              <span className={styles.floatingBadge}>Methode</span>
              <span className={styles.floatingBadge}>Execution</span>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Proposition de valeur</p>
          <h2 className={styles.sectionTitle}>
            Un programme premium pour transformer
            <br />
            l&apos;effort en score officiel.
          </h2>
          <p className={styles.sectionLead}>
            Deep Training For TOEIC n&apos;est pas un cours d&apos;anglais. C&apos;est
            un systeme de performance construit pour une execution stricte.
          </p>
        </Reveal>

        <div className={styles.valueGrid}>
          {[
            {
              title: "Systeme structure",
              body: "Plan unique, sequence precise, progression guidee. Tu sais exactement quoi faire chaque jour.",
              tag: "SYSTEM",
            },
            {
              title: "Discipline operationnelle",
              body: "Consignes claires, cadence controlee, prise de notes exploitable et suivi de regularite.",
              tag: "DISCIPLINE",
            },
            {
              title: "Coaching hybride",
              body: "Coach humain pour les decisions critiques et Coach IA pour l'execution quotidienne contextuelle.",
              tag: "COACH IA",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 110}>
              <article className={styles.valueCard}>
                <span className={styles.valueTag}>{item.tag}</span>
                <h3 className={styles.valueCardTitle}>{item.title}</h3>
                <p className={styles.valueCardBody}>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Fausses croyances</p>
          <h2 className={styles.sectionTitle}>
            Ce qui te fait stagner
            <br />
            alors que tu crois progresser.
          </h2>
        </Reveal>
        <div className={styles.mythGrid}>
          {homeMyths.slice(0, 8).map((myth, index) => (
            <Reveal key={myth.belief} delay={index * 70}>
              <article className={styles.mythCard}>
                <span className={styles.mythCross}>X</span>
                <p className={styles.mythBelief}>{myth.belief}</p>
                <p className={styles.mythTruth}>{myth.truth}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Programme en 5 etapes</p>
          <h2 className={styles.sectionTitle}>
            Une timeline de transformation,
            <br />
            pas une pile de ressources.
          </h2>
          <p className={styles.sectionLead}>
            Chaque etape construit la suivante. Tu progresses avec une logique
            d&apos;execution, pas par improvisation.
          </p>
        </Reveal>

        <div className={styles.timelineWrap}>
          <aside className={styles.stickyPanel}>
            <p className={styles.stickyLabel}>Etape active</p>
            <h3 className={styles.stickyTitle} style={{ color: activeProgramStep.color }}>
              {activeProgramStep.label}
            </h3>
            <p className={styles.stickySummary}>{activeProgramStep.summary}</p>
            <ul className={styles.stickyList}>
              {activeProgramStep.items.slice(0, 5).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/programme" className={styles.secondaryBtn}>
              Voir le detail complet
            </Link>
          </aside>

          <div className={styles.stepsList}>
            {programmeSteps.map((step, index) => (
              <Reveal key={step.label} delay={index * 85}>
                <article
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-step-index={index}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`${styles.stepCard} ${
                    activeStep === index ? styles.stepCardActive : ""
                  }`}
                  style={{ borderColor: step.color ?? "var(--border)" }}
                >
                  <div className={styles.stepMeta}>
                    <span className={styles.stepIndex}>{String(step.num).padStart(2, "0")}</span>
                    <span className={styles.stepLabel}>{step.label}</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepSummary}>{step.summary}</p>
                  <ul className={styles.stepBulletList}>
                    {step.items.map((item) => (
                      <li key={item} className={styles.stepBullet}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Ressources integrees</p>
          <h2 className={styles.sectionTitle}>
            Tout est pret pour executer.
            <br />
            Rien a assembler toi-meme.
          </h2>
        </Reveal>

        <div className={styles.resourceStage}>
          <div className={styles.resourceRail}>
            <div className={styles.resourceTrack}>
              {[...resources, ...resources].map((item, index) => (
                <span key={`${item}-${index}`} className={styles.resourceChip}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.resourceRail}>
            <div className={`${styles.resourceTrack} ${styles.reverse}`}>
              {[...resources, ...resources].map((item, index) => (
                <span key={`${item}-reverse-${index}`} className={styles.resourceChip}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.resourceGrid}>
          {[
            {
              icon: "01",
              title: "Prise de notes operationnelle",
              body: "Une methode exploitable sous pression pour convertir l'ecoute en points.",
            },
            {
              icon: "02",
              title: "Tableau de pilotage",
              body: "Suivi de scores, zones faibles, routines. Tu progresses avec des donnees claires.",
            },
            {
              icon: "03",
              title: "Coach IA contextuel",
              body: "Assistance instantanee basee sur ton etape, tes erreurs et ton objectif de score.",
            },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 110}>
              <article className={styles.resourceCard}>
                <span className={styles.resourceIcon}>{item.icon}</span>
                <h3 className={styles.resourceTitle}>{item.title}</h3>
                <p className={styles.resourceBody}>{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.sectionHeader}>
          <p className={styles.sectionKicker}>Resultats documentes</p>
          <h2 className={styles.sectionTitle}>
            Des progressions reelles.
            <br />
            Une execution qui se voit.
          </h2>
        </Reveal>

        <div
          className={styles.testiShell}
          onMouseEnter={() => setSliderPaused(true)}
          onMouseLeave={() => setSliderPaused(false)}
        >
          <div className={styles.sliderViewport}>
            <div
              className={styles.sliderTrack}
              style={{
                transform: `translateX(-${slideIndex * 100}%)`,
              }}
            >
              {featuredTestimonials.map((item) => {
                const gain =
                  item.before !== null && item.after !== null
                    ? item.after - item.before
                    : null;
                const quote =
                  item.quote.length > 275
                    ? `${item.quote.slice(0, 272)}...`
                    : item.quote;

                return (
                  <article key={item.id} className={styles.slide}>
                    <div className={styles.slideTop}>
                      <div className={styles.slideScore}>
                        {item.before !== null && item.after !== null ? (
                          <>
                            <span>{item.before}</span>
                            <span className={styles.commandArrow}>-&gt;</span>
                            <span>{item.after}</span>
                          </>
                        ) : (
                          <span>Temoignage valide</span>
                        )}
                      </div>
                      <span className={styles.slideGain}>
                        {gain !== null ? `+${gain} pts` : "Progression guidee"}
                      </span>
                    </div>
                    <p className={styles.slideQuote}>&quot;{quote}&quot;</p>
                    <div className={styles.slideMeta}>
                      <div>
                        <p className={styles.slideName}>{item.name}</p>
                        <p className={styles.slideInfo}>{item.info}</p>
                      </div>
                      <Link href="/resultats" className={styles.secondaryBtn}>
                        Voir plus
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className={styles.sliderControls}>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={goPrev}
              aria-label="Temoignage precedent"
            >
              Prev
            </button>
            <div className={styles.sliderDots}>
              {featuredTestimonials.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className={`${styles.sliderDot} ${
                    slideIndex === index ? styles.sliderDotActive : ""
                  }`}
                  onClick={() => setSlideIndex(index)}
                  aria-label={`Aller au temoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={goNext}
              aria-label="Temoignage suivant"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.finalCta}>
          <p className={styles.sectionKicker}>Candidature ouverte</p>
          <h2 className={styles.finalTitle}>
            Si ton objectif est clair,
            <br />
            entre dans un systeme qui execute.
          </h2>
          <p className={styles.finalLead}>
            Tu ne viens pas chercher des astuces. Tu viens chercher un cadre
            d&apos;execution, de la rigueur et une progression mesurable.
          </p>
          <div className={styles.finalActions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Soumettre ma candidature
            </Link>
            <Link href="/methode" className={styles.secondaryBtn}>
              Comprendre la methode
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
