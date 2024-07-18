"use client";

import { EventFilterTypes } from "@/types/Events";
import EventsList from "@/components/sections/admin/EventsList";
import SectionHeading from "@/components/reusable/SectionHeading";

const EventsSection = () => {
  return (
    <div className="bg-[#0c0b09] py-16">
      <div className="container">
        <SectionHeading
          className="pb-4"
          title="Events"
          description="What is happening at Case Study"
        >
          <span>Ask about using the space for your next venue or event!</span>
        </SectionHeading>

        <EventsList type={EventFilterTypes.TODAY} />
        <EventsList type={EventFilterTypes.FUTURE} />
      </div>
    </div>
  );
};

export default EventsSection;
