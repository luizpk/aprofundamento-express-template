import express, { Request, Response } from 'express'
import cors from 'cors'
import { accounts } from './database'
import { ACCOUNT_TYPE } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})




app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})





app.get("/accounts", (req: Request, res: Response) => {
    res.send(accounts)
})

// BUSCANDO UMA CONTA PO ID

app.get("/accounts/:id", (req:Request, res:Response)=>{
    
    const id = req.params.id
    const result = accounts.find((account)=>{
        return account.id === id
    })
    res.status(200).send(result)
     
})




// DELETANDO UM CONTA

app.delete("/accounts/:id", (req:Request, res:Response)=>{

    const id = req.params.id

    const accountIndex = accounts.findIndex((account)=>{
        return account.id === id
    })

    console.log("Index:", accountIndex)

    if(accountIndex>=0){
        accounts.splice(accountIndex,1)
        res.status(200).send("Item deletado com sucesso")

    }else {
        res.status(404).send("Item não encontrado")
    }

})



//EDITANDO A CONTA

app.put("/accounts/:id", (req:Request, res:Response)=>{

    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newOwnerName = req.body.ownerName as string | undefined
    const newBalance = req.body.balance as number | undefined
    const newType = req.body.type as ACCOUNT_TYPE | undefined

    const account = accounts.find((account)=>{
        return account.id === id
    })

    if(account){
        account.id = newId || account.id
        account.ownerName = newOwnerName || account.ownerName
        account.balance = isNaN(newBalance) ? account.balance :newBalance
        account.type = newType || account.type

        res.status(200).send("Item modificado com sucesso")
    } else {
        res.status(404).send("Item não encontrado")
    }
})