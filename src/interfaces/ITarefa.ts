export default interface ITarefa {
    id: number,
    duracaoEmSegundos : number,
    descricao: string,
    title: string,
    time: string,
    deleting: boolean,
    updating: boolean,
    saving: boolean
}