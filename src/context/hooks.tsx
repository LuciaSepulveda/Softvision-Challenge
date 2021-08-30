import React from "react"

import UserContext, {Context} from "./context"

export function useStatus(): Context["state"]["status"] {
  const {
    state: {status},
  } = React.useContext(UserContext)

  return status
}

export function useCandidates(): Context["state"]["candidates"] {
  const {
    state: {candidates},
  } = React.useContext(UserContext)

  return candidates
}

export function useChangeStatus(): Context["actions"]["changeStatus"] {
  const {
    actions: {changeStatus},
  } = React.useContext(UserContext)

  return changeStatus
}

export function useGetCandidates(): Context["actions"]["getCandidates"] {
  const {
    actions: {getCandidates},
  } = React.useContext(UserContext)

  return getCandidates
}

export function useAddCandidate(): Context["actions"]["addCandidate"] {
  const {
    actions: {addCandidate},
  } = React.useContext(UserContext)

  return addCandidate
}

export function usePrevStep(): Context["actions"]["prevStep"] {
  const {
    actions: {prevStep},
  } = React.useContext(UserContext)

  return prevStep
}

export function useNextStep(): Context["actions"]["nextStep"] {
  const {
    actions: {nextStep},
  } = React.useContext(UserContext)

  return nextStep
}

export function useDeleteCandidate(): Context["actions"]["deleteCandidate"] {
  const {
    actions: {deleteCandidate},
  } = React.useContext(UserContext)

  return deleteCandidate
}

export function useCandidatesJson(): Context["state"]["candidatesJson"] {
  const {
    state: {candidatesJson},
  } = React.useContext(UserContext)

  return candidatesJson
}
