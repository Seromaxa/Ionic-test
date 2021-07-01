export function createDates(item) {
  let arr = []
  let toDay = new Date()
  let day = 86400000
  let long = item.dates.long * day
  let endDate = item.dates.beginDate + long
  let totalId = `${item.id}`

  for (let begin = item.dates.beginDate; begin < endDate; begin += day) {
    let itemDate = new Date(begin)
    if (
      itemDate >=
      new Date(
        `${toDay.getFullYear()}-${toDay.getMonth() + 1}-${toDay.getDate()}`
      )
    ) {
      arr.push(itemDate)
    }
  }

  if (item.dates.unincludeDay.length > 0) {
    let some = []
    let test = item.dates.unincludeDay.reduce((acc, i) => {
      acc[i] = acc[i] ? acc[i] + 1 : 1
      return acc
    }, {})
    for (let i = 0; i < arr.length; i++) {
      let current = `${arr[i].getFullYear()}-${arr[i].getMonth() + 1}-${arr[
        i
      ].getDate()}`
      some.push(current)
    }
    for (let i = 0; i < some.length; i++) {
      let current = some[i]
      let count = test[current]

      if (count && count > 0) {
        some = some.filter((item) => item !== current)
      }
    }
    some = some.map((item) => {
      return {
        id: item,
        active: totalId,
        date: new Date(item),
      }
    })
    arr = [...some]
  } else {
    arr = arr.map((item) => {
      return {
        id: `${item.getFullYear()}-${item.getMonth() + 1}-${item.getDate()}`,
        active: totalId,
        date: item,
      }
    })
  }

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
