import {Candidate} from "../types/candidate"

const candidates = new Request("./src/api/candidates.json")

export default {
  /*
  candidates: {
    list: (): Promise<Candidate[]> => Promise.resolve([]),
  },

  */

  list: (): Promise<Candidate[]> =>
    fetch(candidates, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .catch((err) => {
        console.log("Data: ", err)
      }),
}
