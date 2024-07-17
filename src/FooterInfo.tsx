import { Button } from "@mui/material"
import { useQuestionData } from "./hooks/useQuestionData"
import { useQuestionsStore } from "./store/question"

export const FooterInfo=()=>{
    const {correct,incorrect,unanswered}=useQuestionData()
    const reset=useQuestionsStore(state=>state.reset)
    return(
    <footer style={{marginTop:'16px'}}>
        <strong>
        Correctas:{correct} Incorrectas:{incorrect} Sin Contestar:{unanswered}
        </strong>
        <div style={{marginTop:'16px'}}>
            <Button onClick={()=>{reset()}}>
                Reset
            </Button>
        </div>
    </footer>
    )
}