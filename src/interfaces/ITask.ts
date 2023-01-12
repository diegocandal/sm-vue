export default interface ITask {
    id: number,
    duracaoEmSegundos : number,
    title: string,
    time: string,
    deleting: boolean,
    updating: boolean,
    saving: boolean
}