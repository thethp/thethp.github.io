import { useEffect, useState } from 'react';

const airLabsKey = import.meta.env.VITE_AIRLABS_KEY;
interface FlightData {
  airline_iata: string // airline iata code
  dep_terminal: string; // departure terminal
  dep_iata: string; // departure airport code
  dep_time_ts:  number; //departure time local to departure in seconds
  dep_time_utc: string; // departure date + time 
  arr_iata: string; // arrival airport code
  duration: number; // time in minutes
}

function FlightEventPage() {
  const [ics, setICS] = useState('');
  const [gCal, setGCal] = useState('');
  const [airlines, setAirlines] = useState<object[]>([]);

  const formatDateString = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  }

  useEffect(async () => {
    const airlinesResponse = await fetch(
      `https://airlabs.co/api/v9/airlines?api_key=${airLabsKey}`
    );

    const {response: airlinesResponseJson} = await airlinesResponse.json();
    console.log('THPX',airlinesResponseJson)

    setAirlines([{}]);
  }, []);

  const handleFlightSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const flightIata = (e.currentTarget.elements.namedItem("IATACode") as HTMLInputElement).value;
      const flightDate = (e.currentTarget.elements.namedItem("FlightDate") as HTMLInputElement).value;
      const flightResponse = await fetch(
        `https://airlabs.co/api/v9/schedules?flight_iata=${flightIata}&api_key=${airLabsKey}`
      );

      const {response: flightResponseJson} = await flightResponse.json();
      const flightData = flightResponseJson[0] as FlightData;
      const timePart = flightData.dep_time_utc.split(" ")[1];
      const airportOffsetMs =
        flightData.dep_time_ts * 1000 - new Date(flightData.dep_time_utc).getTime();
      const localDep = new Date(`${flightDate}T${timePart}:00`);
      const depDateUtc = new Date(localDep.getTime() + airportOffsetMs);
      const arrDateUtc = formatDateString(
        new Date(depDateUtc.getTime() + flightData.duration * 60_000)
      );

      const flightSummary = `✈️ ${flightData.dep_iata} -> ${flightData.arr_iata} [Terminal ${flightData.dep_terminal}]`;

      const icsContent =
        `BEGIN:VCALENDAR
        VERSION:2.0
        BEGIN:VEVENT
        UID:${formatDateString(new Date())}+tiller.dog
        DTSTAMP:${formatDateString(new Date())}
        DTSTART:${formatDateString(depDateUtc)}
        DTEND:${arrDateUtc}
        SUMMARY:${flightSummary}
        LOCATION:${flightData.dep_iata} ${flightData.dep_terminal}
        END:VEVENT
        END:VCALENDAR`;
      setICS(`data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`);

      setGCal(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${flightSummary}&dates=${formatDateString(depDateUtc)}/${arrDateUtc}&location=${flightData.dep_iata} Terminal ${flightData.dep_terminal}`);
    } catch(error) {
      console.error("Error",error);
      alert(error);
    }
  };

  if(airlines.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <form onSubmit={handleFlightSubmit}>
      <p>use the date for the departure airport pls</p>
      <input type="text" id="IATACode" />
      <input type="date" id="FlightDate" />
      <button>Submit</button>
      {ics && <a href={ics}>ics file</a>}
      {gCal && <a href={gCal} target="_blank">open in google calendar</a>}
    </form>
  )
}

export default FlightEventPage