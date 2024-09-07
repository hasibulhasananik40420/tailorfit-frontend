/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form"

type TResolverProps ={
    resolver?:any
    defaultValues?:Record<string,any>
}


type TFormProps ={
    children:ReactNode
    onSubmit:SubmitHandler<FieldValues>
} & TResolverProps


const ReuseMainForm = ({children, onSubmit,resolver,defaultValues}:TFormProps) => {

    const formConfig:TResolverProps = {}

    if(resolver){
        formConfig['resolver'] = resolver
      }

      
      if(defaultValues){
        formConfig['defaultValues'] = defaultValues
      }


    const methods = useForm(formConfig)
    const {handleSubmit} = methods

    const submit:SubmitHandler<FieldValues> = (data) => {
         
        // console.log(data)
        // console.log(e)
        // e?.preventDefault()
        onSubmit(data)
        // methods.reset()
    
    }
  return (
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(submit)}>
      {children}
    </form>
  </FormProvider>
  )
}

export default ReuseMainForm