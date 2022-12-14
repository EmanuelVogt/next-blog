import axios from "axios";
import { parseCookies } from 'nookies'

const cookies = parseCookies();

export const api = axios.create({
  headers: {
    'x-access-token': cookies['@next-token']
  }
})