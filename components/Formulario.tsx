
//export function Formulario : FunctionalComponent<Props> = () {
export function Formulario () {
    return(
        <div>
            <form method="get">
                <input name="phone" value="" placeholder="num telefeno"></input>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
}