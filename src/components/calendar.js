import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { initDate } from "../store/reducers/persons"
import {
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonButton,
} from "@ionic/react"
import { ReactComponent as ListIcon } from "../assets/disable.svg"
import { ReactComponent as CalendarIcon } from "../assets/calendar.svg"
import style from "../assets/styles/calendar.module.css"
import { createDates, weekDay, monthName } from "./functions"

const Calendar = ({ calendar, activeTime }) => {
  const [view, setView] = useState({ list: true, block: false })
  const [chuseDate, setDate] = useState()
  const [chuseTime, setTime] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    setDate(null)
    setTime(null)
  }, [calendar])

  function submitHandler() {
    if (!chuseDate || !chuseTime) {
      return
    }
    dispatch(
      initDate({
        date: { active: chuseDate.active, id: chuseDate.id },
        time: chuseTime,
      })
    )
    setDate()
    setTime()
  }

  return (
    <IonGrid className={style.max}>
      <IonRow className={style.padding}>
        <IonCol className={`${style.position}`}>
          <p className={style.margin}>Возможная дата</p>
        </IonCol>
        <IonCol className={`${style.position} ${style.end}`}>
          <ListIcon
            className={`${style.svg} ${view.list ? style.active : ""}`}
            onClick={() =>
              setView((prev) => {
                return { ...prev, list: true, block: false }
              })
            }
          />
          <CalendarIcon
            className={`${style.svg} ${view.block ? style.active : ""}`}
            onClick={() =>
              setView((prev) => {
                return { ...prev, list: false, block: true }
              })
            }
          />
        </IonCol>
      </IonRow>
      <IonRow className={style["bottom-margin"]}>
        <IonSegment
          scrollable={true}
          color="primary"
          value={
            activeTime && !chuseDate
              ? activeTime.date
              : chuseDate
              ? chuseDate.id
              : ""
          }
        >
          {calendar
            ? createDates(calendar).map((item, ind) => {
                return (
                  <IonSegmentButton
                    value={item.id}
                    key={item.date.getTime() + ind}
                    className={style["day-wrapper"]}
                    onClick={() => setDate(item)}
                  >
                    <IonLabel className={style.day}>
                      <span>{weekDay(item.date)}</span>
                      <p>{item.date.getDate()}</p>
                    </IonLabel>
                  </IonSegmentButton>
                )
              })
            : null}
        </IonSegment>
      </IonRow>
      <IonRow className={style.padding}>
        <IonCol className={`${style.position}`}>
          <p className={style.margin}>Возможное время</p>
        </IonCol>
      </IonRow>
      <IonRow className={style["bottom-margin"]}>
        <IonSegment
          scrollable={true}
          color="primary"
          value={
            activeTime && !chuseTime
              ? activeTime.currentTime
              : chuseTime
              ? chuseTime
              : ""
          }
        >
          {calendar.hours
            ? calendar.hours.map((item, ind) => {
                return (
                  <IonSegmentButton
                    value={item}
                    key={item + ind}
                    onClick={() => setTime(item)}
                  >
                    <IonLabel>{item}</IonLabel>
                  </IonSegmentButton>
                )
              })
            : null}
        </IonSegment>
      </IonRow>
      <IonRow>
        <IonCol size="12">
          <IonCard style={{ margin: "0" }}>
            <IonGrid>
              <IonRow className={style.position}>
                <IonCol
                  className={`${style.position} ${style.centre} ${style.column} ${style.height}`}
                >
                  <p className={`${style.fonts} `}>Дата</p>

                  {activeTime && activeTime.date && !chuseDate ? (
                    <>
                      <p className={`${style.fonts} ${style.size}`}>
                        {new Date(activeTime.date).getDate()}
                      </p>
                      <p className={`${style.fonts} ${style.size}`}>
                        {monthName(new Date(activeTime.date).getMonth())}
                      </p>
                    </>
                  ) : chuseDate ? (
                    <>
                      <p className={`${style.fonts} ${style.size}`}>
                        {chuseDate.date.getDate()}
                      </p>{" "}
                      <p className={`${style.fonts} ${style.size}`}>
                        {" "}
                        {monthName(chuseDate.date.getMonth())}
                      </p>
                    </>
                  ) : (
                    <p className={`${style.fonts} ${style.size}`}>-</p>
                  )}
                </IonCol>
                <div className={style.border}></div>
                <IonCol
                  className={`${style.position} ${style.centre} ${style.column} ${style.height}`}
                >
                  <p className={`${style.fonts} `}>Время</p>

                  {activeTime && activeTime.currentTime && !chuseTime ? (
                    <p className={`${style.fonts} ${style.size} `}>
                      {activeTime.currentTime}
                    </p>
                  ) : chuseTime ? (
                    <p className={`${style.fonts} ${style.size} `}>
                      {chuseTime}
                    </p>
                  ) : (
                    <p className={`${style.fonts} ${style.size} `}>-</p>
                  )}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className={`${style.position} ${style.centre}`}>
                  <IonButton size="default" onClick={submitHandler}>
                    записатся на бесплатную встречу
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
  )
}

export default Calendar
