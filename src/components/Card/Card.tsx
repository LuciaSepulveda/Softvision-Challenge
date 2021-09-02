import React from "react"
import {
  Box,
  Button,
  Center,
  Circle,
  Divider,
  HStack,
  Input,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import {motion} from "framer-motion"
import {useMediaQuery} from "react-responsive"

import {Candidate} from "../../types/candidate"
import {
  useNextStep,
  usePrevStep,
  useAddCandidate,
  useDeleteCandidate,
  useCandidatesJson,
} from "../../context/hooks"

interface Props {
  title: string
  candidates: Candidate[]
}

const Card: React.FC<Props> = ({candidates, title}) => {
  const bg = useColorModeValue("#DEEDF0", "#263859")
  const bgCard = useColorModeValue("#F4C7AB", "#6B778D")
  const bgButton = useColorModeValue("#B2B8A3", "#FF6768")
  const color = useColorModeValue("#242424", "#FBFBFB")
  const [addOpen, setAddOpen] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>("")
  const [comment, setComment] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")
  const [id, setId] = React.useState<string>("")
  const isTabletOrMobile = useMediaQuery({maxWidth: 1024})

  const prevStep = usePrevStep()
  const nextStep = useNextStep()
  const addCandidates = useAddCandidate()
  const deleteCandidate = useDeleteCandidate()
  const candidatesJson = useCandidatesJson()

  const handleChangeName = (event: {target: {value: React.SetStateAction<string>}}) => {
    setName(event.target.value)
  }

  const handleChangeComment = (event: {target: {value: React.SetStateAction<string>}}) => {
    setComment(event.target.value)
  }

  const handleChangeId = (event: {target: {value: React.SetStateAction<string>}}) => {
    setId(event.target.value)
  }

  const addCandidate = () => {
    if (name !== "" && id !== "") {
      addCandidates({
        id: id,
        name: name,
        comments: comment,
        step: "Entrevista inicial",
      })
      setAddOpen(false)
      setName("")
      setComment("")
      setId("")
      setError("")
    } else {
      if (id === "" && name !== "") {
        setError("El candidato tiene que tener un id")
      }
      if (name === "" && id !== "") {
        setError("El candidato tiene que tener un nombre")
      }
      if (name === "" && id === "") {
        setError("El candidato tiene que tener un nombre y un id")
      }
    }
  }

  const candidateJson = (id: string) => {
    let exist = false

    candidatesJson.forEach((candidate) => {
      if (candidate.id === id) {
        exist = true
      }
    })

    return exist
  }

  React.useEffect(() => {
    return
  }, [candidates])

  return (
    <motion.div animate={{scale: 1}} initial={{scale: 0}}>
      <VStack bg={bg} boxShadow="md" color={color} p={2} w="100%">
        <HStack justify="space-between" w="100%">
          <Text fontSize={["xl", "2xl"]} fontWeight="bold" ml={2}>
            {title}
          </Text>
          {candidates.length !== 0 && (
            <Circle bg={color} minWidth="25px">
              <Text color={bg}>{candidates.length}</Text>
            </Circle>
          )}
        </HStack>
        {candidates.length === 0 && <Text>No hay candidatos</Text>}
        {candidates.length !== 0 &&
          candidates.map((candidate) => {
            return (
              <motion.div
                key={candidate.id}
                animate={{scale: 1}}
                exit={{scale: 0}}
                initial={{scale: 0}}
                style={{width: "96%"}}
              >
                <VStack bg={bgCard} borderRadius="md">
                  <HStack justify="space-between" p={2} w="100%">
                    <Text align="left" fontWeight="semibold" ml={2} overflow="hidden" w="100%">
                      {candidate.name}
                    </Text>
                    {!candidateJson(candidate.id) && (
                      <Center
                        as="button"
                        bg={bgButton}
                        h={5}
                        m="auto"
                        p={1}
                        onClick={() => deleteCandidate(candidate.id)}
                      >
                        X
                      </Center>
                    )}
                  </HStack>
                  <Divider bg={bg} m="auto" w="90%" />
                  <Stack
                    borderBottomRadius="md"
                    direction={["column", null, "row"]}
                    h="100%"
                    p={2}
                    w="100%"
                  >
                    <Text align="left" ml={2} w="100%">
                      {candidate.comments}
                    </Text>
                    <HStack>
                      {title !== "Entrevista inicial" && (
                        <Button bg={bg} onClick={() => prevStep(candidate.step, candidate)}>
                          {isTabletOrMobile && "˄"}
                          {!isTabletOrMobile && "<"}
                        </Button>
                      )}
                      {title !== "Rechazo" && (
                        <Button bg={bg} onClick={() => nextStep(candidate.step, candidate)}>
                          {!isTabletOrMobile && ">"}
                          {isTabletOrMobile && "˅"}
                        </Button>
                      )}
                    </HStack>
                  </Stack>
                </VStack>
              </motion.div>
            )
          })}
        {title === "Entrevista inicial" && !addOpen && (
          <Button bg={bgButton} onClick={() => setAddOpen(true)}>
            Agregar candidato
          </Button>
        )}
        {title === "Entrevista inicial" && addOpen && (
          <VStack w="100%">
            <Input
              placeholder="*Nombre y apellido"
              value={name}
              variant="filled"
              onChange={handleChangeName}
            />
            <Input placeholder="*Id" value={id} variant="filled" onChange={handleChangeId} />
            <Input
              placeholder="Comentario"
              value={comment}
              variant="filled"
              onChange={handleChangeComment}
            />
            <HStack>
              <Button bg={bgButton} onClick={addCandidate}>
                Agregar
              </Button>
              <Button
                bg={bgButton}
                onClick={() => {
                  setAddOpen(false), setError(""), setName(""), setId(""), setComment("")
                }}
              >
                Cancelar
              </Button>
            </HStack>
          </VStack>
        )}
        <Text color="red">{error}</Text>
      </VStack>
    </motion.div>
  )
}

export default Card
