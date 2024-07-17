import { Button,Card,IconButton,List,ListItem,ListItemButton,ListItemText,Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/question"
import { type Question as QuestionType } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { FooterInfo } from "./FooterInfo";
const Question=({info}:{info:QuestionType})=>{
    const selectAnswer=useQuestionsStore(state=>state.selectAnswer)

    const createHandleClick=(answerdIndex:number)=>()=>{
        selectAnswer(info.id,answerdIndex)
    }

    const getBackgroundColor=(index:number)=>{
        const {isCorrectUserAnswer,userSelectedAnswer,correctAnswer}=info
        if(userSelectedAnswer==undefined)return 'transparent'
        if(index!==correctAnswer && index!=userSelectedAnswer)return 'transparent'
        if(index===correctAnswer)return 'green'
        if(index===userSelectedAnswer)return 'red'
        return 'transparent'
    }
    return (
        <Card variant="outlined" sx={{bgcolor:'#222',p:2,textAlign:'left',marginTop:4}}>
            <Typography variant="h5">
                {info.question}
            </Typography>
            <SyntaxHighlighter language="javascript" style={gradientDark}>
                {info.code}
            </SyntaxHighlighter>
            <List sx={{bgcolor:'#333',textAlign:'center'}} disablePadding>
            {
                info.answers.map((answer,index)=>(
                    <ListItem key={index} disablePadding divider>
                         <ListItemButton disabled={info.userSelectedAnswer!==undefined} onClick={createHandleClick(index)} sx={{backgroundColor:getBackgroundColor(index)}}>
                            <ListItemText primary={answer} sx={{textAlign:'center',fontWeight:'bold'}}>

                            </ListItemText>
                         </ListItemButton>
                    </ListItem>
                ))
            }
            </List>
        </Card>
    )
}
export const Game=()=>{
const questions=useQuestionsStore(state=>state.questions)
const currentQuestion=useQuestionsStore(state=>state.currentQuestion)
const questionInfo=questions[currentQuestion]
const goNextQuestion=useQuestionsStore(state=>state.goNextQuestion)
const goPreviousQuestion=useQuestionsStore(state=>state.goPreviousQuestion)
return(
    <>
    <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion===0}>
            <ArrowBackIosNew></ArrowBackIosNew>
        </IconButton>
        {currentQuestion+1}/{questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion>=questions.length-1}>
            <ArrowForwardIos></ArrowForwardIos>
        </IconButton>
    </Stack>
    <Question info={questionInfo}></Question>
    <FooterInfo>
    </FooterInfo>
    </>
)
}