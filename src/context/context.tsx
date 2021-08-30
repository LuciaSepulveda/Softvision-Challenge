import React from "react"
import {Center, Spinner, useColorModeValue} from "@chakra-ui/react"

import {Candidate} from "../types/candidate"
import {Status} from "../types/types"
import array from "../api/index"

export interface Context {
  state: {
    status: Status
    candidates: Candidate[]
    candidatesJson: Candidate[]
  }
  actions: {
    changeStatus: (status: Status) => void
    getCandidates: (step: string) => Candidate[]
    addCandidate: (candidate: Candidate) => void
    prevStep: (step: string, candidate: Candidate) => void
    nextStep: (step: string, candidate: Candidate) => void
    deleteCandidate: (id: string) => void
  }
}

const UserContext = React.createContext({} as Context)

const UserProvider: React.FC = ({children}) => {
  const [status, setStatus] = React.useState<Status>(Status.loading)
  const [candidates, setCandidates] = React.useState<Candidate[]>([])
  const [candidatesJson, setCandidatesJson] = React.useState<Candidate[]>([])
  const bg = useColorModeValue("#FBFBFB", "#242424")
  const spinner = useColorModeValue("#242424", "#FBFBFB")

  const chargeCandidates = () => {
    let arrayLocal: Candidate[] = []
    let aux: Candidate[] = []

    array
      .list()
      .then((candidates) => {
        aux = candidates

        aux.forEach((candidate) => {
          const find = arrayLocal.find((cand) => cand.id === candidate.id)

          if (find === undefined) {
            arrayLocal.push(candidate)
          }
        })
        setCandidatesJson(candidates)
        setCandidates(arrayLocal)
        setStatus(Status.update)
      })
      .catch((err) => {
        console.error(err)
      })

    const check = localStorage.getItem("Candidates")
    const arrayAux: Candidate[] = candidates

    if (check !== null) {
      arrayLocal = JSON.parse(localStorage.getItem("Candidates") || "{}")

      arrayLocal.forEach((candidate) => {
        const find = candidates.find((cand) => cand.id === candidate.id)

        if (find !== undefined) {
          arrayAux.push(candidate)
        }
      })
    }
  }

  const saveCandidatesLocalStorage = () => {
    localStorage.setItem("Candidates", JSON.stringify(candidates))
  }

  React.useEffect(() => {
    if (status === "loading") chargeCandidates()
  }, [status])

  const handleChangeStatus = (status: Status) => {
    setStatus(status)
  }

  const handleGetCandidates = (n: string) => {
    const array: Candidate[] = []

    candidates.forEach((candidate) => {
      if (candidate.step === n) {
        array.push(candidate)
      }
    })

    return array
  }

  const handleAddCandidate = (candidate: Candidate) => {
    candidates.push(candidate)
    setStatus(Status.update)
    saveCandidatesLocalStorage()
  }

  const handlePrevStep = (step: string, candidate: Candidate) => {
    switch (step) {
      case "Entrevista técnica":
        candidate.step = "Entrevista inicial"
        break
      case "Oferta":
        candidate.step = "Entrevista técnica"
        break
      case "Asignación":
        candidate.step = "Oferta"
        break
      case "Rechazo":
        candidate.step = "Asignación"
        break
    }
    saveCandidatesLocalStorage()
    setStatus(Status.update)
  }

  const handleNextStep = (step: string, candidate: Candidate) => {
    switch (step) {
      case "Entrevista inicial":
        candidate.step = "Entrevista técnica"
        break
      case "Entrevista técnica":
        candidate.step = "Oferta"
        break
      case "Oferta":
        candidate.step = "Asignación"
        break
      case "Asignación":
        candidate.step = "Rechazo"
        break
    }
    saveCandidatesLocalStorage()
    setStatus(Status.update)
  }

  const handleDeleteCandidate = (id: string) => {
    const newArray = candidates.filter((candidate) => candidate.id !== id)

    setCandidates(newArray)
    localStorage.setItem("Candidates", JSON.stringify(newArray))
    setStatus(Status.update)
  }

  if (status === "loading") {
    return (
      <Center bg={bg} h="100vh" w="100%">
        <Spinner color={spinner} />
      </Center>
    )
  }

  if (status === "update") {
    setStatus(Status.ready)
  }

  const state: Context["state"] = {
    status,
    candidates,
    candidatesJson,
  }

  const actions = {
    changeStatus: handleChangeStatus,
    getCandidates: handleGetCandidates,
    addCandidate: handleAddCandidate,
    prevStep: handlePrevStep,
    nextStep: handleNextStep,
    deleteCandidate: handleDeleteCandidate,
  }

  return <UserContext.Provider value={{state, actions}}>{children}</UserContext.Provider>
}

export {UserContext as default, UserProvider as Provider}
