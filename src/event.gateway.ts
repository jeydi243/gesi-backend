import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class EventGateway {
  @SubscribeMessage('test243')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
