import { OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection{
  handleConnection(server: Server) {
    server.emit('init', { message: 'Hello' });
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}
