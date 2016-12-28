interface WebSocketInterface {
  close(code?: string, reason?: string);
  send(data: string);
}