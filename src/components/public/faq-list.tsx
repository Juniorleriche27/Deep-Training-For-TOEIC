type FaqItem = { q: string; a: string };

export function FaqList({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.q} className="faq-item" open={openFirst && index === 0}>
          <summary className="faq-question">
            <span>{item.q}</span>
            <span>+</span>
          </summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
