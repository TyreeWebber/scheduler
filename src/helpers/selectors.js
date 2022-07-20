export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  // if no day return empty array
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  // if day, find the appointments for that day
  return foundDay.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((days) => days.name === day);
  // if no day, return empty array
  if (state.days.length === 0 || foundDay === undefined) {
    return [];
  }
  //if day, find the interviewers for that day
  return foundDay.interviewers.map((id) => state.interviewers[id]);
}

export function getInterview(state, interview) {
  let returnObj = {};
  if (!interview) {
    return null;
  }
  // looping through interviewers
  for (let id in state.interviewers) {
    // if the interviewer matches the interview's interviewer
    if (Number(id) === interview.interviewer) {
      // add the student
      returnObj.student = interview.student;
      // add the interviewer
      returnObj.interviewer = state.interviewers[id];
    }
  }
  // return object with student and interviewer from above
  return returnObj;
}