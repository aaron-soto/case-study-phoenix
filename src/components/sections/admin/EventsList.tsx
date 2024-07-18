import { BoxSelect, Check, Eye } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { EventFilterTypes } from "@/types/Events";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface AdminEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
}

interface EventListItemProps {
  event: AdminEvent;
  adminPage?: boolean;
}

const EventListItem = ({ event, adminPage }: EventListItemProps) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = months[eventDate.getMonth()];

  const { selectEvent, isEventSelected } = useAdminEventsStore();

  return (
    <div className="flex items-center justify-between p-4 h-[75px] hover:bg-white/[2%] cursor-pointer">
      {adminPage && (
        <>
          <Button
            variant="ghost"
            onClick={() => selectEvent(event)}
            className="mr-4"
            size="icon"
          >
            {isEventSelected(event) ? (
              <Check size={23} />
            ) : (
              <BoxSelect size={23} />
            )}
          </Button>
          <Button variant="ghost" className="mr-8" size="icon">
            <Eye
              size={20}
              className={cn(
                event.published ? "text-green-600" : "text-red-600/60"
              )}
            />
          </Button>
        </>
      )}
      <div className="mr-auto">
        <p className="text-lg font-bold">{event.title}</p>
        <p className="text-orange-400 line-clamp-1">{event.description}</p>
      </div>
      <div className="flex gap-2 text-xl">
        <p className="font-bold">{day}</p>
        <p>{month}</p>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="flex items-center justify-center h-20 bg-stone-900/20">
    <p className="text-base text-gray-500">No events found</p>
  </div>
);

const LoadingState = () => (
  <div className="flex items-center justify-between p-4 h-[75px] bg-stone-900/20">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[19px] w-[100px]" />
      <Skeleton className="h-[19px] w-[300px]" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-[19px] w-6" />
      <Skeleton className="h-[19px] w-12" />
    </div>
  </div>
);

interface EventsListProps {
  type: EventFilterTypes;
  adminPage?: boolean;
}

const EventsList = ({ type, adminPage }: EventsListProps) => {
  const { fetchEvents, refreshFlag } = useAdminEventsStore();
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEventsData = async () => {
    setLoading(true);
    const data = await fetchEvents(type);
    if (!adminPage) {
      // do not show unpublished events on the website
      setEvents(data.filter((event) => event.published));
    } else {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEventsData();
  }, [fetchEvents, type, refreshFlag]);

  return (
    <div>
      <div
        className={cn(
          "px-2 py-1 mt-4 md:py-2",
          type === EventFilterTypes.TODAY && "bg-teal-600/50",
          type === EventFilterTypes.FUTURE && "bg-orange-400/40",
          type === EventFilterTypes.PAST && "bg-red-500/30"
        )}
      >
        {type === EventFilterTypes.TODAY
          ? "Today"
          : type === EventFilterTypes.FUTURE
          ? "Future Events"
          : "Past Events"}
      </div>
      <div className="divide-y">
        {loading ? (
          <LoadingState />
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventListItem adminPage={adminPage} key={event.id} event={event} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default EventsList;
