import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Formulario } from "../components/Formulario.tsx";

export type Phone = {
  is_valid: boolean
  country: string
  format_international: string
  peticion: boolean
}

export const handler: Handlers<Phone> = {
  async GET(req: Request, ctx: FreshContext<unknown, Phone>) {
    const url = new URL(req.url)
    const phone = url.searchParams.get("phone")

    if(phone){
      const API_KEY = Deno.env.get("API_KEY")
      if(!API_KEY){ return new Response("Api key missing")}

      const api_url = 'https://api.api-ninjas.com/v1/validatephone?number=' + phone
      const response = await fetch(api_url,{
        headers: {
          'X-Api-Key': API_KEY
        }
      })
      const Phone = await response.json()

      return ctx.render({...Phone, peticion:true})
    }

    return ctx.render({is_valid: false,
                      country: "",
                      format_international: "",
                      peticion: false})
  },
};

export default function Home(props: PageProps<Phone>) {
  return (
    <div>
      <Formulario/>
      <div>
        {props.data.is_valid && `Telefono introducido es: ${props.data.format_international}`}
        {props.data.peticion && !props.data.is_valid && "Telefono incorrecto"}
      </div>
      <div>
        {props.data.is_valid && <a href={`/country/${props.data.country}`}>{props.data.country}</a>}
      </div>
    </div>
  );
}
