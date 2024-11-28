import axios from "axios";

const instance = axios.create({
  baseURL: 'http://skeeball.local:3000',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' }
});

// Create WebSocket connection.
const socket = new WebSocket("ws://skeeball.local");



export function useApi() {
  return { instance, socket }
}