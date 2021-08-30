import {Candidate} from "../types/candidate"

import candidates from "./candidates.json"

const data = JSON.parse(JSON.stringify(candidates))

export default {
  list: (): Promise<Candidate[]> => Promise.resolve(data),
}
