import { useTranslation } from "react-i18next";
import logo from "../../../logo-viajerosarequipa.jpg";
import freeWalkingTourPdf from "../../assets/Free-Walking-Tour-Viajeros-Arequipa.pdf";

export function FloatingBookingButton() {
  const { t } = useTranslation();

  return (
    <a
      href={freeWalkingTourPdf}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-booking-button"
    >
      <img src={logo} alt="" width="38" height="38" />
      <span>{t("nav.reserveTours")}</span>
    </a>
  );
}
