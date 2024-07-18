import { create } from "zustand";

interface AdminEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
}

interface StoreState {
  events: AdminEvent[];
  selectedEvents: AdminEvent[];
  selectedEventsCount: () => number;
  fetchEvents: (filter?: string) => Promise<AdminEvent[]>;
  fetchAllEvents: () => Promise<void>;
  triggerRefresh: () => void;
  selectEvent: (event: AdminEvent) => void;
  deleteEvent: (event: AdminEvent) => void;
  deleteSelectedEvents: () => Promise<void>;
  publishSelectedEvents: (publish: boolean) => Promise<void>;
  isEventSelected: (event: AdminEvent) => boolean;
  refreshFlag: boolean;
}

export const useAdminEventsStore = create<StoreState>((set, get) => ({
  events: [],
  selectedEvents: [],
  selectedEventsCount: () => get().selectedEvents.length,

  fetchEvents: async (filter = "") => {
    try {
      const response = await fetch(`/api/events?filter=${filter}`);
      const data = await response.json();
      set({ events: data });
      return data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  },

  fetchAllEvents: async () => {
    await get().fetchEvents("TODAY");
    await get().fetchEvents("FUTURE");
    await get().fetchEvents("PAST");
  },

  triggerRefresh: () => {
    set((state) => ({ refreshFlag: !state.refreshFlag }));
  },

  selectEvent: (event) =>
    set((state) => {
      const isSelected = state.selectedEvents.some((e) => e.id === event.id);
      return {
        selectedEvents: isSelected
          ? state.selectedEvents.filter((e) => e.id !== event.id)
          : [...state.selectedEvents, event],
      };
    }),

  deleteEvent: (event) =>
    set((state) => ({
      selectedEvents: state.selectedEvents.filter((e) => e.id !== event.id),
    })),

  deleteSelectedEvents: async () => {
    const state = get();
    const idsToDelete = state.selectedEvents.map((event) => event.id);
    try {
      await Promise.all(
        idsToDelete.map((id) =>
          fetch(`/api/events`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          })
        )
      );
      set({ selectedEvents: [] });
      get().triggerRefresh();
    } catch (error) {
      console.error("Error deleting events:", error);
    }
  },

  publishSelectedEvents: async (publish: boolean) => {
    const state = get();
    const idsToUpdate = state.selectedEvents.map((event) => event.id);
    try {
      await fetch(`/api/events`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: idsToUpdate, published: publish }),
      });
      set((state) => ({
        selectedEvents: state.selectedEvents.map((event) => ({
          ...event,
          published: publish,
        })),
      }));
      get().triggerRefresh();
    } catch (error) {
      console.error("Error updating events:", error);
    }
  },

  isEventSelected: (event) =>
    get().selectedEvents.some((e) => e.id === event.id),

  refreshFlag: false,
}));
