"use client";
import React from "react";

export default function Calculator() {
  const [days, setDays] = React.useState<string>("");
  const [months, setMonths] = React.useState<string>("");
  const [years, setYears] = React.useState<string>("");
  const [diffInYears, setDiffInYears] = React.useState<string>("--");
  const [diffInMonths, setDiffInMonths] = React.useState<string>("--");
  const [diffInDays, setDiffInDays] = React.useState<string>("--");
  const [errors, setErrors] = React.useState<{ day: string; month: string; year: string }>({
    day: "",
    month: "",
    year: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDate()) {
      calculateDifference();
    }
  };

  const validateDate = () => {
    const day = parseInt(days);
    const month = parseInt(months);
    const year = parseInt(years);

    let dayError = "";
    let monthError = "";
    let yearError = "";

    if (isNaN(day) || day < 1 || day > getDaysInMonth(year, month - 1)) {
      dayError = `Please enter a valid day for the selected month.`;
    }
    if (isNaN(month) || month < 1 || month > 12) {
      monthError = "Please enter a valid month between 1 and 12.";
    }
    if (isNaN(year) || year > new Date().getFullYear()) {
      yearError = "Year must be in the past.";
    }

    setErrors({ day: dayError, month: monthError, year: yearError });

    return !(dayError || monthError || yearError);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(e.target.value);
    const day = parseInt(e.target.value);
    const month = parseInt(months);
    const year = parseInt(years);

    if (isNaN(day) || day < 1 || (month && year && day > getDaysInMonth(year, month - 1))) {
      setErrors((prev) => ({ ...prev, day: "Invalid day for the selected month." }));
    } else {
      setErrors((prev) => ({ ...prev, day: "" }));
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonths(e.target.value);
    const month = parseInt(e.target.value);

    if (isNaN(month) || month < 1 || month > 12) {
      setErrors((prev) => ({ ...prev, month: "Please enter a valid month (1-12)." }));
    } else {
      setErrors((prev) => ({ ...prev, month: "" }));
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(e.target.value);
    const year = parseInt(e.target.value);

    if (isNaN(year) || year > new Date().getFullYear()) {
      setErrors((prev) => ({ ...prev, year: "Year must be in the past." }));
    } else {
      setErrors((prev) => ({ ...prev, year: "" }));
    }
  };

  const calculateDifference = () => {
    const currentDate = new Date();
    const inputDate = new Date(Number(years), Number(months) - 1, Number(days));

    let yearDiff = currentDate.getFullYear() - inputDate.getFullYear();
    let monthDiff = currentDate.getMonth() - inputDate.getMonth();
    let dayDiff = currentDate.getDate() - inputDate.getDate();

    if (dayDiff < 0) {
      monthDiff -= 1;
      dayDiff += getDaysInMonth(inputDate.getFullYear(), inputDate.getMonth());
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
                className={`md:text-[32px] text-lg border ${
                  errors.day ? "border-red-500 hover:border-red-500 focus:border-red-500" : "border-gray-300 hover:border-[#854dff] focus:border-[#854dff]"
                } focus:outline-none text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3`}
                placeholder="DD"
                value={days}
                onChange={handleDayChange}
              />
            </div>
            <div>
              <label htmlFor="month" className="block mb-2 text-xs font-extrabold text-gray-500 tracking-[1px] md:tracking-[4px]">
                MONTH
              </label>
              <input
                type="tel"
                id="month"
                name="month"
                className={`md:text-[32px] text-lg border ${
                  errors.month ? "border-red-500 hover:border-red-500 focus:border-red-500" : "border-gray-300 hover:border-[#854dff] focus:border-[#854dff]"
                } focus:outline-none text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3`}
                placeholder="MM"
                value={months}
                onChange={handleMonthChange}
              />
            </div>
            <div>
              <label htmlFor="year" className="block mb-2 text-xs font-extrabold text-gray-500 tracking-[1px] md:tracking-[4px]">
                YEAR
              </label>
              <input
                type="tel"
                id="year"
                name="year"
                className={`md:text-[32px] text-lg border ${
                  errors.year ? "border-red-500 hover:border-red-500 focus:border-red-500" : "border-gray-300 hover:border-[#854dff] focus:border-[#854dff]"
                } focus:outline-none text-black rounded-lg block w-20 md:w-36 font-bold p-1.5 md:p-3`}
                placeholder="YYYY"
                value={years}
                onChange={handleYearChange}
              />
            </div>
          </div>
          {errors.day && <small className="text-red-500">{errors.day}</small>}{" "}
          {errors.month && <small className="text-red-500">{errors.month}</small>}{" "}
          {errors.year && <small className="text-red-500">{errors.year}</small>}
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
  );
}
