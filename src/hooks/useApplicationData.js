import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const getSpotsForDay = function (day, appointments) {
    let spots = 0;
    for (const id of day.appointments) {
      //getting the appointments for the day
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }

    return spots;
  };

  const updateSpots = function (dayName, days, appointments) {
    // finds day
    const day = days.find((d) => d.name === dayName);
    const spots = getSpotsForDay(day, appointments);
    // if day, update the spots
    return days.map((item) =>
      item.name === dayName ? { ...day, spots } : item
    );
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });
     // setting the state with the appointments and spots after booking
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
     // setting the state with the appointments and spots after deleting
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const days = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}