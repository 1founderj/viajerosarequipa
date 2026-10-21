import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import type { Property, Room } from '@/data/properties';
import { buildWhatsAppUrl, roomWhatsAppMessage } from '@/lib/whatsapp';

export function WhatsAppButton({ property, room }: { property: Property; room: Room }) {
  const { t } = useTranslation();

  return (
    <Button asChild variant="whatsapp" className="whatsapp-button">
      <a
        href={buildWhatsAppUrl(property.whatsappNumber, roomWhatsAppMessage(property, room))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
      >
        <MessageCircle />
        {t('whatsapp.buttonText')}
      </a>
    </Button>
  );
}
