'use client';

import React, { useState } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
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
    a: 'Cotton custa R$ 100,00 e está disponível nos modelos feminino e masculino. No feminino, você também pode escolher Viscolycra pelo mesmo preço. No masculino, há a opção Fio 30.1, uma malha premium mais encorpada, por R$ 120,00.',
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
        <ScrollReveal>
          <div className={styles.header}>
            <span className={styles.eyebrow}>DÚVIDAS FREQUENTES</span>
            <h2 className={styles.title}>PERGUNTAS & RESPOSTAS</h2>
          </div>
        </ScrollReveal>

        <div className={styles.faqList}>
          {FAQS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollReveal key={idx} delayMs={idx * 80}>
                <div className={styles.faqCard}>
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
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
