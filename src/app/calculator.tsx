"use client"
import React from 'react'

export default function Calculator() {

  const [days, setDays] = React.useState<string>("");
  const [months, setMonths] = React.useState<string>("");
  const [years, setYears] = React.useState<string>("");
  const [diffInYears, setDiffInYears] = React.useState<string>("--");
  const [diffInMonths, setDiffInMonths] = React.useState<string>("--");
  const [diffInDays, setDiffInDays] = React.useState<string>("--");
  const [error, setError] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateDifference();
  };

  const calculateDifference = () => {
    const currentDate = new Date();
    const inputDate = new Date(Number(years), Number(months) - 1, Number(days));

    if (isNaN(inputDate.getTime())) {
      setError("Please enter a valid date.");
      return;
    }
    if (inputDate > currentDate) {
      setError("Invalid date: Date cannot be in the future.");
      return;
    }

    setError(""); 
    let yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
    let monthDiff = currentDate.getMonth() - inputDate.getMonth();
    let dayDiff = currentDate.getDate() - inputDate.getDate();

    
    if (dayDiff < 0) {
      monthDiff -= 1;
      dayDiff += getDaysInMonth(inputDate.getFullYear(), inputDate.getMonth() + monthDiff);
    }
    if (monthDiff < 0) {
      yearDiff -= 1;
      monthDiff += 12;
    }

    setDiffInYears(String(yearDiff));
    setDiffInMonths(String(monthDiff));
    setDiffInDays(String(dayDiff));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  return (
    
    <section className="h-screen w-screen grid place-content-center">
      <div className="bg-white w-[350px] h-[500px] md:w-[750px] md:h-[600px] p-7 pt-10 md:p-10 rounded-2xl rounded-br-[150px] ">
        <form className="mx-auto" onSubmit={handleSubmit}>
          <div className="flex gap-3 md:gap-6">
            <div>
              <label htmlFor="day" className="block mb-2 text-xs font-extrabold text-gray-500 tracking-[1px] md:tracking-[4px]">
                DAY
              </label>
              <input
                type="tel"
                id="day"
                name="day"
                className="md:text-[32px] text-lg border hover:border-[#854dff] focus:outline-none focus:border-[#854dff] border-gray-300 text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3"
                placeholder="DD"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
              {days && (parseInt(days) < 1 || parseInt(days) > 31) && (
                <small className="text-rose-600 font-normal block mt-2">Must be a valid day</small>
              )}
            </div>

            <div>
              <label htmlFor="month" className="block mb-2 text-xs font-extrabold text-gray-500 tracking-[1px] md:tracking-[4px]">
                MONTH
              </label>
              <input
                type="tel"
                id="month"
                name="month"
                className="md:text-[32px] text-lg border hover:border-[#854dff] focus:outline-none focus:border-[#854dff] border-gray-300 text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3"
                placeholder="MM"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
              />
              {months && (parseInt(months) < 1 || parseInt(months) > 12) && (
                <small className="text-rose-600 font-normal block mt-2">Must be a valid month</small>
              )}
            </div>

            <div>
              <label htmlFor="year" className="block mb-2 text-xs font-extrabold text-gray-500 tracking-[1px] md:tracking-[4px]">
                YEAR
              </label>
              <input
                type="tel"
                id="year"
                name="year"
                className="md:text-[32px] text-lg border hover:border-[#854dff] focus:outline-none focus:border-[#854dff] border-gray-300 text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3"
                placeholder="YYYY"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
              {years && parseInt(years) > new Date().getFullYear() && (
                <small className="text-rose-600 font-normal block mt-2">Must be in the past</small>
              )}
            </div>
          </div>
          {error && <small className="text-rose-600 font-normal block mt-2">{error}</small>}
          <hr className="mt-20 md:mt-10 md:w-[95%] border bg-gray-200" />
          <button
            type="submit"
            className="absolute mt-[-30px] ml-[113px] md:mt-[-43px] md:ml-[575px] bg-[#854dff] hover:bg-black rounded-full md:px-5 md:py-5 px-2 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="44" viewBox="0 0 46 44">
              <g fill="none" stroke="#FFF" strokeWidth="2">
                <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
              </g>
            </svg>
          </button>
        </form>

        <div className="mt-20 md:mt-10">
          <h2 className="md:text-8xl text-5xl font-bold">
            <span className="text-[#854dff]">{diffInYears}</span> years
          </h2>
          <h2 className="md:text-8xl text-5xl font-bold">
            <span className="text-[#854dff]">{diffInMonths}</span> months
          </h2>
          <h2 className="md:text-8xl text-5xl font-bold mb-10">
            <span className="text-[#854dff]">{diffInDays}</span> days
          </h2>
        </div>
      </div>
    </section>
  )
}
