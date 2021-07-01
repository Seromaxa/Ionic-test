import { useState, useEffect } from "react"
import {
  IonApp,
  IonSlides,
  IonSlide,
  IonContent,
  IonCard,
  IonCardHeader,
  IonImg,
  IonCardContent,
  IonLoading,
} from "@ionic/react"
import { useSelector, useDispatch } from "react-redux"
import Calendar from "./components/calendar"
import { changePerson } from "./store/reducers/persons"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css"
// import "@ionic/react/css/float-elements.css"
// import "@ionic/react/css/text-alignment.css"
// import "@ionic/react/css/text-transformation.css"
// import "@ionic/react/css/flex-utils.css"
// import "@ionic/react/css/display.css"

/* MyStyles*/
import card from "./assets/styles/card.module.css"

/* Theme variables */
import "./theme/variables.css"

const App = () => {
  const persons = useSelector((state) => state.persons)
  const calendar = useSelector((state) => state.calendar)
  const [currentCalendar, setCurrent] = useState("")

  const [loaded, setLoaded] = useState(false)
  const [test, setTest] = useState("")
  const dispatch = useDispatch()

  const sliderOptions = {
    initialSlide: test,
    speed: 200,
  }
  useEffect(() => {
    const initial = persons
      ? persons.findIndex((item) => item.active === true) === -1
        ? 0
        : persons.findIndex((item) => item.active === true)
      : 0
    setTest(initial)
    setCurrent(calendar.find((item) => item.id == persons[initial].timeZone))
    dispatch(changePerson(persons[initial].id))
    setLoaded(true)
  }, [])

  const getIndex = async (event) => {
    let index
    await event.target.getActiveIndex().then((value) => (index = value))
    {
      setCurrent(calendar.find((item) => item.id == persons[index].timeZone))

      dispatch(changePerson(persons[index].id))
    }
  }

  return (
    <IonApp>
      <IonContent>
        {!loaded ? (
          <IonLoading />
        ) : (
          <>
            <IonSlides
              options={sliderOptions}
              onIonSlideDidChange={getIndex}
              className={card.indent}
            >
              {persons.map((item) => (
                <IonSlide key={item.id}>
                  <IonCard className={card.card}>
                    <IonCardHeader className={card["card-header"]}>
                      {item.name} {item.sername}
                    </IonCardHeader>
                    <div className={card["content-wrapper"]}>
                      <IonImg
                        className={card["card-img"]}
                        src={item.photo}
                        alt={item.surname}
                      />
                      <IonCardContent className={card["card-content"]}>
                        <p className={card.text}>Длительность Консультации</p>
                        <p>
                          <strong>{item.consult.long} минут</strong>
                        </p>
                      </IonCardContent>
                    </div>
                  </IonCard>
                </IonSlide>
              ))}
            </IonSlides>
            <Calendar
              calendar={currentCalendar}
              activeTime={persons.find((item) => item.toggle).consult}
            />
          </>
        )}
      </IonContent>
    </IonApp>
  )
}

export default App
