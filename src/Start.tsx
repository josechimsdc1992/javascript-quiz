import { Button } from "@mui/material"
import { useQuestionsStore } from "./store/question"

export const Start=()=>{
    const fetchQuestion=useQuestionsStore(state=>state.fetchQuestion)
    const handleClick=()=>{
        fetchQuestion(5)
    }
return (
    <Button onClick={handleClick} variant="contained">
        Empezar!
    </Button>
)
}