import { useEffect, useReducer } from "react";
import TitleCard from "../TitleCard/TitleCard";
import { PMDB, PMDBError } from "../../api/pmdb-api";
import Spinner from "../Loading/Spinner";
import CardController from "../CardController/CardController";
import CStack from "@/models/CardStack";
import { Title } from "@/models/title";
import { AnimatePresence } from "framer-motion";

type Direction = "left" | "right" | "up"
type State = {
  cardStack: null | CStack
  nextCard: undefined | Title
  loading: boolean
  error: null | PMDBError | Error
  direction: Direction | null
}

type Action =
  | { type: "SET_STACK", payload: Title[] }
  | { type: "SET_ERROR", payload: Error | PMDBError }
  | { type: "SET_LOADING", payload: boolean }
  | { type: "LIKE" }
  | { type: "DISLIKE" }
  | { type: "ENLIST" }
  | { type: "SET_DIRECTION", payload: Direction | null }
  | { type: "ENQUEUE", payload: Title[] }

const initialState: State = {
  cardStack: null,
  nextCard: undefined,
  loading: true,
  error: null,
  direction: null
}



function cleanup() {
  return { direction: null }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STACK":
      return { ...state, cardStack: new CStack(action.payload), loading: false }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "LIKE":
      if (!state.cardStack) return state;
      state.cardStack.like();
      return { ...state, ...cleanup() }
    case "DISLIKE":
      if (!state.cardStack) return state;
      state.cardStack.dislike();
      return { ...state, ...cleanup() }
    case "ENLIST":
      if (!state.cardStack) return state;
      state.cardStack.enlist(true);
      return { ...state, ...cleanup() }
    case "SET_DIRECTION":
      return { ...state, direction: action.payload }
    case "ENQUEUE": console.log("enqueueing..."); return state
  }
}

export default function CardStack() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { cardStack, loading, error } = state;


  useEffect(() => {
    async function getData() {
      dispatch({ type: "SET_LOADING", payload: true })
      const pmdb = new PMDB()
      const data = await pmdb.getTrendingTitles(true, 5, "movie")
      if (data instanceof PMDBError) {
        dispatch({ type: "SET_ERROR", payload: data })
      } else {
        dispatch({ type: "SET_STACK", payload: data })
      }
      dispatch({ type: "SET_LOADING", payload: false })
    }

    getData()
  }, [])

  function handleUpdateStack(method: "LIKE" | "DISLIKE" | "ENLIST") {
    let direction: Direction
    switch (method) {
      case "LIKE": direction = "left"; break
      case "DISLIKE": direction = "right"; break
      case "ENLIST": direction = "up"; break
    }
    dispatch({ type: "SET_DIRECTION", payload: direction })
    setTimeout(() => {
      dispatch({ type: method })
    }, 500)
    // var titlesLeft = cardStack?.queue.length;
  }

  if (cardStack && cardStack?.queue.length < 1) {
    console.log("finished stack: ", cardStack)
    return <div>
      <Spinner /> Loading more titles...
    </div>
  }


  if (loading) {
    return <Spinner />

  }
  if (error || !cardStack || !cardStack.peek()) {

    let message = "Something went wrong..."
    if (error instanceof PMDBError) {
      message = error.friendlyMessage
    }
    return <p className="text-red-500 text-xl">{message}</p>
  }


  return <div className="w-full h-full grid">
    <TitleCard key={"next"} title={cardStack.peek_next()} swipe={null} />
    <AnimatePresence>
      <TitleCard key={"curr"} title={cardStack.peek()} swipe={state.direction} />
    </AnimatePresence>
    <CardController handleUpdateStack={handleUpdateStack} />
  </div>
}
