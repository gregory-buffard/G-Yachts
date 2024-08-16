"use client";

import { ICharter } from "@/types/charter";
import { isWithinInterval } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useLocale, useTranslations } from "next-intl";

const Reservations = ({ data }: { data: ICharter["reservations"] }) => {
  const locale = useLocale() as "en" | "fr",
    t = useTranslations("charters.listing.views");
  const reserved = (date: Date) => {
    return data.some((reservation) => {
      const start = new Date(reservation.from);
      const end = new Date(reservation.to);
      return isWithinInterval(date, { start, end });
    });
  };

  return (
    <section className={"flex flex-col justify-center items-start w-full"}>
      <h2>Availability</h2>
      <FullCalendar
        locale={locale}
        height={"auto"}
        plugins={[dayGridPlugin]}
        initialView={"dayGridMonth"}
        events={data.map((reservation) => ({
          title: t("reserved"),
          start: reservation.from,
          end: reservation.to,
        }))}
        eventBorderColor={"transparent"}
        eventBackgroundColor={"#ef4444"}
        displayEventTime={false}
        progressiveEventRendering={true}
        titleFormat={{ year: "numeric", month: "long" }}
        headerToolbar={{
          left: "title",
          center: "",
          right: "prev,next today",
        }}
      />
    </section>
  );
};

export default Reservations;
