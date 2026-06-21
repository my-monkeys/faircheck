// Proof-card UI labels, localized. Hand-authored (small) and merged into ui.verifier
// via verifierT() so the Verifier client component gets them through its `t` prop.
import { DEFAULT_LOCALE } from '@/lib/i18n';

export const PROOF = {
  en: { proofDownload: 'Proof card', proofCopy: 'Copy image', proofSaved: 'saved ✓', proofCopied: 'copied ✓', proofUnsupported: 'use download' },
  pt: { proofDownload: 'Comprovante', proofCopy: 'Copiar imagem', proofSaved: 'salvo ✓', proofCopied: 'copiado ✓', proofUnsupported: 'baixe a imagem' },
  es: { proofDownload: 'Comprobante', proofCopy: 'Copiar imagen', proofSaved: 'guardado ✓', proofCopied: 'copiado ✓', proofUnsupported: 'descarga la imagen' },
  fr: { proofDownload: 'Carte de preuve', proofCopy: "Copier l’image", proofSaved: 'enregistré ✓', proofCopied: 'copié ✓', proofUnsupported: 'téléchargez plutôt' },
  de: { proofDownload: 'Beleg', proofCopy: 'Bild kopieren', proofSaved: 'gespeichert ✓', proofCopied: 'kopiert ✓', proofUnsupported: 'bitte herunterladen' },
};

export const proofLabels = (locale) => PROOF[locale] || PROOF[DEFAULT_LOCALE];
