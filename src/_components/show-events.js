export default function Showevents({selectedMonth, selectedYear, generateCalendar,setSelectedMonth, setSelectedYear}) {
    return(
        <div className="calendar-container min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-pink-500">
          Event Calendar
        </h1>
        <div className="flex justify-center mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded mr-2"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={new Date().getFullYear() - 5 + i}>
                {new Date().getFullYear() - 5 + i}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className="text-center font-bold text-gray-400 uppercase"
            >
              {day}
            </div>
          ))}
          {generateCalendar()}
        </div>
      </div>
    )
}