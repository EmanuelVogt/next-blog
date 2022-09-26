import axios from "axios";
import { parseCookies } from 'nookies'

const cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3030/api/',
  headers: {
    'x-access-token': cookies['@next-token']
  }
})