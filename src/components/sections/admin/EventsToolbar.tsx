"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { EventForm } from "@/components/sections/admin/EventForm";
import { RefreshCcw } from "lucide-react";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";

const EventsToolbar = () => {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [publishAlertOpen, setPublishAlertOpen] = useState(false);
  const [unpublishAlertOpen, setUnpublishAlertOpen] = useState(false);
  const {
    selectedEvents,
    deleteSelectedEvents,
    publishSelectedEvents,
    triggerRefresh,
  } = useAdminEventsStore();

  const handleDelete = () => {
    deleteSelectedEvents();
    setAlertOpen(false);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Events</h1>
        <div className="flex items-center gap-4">
          {selectedEvents.length > 0 && (
            <>
              <Button
                variant="destructive"
                onClick={() => setAlertOpen(true)}
                className="rounded-none"
              >
                Delete ({selectedEvents.length}) Event
                {selectedEvents.length > 1 && "s"}
              </Button>
              <AlertDialog
                open={publishAlertOpen}
                onOpenChange={setPublishAlertOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="rounded-none">
                    Publish
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Publish the selected events?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will publish the selected events on the website
                      homepage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setPublishAlertOpen(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => publishSelectedEvents(true)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog
                open={unpublishAlertOpen}
                onOpenChange={setUnpublishAlertOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="rounded-none">
                    Unpublish
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Unpublish the selected events?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will unpublish the selected events from the website
                      homepage.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setUnpublishAlertOpen(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => publishSelectedEvents(false)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your selected event(s) and
                      remove the event from the home page.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setAlertOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            onClick={() => {
              triggerRefresh();
            }}
          >
            <RefreshCcw size={20} />
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="white" className="rounded-none">
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="mb-4">Add Event</DialogTitle>
                <DialogDescription className="hidden">
                  Add events here that will show on the website.
                </DialogDescription>
              </DialogHeader>
              <EventForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default EventsToolbar;
