"use client";

import "react-datepicker/dist/react-datepicker.css";

import * as React from "react";

import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminEventsStore } from "@/stores/AdminEventsStore";

export function EventForm() {
  const { triggerRefresh } = useAdminEventsStore();
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    date: new Date(),
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    if (date) {
      setFormData((prevData) => ({
        ...prevData,
        date: date,
      }));
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Adjust the date to local timezone before sending
      const localDate = new Date(formData.date);
      const adjustedDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      ).toISOString();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, date: adjustedDate }),
        }
      );

      if (!response.ok) {
        console.error("Failed to add event:", response.statusText);
        throw new Error(`Failed to add event: ${response.statusText}`);
      }

      const newEvent = await response.json();
      setFormData({
        title: "",
        description: "",
        date: new Date(),
      }); // Reset form after successful submission

      triggerRefresh();
    } catch (error) {
      console.error("Error adding event:", error);
      // Handle the error accordingly, maybe set an error state or show a message in the UI
    }
  };

  const handleFocus = (event: any) => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      times.push(new Date().setHours(i, 0, 0, 0));
      times.push(new Date().setHours(i, 30, 0, 0));
    }
    return times;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[500px] flex flex-col gap-4">
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="title">Event Name</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="description">Event Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      <div className="flex flex-col gap-4 py-2">
        <Label htmlFor="date">Select Date:</Label>
        <DatePicker
          selected={formData.date}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          includeTimes={generateTimeOptions().map((time) => new Date(time))}
          className="p-2 text-white bg-transparent border rounded-md date-input"
          wrapperClassName="p-2 text-white bg-transparent border rounded-md"
        />
      </div>
      <Button type="submit" className="text-white bg-orange-400">
        Save Event
      </Button>
    </form>
  );
}
