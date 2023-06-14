import dayjs from "dayjs";

export const generateDate = (

  month = dayjs().month(),
  year = dayjs().year(),

) => {

      const firstDayOfTheMonth = dayjs().year(year).month(month).startOf("month");
      const lastDayOfTheMonth = dayjs().year(year).month(month).endOf("month");

      const arrayOfDate = []

      //Prefix Date
      for (let i = 0; i < firstDayOfTheMonth.day(); i++) {

        arrayOfDate.push({

          currentMonth: false,
          date: firstDayOfTheMonth.day(i)
        })
      }

      //Current Date
      for (let i = firstDayOfTheMonth.date(); i <= lastDayOfTheMonth.date(); i++) {

        arrayOfDate.push({

          currentMonth: true,
          date:firstDayOfTheMonth.date(i),
          today: firstDayOfTheMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString()
        })
      }

      //Suffix Date
      const remaining = 42 -arrayOfDate.length

      for (let i = lastDayOfTheMonth.date() + 1; i <= lastDayOfTheMonth.date() + remaining; i++) {

        arrayOfDate.push({
          currentMonth: false,
          date: lastDayOfTheMonth.date(i)
        })
      }


      return arrayOfDate
}

export const months = [

  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]