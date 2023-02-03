import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat'
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.handshake.headers);
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado');
  }
}
