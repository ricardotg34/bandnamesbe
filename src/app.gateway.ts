import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  handleConnection(server: Server) {
    server.emit('init', { message: 'Hello' });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: unknown): string {
    console.log(body);
    return 'Hello world!';
  }
}
