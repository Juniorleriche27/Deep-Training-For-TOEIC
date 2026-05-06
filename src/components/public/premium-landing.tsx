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

function isPerformanceViewport() {
  return (
    typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function usePerformanceMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)"
    );
    const update = () => setEnabled(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return enabled;
}

function useInViewOnce<T extends HTMLElement>(threshold = 0.25, disabled = false) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => disabled || isPerformanceViewport());

  useEffect(() => {
    if (!disabled && !isPerformanceViewport()) return;

    const frame = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(frame);
  }, [disabled]);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView || disabled || isPerformanceViewport()) return;

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
  }, [disabled, inView, threshold]);

  return [ref, inView] as const;
}

function useCountUp(target: number, start: boolean, duration = 1350, disabled = false) {
  const [value, setValue] = useState(() =>
    disabled || isPerformanceViewport() ? target : 0
  );

  useEffect(() => {
    if (!disabled && !isPerformanceViewport()) return;

    const frame = requestAnimationFrame(() => setValue(target));
    return () => cancelAnimationFrame(frame);
  }, [disabled, target]);

  useEffect(() => {
    if (disabled || isPerformanceViewport() || !start) return;
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
  }, [disabled, duration, start, target]);

  return value;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  disabled?: boolean;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.18, disabled);
  const style = { ["--delay" as string]: `${delay}ms` } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${
        inView || disabled ? styles.revealVisible : ""
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
  disabled = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  hint: string;
  disabled?: boolean;
}) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.5, disabled);
  const display = useCountUp(value, inView, 1450, disabled);

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
  const performanceMode = usePerformanceMode();
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
    if (performanceMode) return;
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
  }, [performanceMode]);

  useEffect(() => {
    if (performanceMode || featuredTestimonials.length < 2 || sliderPaused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % featuredTestimonials.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [featuredTestimonials.length, performanceMode, sliderPaused]);

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
    if (performanceMode) return;
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
              Tu ne révises plus au hasard.
              <br />
              <span>Tu entres dans un système.</span>
            </h1>
            <p className={styles.heroLead}>
              Une méthode rigoureuse, un plan d&apos;exécution, un Coach IA intégré,
              des ressources bien ordonnées et un suivi structuré pour transformer
              l&apos;effort en score officiel.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryBtn}>
                Entrer dans le système
              </Link>
              <Link href="/programme" className={styles.secondaryBtn}>
                Explorer les 5 étapes
              </Link>
            </div>
            <div className={styles.heroStats}>
              <CounterCard
                label="Gain moyen"
                value={averageGain}
                prefix="+"
                disabled={performanceMode}
                suffix=" pts"
                hint="Progression mesurée"
              />
              <CounterCard
                label="Scores 785+"
                value={validatedCount}
                disabled={performanceMode}
                hint="Validation TOEIC"
              />
              <CounterCard
                label="Scores 900+"
                value={above900}
                disabled={performanceMode}
                hint="Performances elite"
              />
            </div>
            <div className={styles.scrollCue}>Découvrir le système</div>
          </div>

          <div className={styles.commandCard}>
            <div className={styles.commandTop}>
              <p className={styles.commandTitle}>Mission en cours</p>
              <span className={styles.commandTag}>Coach IA actif</span>
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
              <span>Étape 3 - Reading sous chrono</span>
              <span className={styles.commandHint}>J-34</span>
            </div>
            <div className={styles.floatingCluster}>
              <span className={styles.floatingBadge}>Discipline</span>
              <span className={styles.floatingBadge}>Méthode</span>
              <span className={styles.floatingBadge}>Exécution</span>
            </div>
            <div className={styles.commandProtocol}>
              <article className={styles.protocolCard}>
                <p className={styles.protocolLabel}>Avant mission</p>
                <p className={styles.protocolBody}>
                  45 min au calme, guide d&apos;astuces, tableau de bord, notes
                  et reprise ciblée des erreurs précédentes.
                </p>
              </article>
              <article className={styles.protocolCard}>
                <p className={styles.protocolLabel}>Pendant mission</p>
                <p className={styles.protocolBody}>
                  Concentration totale et exécution stricte vers l&apos;objectif
                  de performance.
                </p>
              </article>
              <article className={styles.protocolCard}>
                <p className={styles.protocolLabel}>Après mission</p>
                <p className={styles.protocolBody}>
                  Capture des résultats, score de première tentative et feedbacks
                  réintégrés au programme.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.experienceStrip}>
          <div className={styles.experienceIntro}>
            <p className={styles.sectionKicker}>Architecture claire</p>
            <h2 className={styles.sectionTitle}>
              Un site public pour convaincre.
              <br />
              Un espace adherent pour executer.
            </h2>
            <p className={styles.sectionLead}>
              Le visiteur comprend la promesse, le candidat passe a l&apos;action,
              puis l&apos;adherent retrouve un cockpit separe pour suivre son programme,
              ses scores, ses ressources et son Coach IA.
            </p>
          </div>
          <div className={styles.experienceGrid}>
            <article className={styles.experienceCard}>
              <span className={styles.valueTag}>SITE PUBLIC</span>
              <h3>Comprendre, verifier, candidater.</h3>
              <p>
                Methode, programme, resultats, tarifs, FAQ et prise de contact
                sont organises pour transformer la curiosite en decision.
              </p>
            </article>
            <article className={styles.experienceCard}>
              <span className={styles.valueTag}>ESPACE ADHERENT</span>
              <h3>Piloter l&apos;execution.</h3>
              <p>
                Tableau de bord, missions, notes, ressources, scores et support
                restent dans un environnement de travail distinct du site vitrine.
              </p>
            </article>
          </div>
        </Reveal>
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
            Deep Training For TOEIC n&apos;est pas un simple cours d&apos;anglais.
            C&apos;est un système de performance construit pour une exécution plus nette.
          </p>
        </Reveal>

        <div className={styles.valueGrid}>
          {[
            {
              title: "Système structuré",
              body: "Plan unique, séquence précise, progression guidée. Tu sais quoi faire, quand et pourquoi.",
              tag: "SYSTEM",
            },
            {
              title: "Discipline opérationnelle",
              body: "Consignes claires, cadence contrôlée, prise de notes utile et suivi régulier.",
              tag: "DISCIPLINE",
            },
            {
              title: "Coach IA intégré",
              body: "Le Coach IA accompagne la progression, relance l'exécution et maintient le cap au quotidien.",
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
          <p className={styles.sectionKicker}>Protocole de mission</p>
          <h2 className={styles.sectionTitle}>
            Avant, pendant et après:
            <br />
            une exécution précise.
          </h2>
          <p className={styles.sectionLead}>
            Chaque mission suit un protocole clair pour protéger la concentration,
            mesurer la première tentative et accélérer la progression.
          </p>
        </Reveal>

        <div className={styles.valueGrid}>
          {[
            {
              title: "Avant la mission",
              body: "Analyser la consigne, prévoir 45 minutes minimum au calme, consulter le guide d'astuces, vérifier la mission sur le tableau de bord et reprendre les points ratés.",
              tag: "01",
            },
            {
              title: "Pendant la mission",
              body: "Réaliser la mission avec concentration, en visant l'objectif de performance sans dispersion.",
              tag: "02",
            },
            {
              title: "Après la mission",
              body: "Partager la capture des résultats, noter le score de première tentative et réintégrer les feedbacks dans le programme d'entraînement.",
              tag: "03",
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
          <p className={styles.sectionKicker}>Programme en 5 étapes</p>
          <h2 className={styles.sectionTitle}>
            Une timeline de transformation,
            <br />
            pas une pile de ressources.
          </h2>
          <p className={styles.sectionLead}>
            Chaque étape construit la suivante. Tu progresses avec une logique
            d&apos;exécution, pas par improvisation.
          </p>
        </Reveal>

        <div className={styles.timelineWrap}>
          <aside className={styles.stickyPanel}>
            <p className={styles.stickyLabel}>Étape active</p>
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
              Voir le détail complet
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
                  onMouseEnter={() => {
                    if (!performanceMode) setActiveStep(index);
                  }}
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
          <p className={styles.sectionKicker}>Ressources intégrées</p>
          <h2 className={styles.sectionTitle}>
            Tout est prêt pour exécuter.
            <br />
            Rien à assembler toi-même.
          </h2>
        </Reveal>

        <Reveal className={styles.resourceStageReveal}>
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
        </Reveal>

        <div className={styles.resourceGrid}>
          {[
            {
              icon: "01",
              title: "Prise de notes opérationnelle",
              body: "Une méthode exploitable sous pression pour convertir l'écoute en points.",
            },
            {
              icon: "02",
              title: "Tableau de pilotage",
              body: "Suivi des scores, zones faibles, routines. Tu progresses avec des données claires.",
            },
            {
              icon: "03",
              title: "Coach IA contextuel",
              body: "Accompagnement guidé selon ton étape, tes erreurs fréquentes, ton score cible et le protocole de mission.",
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
          <p className={styles.sectionKicker}>Résultats documentés</p>
          <h2 className={styles.sectionTitle}>
            Des progressions réelles.
            <br />
            Une exécution qui se voit.
          </h2>
        </Reveal>

        <Reveal className={styles.testiReveal}>
          <div
            className={styles.testiShell}
            onMouseEnter={() => {
              if (!performanceMode) setSliderPaused(true);
            }}
            onMouseLeave={() => {
              if (!performanceMode) setSliderPaused(false);
            }}
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
                          <span>Témoignage validé</span>
                        )}
                      </div>
                      <span className={styles.slideGain}>
                        {gain !== null ? `+${gain} pts` : "Progression guidée"}
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
              Précédent
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
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.sliderBtn}
              onClick={goNext}
              aria-label="Témoignage suivant"
            >
              Suivant
            </button>
          </div>
          </div>
        </Reveal>
      </section>

      <div className={styles.divider} />

      <section className={styles.section}>
        <Reveal className={styles.finalCta}>
          <p className={styles.sectionKicker}>Candidature ouverte</p>
          <h2 className={styles.finalTitle}>
            Si ton objectif est clair,
            <br />
            entre dans un système qui exécute.
          </h2>
          <p className={styles.finalLead}>
            Tu ne viens pas chercher des astuces isolées. Tu viens chercher un cadre
            d&apos;exécution, de la rigueur et une progression mesurable.
          </p>
          <div className={styles.finalActions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Soumettre ma candidature
            </Link>
            <Link href="/methode" className={styles.secondaryBtn}>
              Comprendre la méthode
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
