'use client';

import React, { useState } from 'react';
import styles from './FaqSection.module.css';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'Como funciona o processo de compra?',
    a: 'Você configura sua camiseta ALTA7 escolhendo modelo (Feminino/Masculino), cor, tecido, estampa e tamanho. Ao finalizar, o pedido é enviado diretamente para o nosso atendimento no WhatsApp para confirmação rápida de envio.',
  },
  {
    q: 'Qual a diferença entre os 3 tecidos?',
    a: 'O Cotton é 100% algodão casual macio. O Performance é tecido técnico leve com microfuros para alta mobilidade. O Premium é algodão penteado de alta gramatura com modelagem street fit mais encorpada.',
  },
  {
    q: 'Qual o prazo de envio e entrega?',
    a: 'Após a confirmação pelo WhatsApp, a produção e postagem ocorrem em até 2 dias úteis. Enviamos para todo o Brasil com código de rastreio.',
  },
  {
    q: 'Posso trocar se o tamanho não servir?',
    a: 'Sim! Garantimos a primeira troca por tamanho sem custos adicionais. Consulte nosso guia de medidas antes da compra para garantir a escolha ideal.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>DÚVIDAS FREQUENTES</span>
          <h2 className={styles.title}>PERGUNTAS & RESPOSTAS</h2>
        </div>

        <div className={styles.faqList}>
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={styles.faqCard}>
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <div className={styles.answerText}>{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
