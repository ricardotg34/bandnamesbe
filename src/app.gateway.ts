import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Band } from './band';
import { Bands } from './bands';
@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private bands: Bands) {
    this.bands.addBand(new Band('Metallica'));
    this.bands.addBand(new Band('System of a Down'));
    this.bands.addBand(new Band('Quiebrasol'));
    this.bands.addBand(new Band('Megadeth'));
  }

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.handshake.url);
    client.emit('active-bands', this.bands.bands);
  }

  @SubscribeMessage('emit-message')
  handleEmitMessage(@MessageBody() body: unknown): WsResponse<unknown> {
    return { event: 'new-message', data: body };
  }

  @SubscribeMessage('add-band')
  handleAddBand(@MessageBody() bandName: string) {
    this.bands.addBand(new Band(bandName));
    this.server.emit('active-bands', this.bands.bands);
  }

  @SubscribeMessage('vote-band')
  handleVoteBand(@MessageBody() idBand: string) {
    this.bands.voteBand(idBand);
    this.server.emit('active-bands', this.bands.bands);
  }

  @SubscribeMessage('delete-band')
  handleDelteBand(@MessageBody() idBand: string) {
    this.bands.deleteBand(idBand);
    this.server.emit('active-bands', this.bands.bands);
  }
}
