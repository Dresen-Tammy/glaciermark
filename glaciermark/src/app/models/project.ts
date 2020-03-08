export class Project {
  public customerSummary?: string; // description on client page
  public customerName?: string; // to pick projects for client page from portfolio
  public customerId?: string;
  public hero?: boolean; // if hero === 1, project goes on home page.
  public projectId: string; // to pick which project is main image from porfolio
  public portfolio?: number;
  public projectClass: string; // class will be hard coded on each page. Needs to be an image for each class size.
  public projectType: string; // to filter by project type
  public projectText?: string; // information about project for client page when project hero is shown
  public src: string;  // image src for image. Suffix will be added on page to determine size (thumb or hero), srcSet derived from this
  public audio?: string; // path to audio clip
  public video?: string; // for video clips
}
