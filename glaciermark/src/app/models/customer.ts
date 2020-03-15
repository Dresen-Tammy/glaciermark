import { Project } from './project';

export class Customer {
  public customerId: string;
  public customerName: string;
  public customerSummary: string;
  public projects: Array<Project>;
}
