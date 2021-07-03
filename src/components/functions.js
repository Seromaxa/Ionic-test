export function createDates(item) {
  let arr = []
  let toDay = new Date()
  let day = 86400000
  let long = item.dates.long * day
  let endDate = item.dates.beginDate + long
  let totalId = `${item.id}`

  for (let begin = item.dates.beginDate; begin < endDate; begin += day) {
    if (
      begin >=
      Date.parse(
        `${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`
      )
    ) {
      arr.push(begin)
    }
  }

  if (item.dates.unincludeDay.length > 0) {
    let test = item.dates.unincludeDay.map((item) => Date.parse(item))
    test = test.reduce((acc, i) => {
      acc[i] = acc[i] ? acc[i] + 1 : 1
      return acc
    }, {})

    for (let i = 0; i < arr.length; i++) {
      let current = arr[i]
      let count = test[current]

      if (count && count > 0) {
        arr = arr.filter((item) => item !== current)
      }
    }
    arr = arr.map((item) => {
      return {
        id: item,
        active: totalId,
        date: new Date(item),
      }
    })
  } else {
    arr = arr.map((item) => {
      return {
        id: item,
        active: totalId,
        date: new Date(item),
      }
    })
  }
  console.log(arr)
  return arr
}

export function weekDay(date) {
  let toDay = new Date()

  if (
    `${toDay.getFullYear()}-${toDay.getMonth()}-${toDay.getDate()}` ===
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  ) {
    return "Сегодня"
  } else {
    switch (date.getDay()) {
      case 1:
        return "Пн"
      case 2:
        return "Вт"
      case 3:
        return "Cр"
      case 4:
        return "Чт"
      case 5:
        return "Пт"
      case 6:
        return "Сб"
      case 0:
        return "Вс"
    }
  }
}

export function monthName(num) {
  switch (num) {
    case 0:
      return "января"
    case 1:
      return "февраля"
    case 2:
      return "марта"
    case 3:
      return "апреля"
    case 4:
      return "мая"
    case 5:
      return "июня"
    case 6:
      return "июля"
    case 7:
      return "августа"
    case 8:
      return "сентября"
    case 9:
      return "октября"
    case 10:
      return "ноября"
    case 11:
      return "декабря"
  }
}
