import { create } from "zustand"
import { type Question } from "../types"
import confetti from "canvas-confetti"
import { persist,devtools } from "zustand/middleware"
interface State{
    questions:Question[]
    currentQuestion:number
    fetchQuestion:(limit:number)=>Promise<void>
    selectAnswer:(questionid:number,answerindex:number)=>void,
    goNextQuestion:()=>void,
    goPreviousQuestion:()=>void,
    reset:()=>void
}
const logger=(config)=>(get,set,api)=>{
    return config(
        (...args)=>{
            console.log(' applyng',args)
            set( ...args )
            console.log(' new state',get())
        },
        get,
        api
    )
}
export const useQuestionsStore=create<State>()(
    devtools(
    persist(
        (set,get)=>{
            return{
                questions:[],
                currentQuestion:0,
                fetchQuestion:async (limit:number)=>{
                    const res=await fetch('http://localhost:5173/data.json')
                    const json=await res.json()
        
                    const questions=json.sort(()=>Math.random()-0.5).slice(0,limit)
                    set({questions},false,'FETCH-QUESTION')
                },
                selectAnswer:(questionid:number, answerindex:number)=> {
                    const {questions} =get()
                    const newquestions=structuredClone(questions)
                    const questionIndex=newquestions.findIndex(q=>q.id==questionid)
                    const questionInfo=newquestions[questionIndex]
                    const isCorrectUserAnswer=questionInfo.correctAnswer==answerindex
                    if(isCorrectUserAnswer)confetti()
                    newquestions[questionIndex]={
                        ...questionInfo,
                        isCorrectUserAnswer,
                        userSelectedAnswer:answerindex
                    }
                    set({questions:newquestions})
                },
                goNextQuestion:()=>{
                    const {questions,currentQuestion}=get()
                    const nextQuestion=currentQuestion+1
        
                    if(nextQuestion<questions.length){
                        set({currentQuestion:nextQuestion})
                    }
                },
                goPreviousQuestion:()=>{
                    const {currentQuestion}=get()
                    const previousQuestion=currentQuestion-1
        
                    if(previousQuestion>=0){
                        set({currentQuestion:previousQuestion})
                    }
                },
                reset:()=>{
                    set({currentQuestion:0,questions:[]})
                }
            }
            }
            ,
    {name:'questions'}
    )
    )
)