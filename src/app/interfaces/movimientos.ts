import { transaccion } from './transaccion';

export interface movimientos{
    fullName : string,
    product : string,
    balance : number,
    accountMovement : transaccion[]
}