import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

export type Country = {
    country: string
    name: string
    latitude: number
    longitude: number
}

export type Weather = {
    temp: number
}

export type Data = {
    country: string
    name: string
    temp: number
}
export const handler: Handlers<Data> = {
    async GET(_req: Request, ctx: FreshContext<unknown, Data>) {
        const { city } = ctx.params;

        if(city){
            const API_KEY = Deno.env.get("API_KEY")
            if(!API_KEY){ return new Response("Api key missing")}

            const api_url = 'https://api.api-ninjas.com/v1/city?name=' + city
            const response = await fetch(api_url,{
                headers: {
                    'X-Api-Key': API_KEY
                }
            })
            const data: Country[] = await response.json()

            if(data.length>= 0){
                const api_url2 = 'https://api.api-ninjas.com/v1/weather?lat=' + data[0].latitude + '&lon=' + data[0].longitude
                const response2 = await fetch(api_url2,{
                headers: {
                    'X-Api-Key': API_KEY
                }})
                const data2: Weather = await response2.json()

                return ctx.render({
                    country: data[0].country,
                    name : city,
                    temp : data2.temp
                })
            }
            return new Response("API fail")
        }
        return ctx.render()
    }
}

export default function city(props: PageProps<Data>) {
    return(
        <div>
            <div>{props.data.name && <p>Ciudad: {props.data.name}</p> }</div>
            <div>{props.data.country && <a href={`/country/${props.data.country}`}><p>Pais: {props.data.country}</p></a>}</div>
            <div>{props.data.temp && <p>Temperatura: {props.data.temp}</p>}</div>
        </div>
        
    )
}