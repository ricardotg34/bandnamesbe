import { v4 as uuidv4 } from 'uuid';

export class Band {
  id: string;
  name: string;
  votes: number;

  constructor(name = 'no-name') {
    this.id = uuidv4();
    this.name = name;
    this.votes = 0;
  }
}
