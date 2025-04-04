import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

export type Country = {
    country: string
    capital: string
}
export const handler: Handlers<Country> = {
    async GET(_req: Request, ctx: FreshContext<unknown, Country>) {
        const { country } = ctx.params;

        if(country){
            const API_KEY = Deno.env.get("API_KEY")
            if(!API_KEY){ return new Response("Api key missing")}

            const api_url = 'https://api.api-ninjas.com/v1/country?name=' + country
            const response = await fetch(api_url,{
                headers: {
                    'X-Api-Key': API_KEY
                }
            })
            const data: Country[] = await response.json()

            if(data.length>= 0){
                return ctx.render({country: country,
                                    capital: data[0].capital})
            }
            return new Response("API fail")
        }
        return ctx.render()
    }
}

export default function country(props: PageProps<Country>) {
    return(
        <div>
            {props.data.country && <h1>{props.data.country}</h1>}
            {props.data.capital && <a href={`/city/${props.data.capital}`}>{props.data.capital}</a>}
        </div>
        
    )
}