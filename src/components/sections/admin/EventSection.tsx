"use client";

import { EventFilterTypes } from "@/types/Events";
import EventsList from "@/components/sections/admin/EventsList";
import EventsToolbar from "@/components/sections/admin/EventsToolbar";

const EventSection = ({ adminPage }: { adminPage?: boolean }) => {
  return (
    <>
      <EventsToolbar />

      <EventsList adminPage={adminPage} type={EventFilterTypes.TODAY} />
      <EventsList adminPage={adminPage} type={EventFilterTypes.FUTURE} />
      <EventsList adminPage={adminPage} type={EventFilterTypes.PAST} />
    </>
  );
};

export default EventSection;
