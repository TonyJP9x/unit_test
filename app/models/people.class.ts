import { AddressInfo } from './addressInfo.class';

export interface People {
  '@odata.type'?: string;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Emails: string[];
  AddressInfo: AddressInfo[];
  Gender?: string;
  Features?: string[];
  FavoriteFeature?: string;
  Age?: string;
  HomeAddress?: {};
  BossOffice?: string;
  Budget?: number;
  Cost?: number;
}
