import { People } from './people.class';

export interface Odata {
  '@odata.context': string;
  value: People[];
}
