import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "../../../logo-viajerosarequipa.jpg";

export function FloatingBookingButton() {
  const { t } = useTranslation();

  return (
    <Link to="/contacto" className="floating-booking-button">
      <img src={logo} alt="" width="38" height="38" />
      <span>{t("nav.reserveTours")}</span>
    </Link>
  );
}
