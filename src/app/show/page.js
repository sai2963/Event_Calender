"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
import Showevents from "@/_components/show-events";

const Calendar = () => {
  const [eventsData, setEventsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    async function fetchEvents() {
      const EventRef = collection(db, "events");
      const querySnapShot = await getDocs(EventRef);
      const EventsData = querySnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
        };
      });
      console.log("Fetched Events:", EventsData);
      setEventsData(EventsData);
    }
    fetchEvents();
  }, []);

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  const filteredEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getMonth() + 1 === selectedMonth &&
      eventDate.getFullYear() === selectedYear
    );
  });

  const generateCalendar = () => {
    const daysArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const event = filteredEvents.find(
        (event) => new Date(event.date).getDate() === day
      );
      daysArray.push(
        <div key={day} className="day bg-gray-700 text-white p-4 rounded">
          <div>{day}</div>
          {event && (
            <div className="event mt-2 text-sm text-pink-300">
              <div>{event.name}</div>
              <div>{event.time}</div>
            </div>
          )}
        </div>
      );
    }
    return daysArray;
  };

  return (
    <>
      <Showevents
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        generateCalendar={generateCalendar}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
    </>
  );
};

export default Calendar;
