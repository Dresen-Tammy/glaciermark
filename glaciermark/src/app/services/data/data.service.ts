import { SeoService } from './../seo/seo.service';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, Subject, of } from 'rxjs';
import { retry, tap, map, takeUntil, catchError } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Customer } from '../../models/customer';
import { ServerCustomer } from 'src/app/models/server-customer';
import { Location } from '@angular/common';

export interface Msg {
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {

  public readonly allCustomers$: Observable<Array<Customer>>;
  public readonly currentCustomer$: Observable<Customer>;
  public readonly currentProject$: Observable<Project>;
  public readonly portfolio$: Observable<Array<Project>>;


  private currentCustomerId: string = 'loading';
  private currentProjectId: string = 'loading';
  private currentProjectIndex: number = 0;
  private currentCustomerIndex: number = 0;
  private defaultProject: Project;
  private defaultCustomer: Customer;
  private allCustomersBS: BehaviorSubject<Array<Customer>>;
  private currentCustomerBS: BehaviorSubject<Customer>;
  private currentProjectBS: BehaviorSubject<Project>;
  private portfolioBS: BehaviorSubject<Array<Project>>;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private clientsData: Customer[] = [
    {
      customerId: "alpinejewelers", 
      customerName:	"Alpine Jewelers",	
      customerSummary: "Alpine Jewelers was looking for an ad campaign that moved away from price and emphasized the emotion of purchasing jewelry.", 
      projects:	[
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", portfolio: 0, projectClass: "qtr-project", projectId:	"10", projectText:	"Ad Campaign", projectType:	"Print Design", src:	"alpine-kiss-print-ad" },
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", projectClass: "qtr-project", projectId:	"11", projectText:	"Christmas Mailer", projectType:	"Print Design", src:	"alpine-mailer-1-marketing" },
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", portfolio: 26, projectClass: "qtr-project", projectId:	"12", projectText:	"Christmas Mailer", projectType:	"Print Design", src:	"alpine-mailer-2-marketing" },
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", projectClass: "qtr-project", projectId:	"7", projectText:	"Ad Campaign", projectType:"Print Design", src:	"alpine-couple-print-ad" },
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", projectClass: "qtr-project", projectId:	"8", projectText:	"Ad Campaign", projectType:"Print Design", src:	"alpine-beach-print-ad" },
        { customerId: "alpinejewelers", customerName:	"Alpine Jewelers", portfolio: 2, projectClass: "qtr-project", projectId:	"9", projectText:	"Ad Campaign", projectType:"Print Design", src:	"alpine-dress-print-ad" }
      ]
    },
    {
      customerId: "austinkade", 
      customerName:	"Austin Kade",	
      customerSummary: "Austin Kade is a cosmetology academy based in Idaho. They wanted a fresh, new, modern look and feel for their online presence, targeted at their core customers of 18-29 yrs old. Knowing that target segment spends most of their time on mobile devices, a mobile-first responsive solution was mandatory, along with visually striking graphics.", 
      projects:	[
        { customerId: "austinkade", customerName:	"Austin Kade", portfolio: 3, projectClass: "qtr-project", projectId: "0", projectText: "Responsive Website", projectType: "Web Design", src: "austinkade-responsive-website"},
        { customerId: "austinkade", customerName:	"Austin Kade", projectClass: "qtr-project", projectId: "19", projectText: "Home Page", projectType: "Web Design", src: "austinkade_home-website"},
        { customerId: "austinkade", customerName:	"Austin Kade", projectClass: "qtr-project", projectId: "20", projectText: "Services Page", projectType: "Web Design", src: "austinkade_services-website"}
      ] 
    },
    {
      customerId: "lawntech", 
      customerName:	"LawnTech",	
      customerSummary: "LawnTech wanted to update their look and feel to be as successful as the corporate brand. New imagery and bold graphics, with a focus on providing a fresh and healthy appearance, were utilized to successfully launch the updated look.", 
      projects:	[
        {	customerId: "lawntech", customerName:	"LawnTech", portfolio: 28, projectClass: "wide-project", projectId:	"5", projectText:	"Brand Assets", projectType:	"Branding", src:	"lawntech-branding"},
        {	customerId: "lawntech", customerName:	"LawnTech", portfolio: 5, projectClass: "wide-project", projectId:	"21", projectText:	"Kit Folder", projectType:	"Print Design", src:	"lawntech_kit_marketing_outside"},
        {	customerId: "lawntech", customerName:	"LawnTech", projectClass: "wide-project", projectId:	"22", projectText:	"Brand Assets", projectType:	"Branding", src:	"lawntech_kit_marketing_inside"}
      ] 
    },
    {
      customerId: "liljenquist", 
      customerName:	"Liljenquist Ortho",	
      customerSummary: "Dr. Liljenquist wanted an ad campaign that communicated movement and energy, and that appealed to a young, athletic audience.", 
      projects:	[
        { customerId: "liljenquist", customerName:	"Liljenquist Ortho", portfolio: 6,	projectClass: "qtr-project", projectId:	"1", projectType:	"Magazine Campaign", projectText:	"Print Design", src: "liljenquist-magazine_print_ad"},
        { customerId: "liljenquist", customerName:	"Liljenquist Ortho", portfolio: 7,	projectClass: "qtr-project", projectId:	"23", projectType:	"Magazine Campaign", projectText:	"Print Design", src: "liljenquist_cycle_print_ad"},
        { customerId: "liljenquist", customerName:	"Liljenquist Ortho", portfolio: 8,	projectClass: "qtr-project", projectId:	"24", projectType:	"Magazine Campaign", projectText:	"Print Design", src: "liljenquist_hike_print_ad"},
        { customerId: "liljenquist", customerName:	"Liljenquist Ortho", portfolio: 9,	projectClass: "qtr-project", projectId:	"25", projectType:	"Magazine Campaign", projectText:	"Print Design", src: "liljenquist_snow_print_ad"},
      ] 
    },
    {
      customerId: "logos", 
      customerName:	"Logos",	
      customerSummary: "Your logo is an important part of your brand. Let us help you make a great first impression.", 
      projects:	[
        { customerId: "logos", customerName:	"Logos", portfolio: 10, projectClass:	"quad-project", projectId:	"3", projectText:	"Assorted Logos", projectType:	"Branding", src:	"logo-desktop-branding" },
        { customerId: "logos", customerName:	"Logos", portfolio: 11, projectClass:	"quad-project", projectId:	"5", projectText:	"Adanced Health", projectType:	"Branding", src:	"advanced-health-logo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 12, projectClass:	"quad-project", projectId:	"7", projectText:	"Landspin", projectType:	"Branding", src:	"Landspinlogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 13, projectClass:	"quad-project", projectId:	"8", projectText:	"Main Street", projectType:	"Branding", src:	"Mainstreetlogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 14, projectClass:	"quad-project", projectId:	"9", projectText:	"Northpoint", projectType:	"Branding", src:	"Northpointlogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"10", projectText:	"Prairie Applications", projectType:	"Branding", src:	"Prairielogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 16, projectClass:	"quad-project", projectId:	"11", projectText:	"Renew Weight Loss", projectType:	"Branding", src:	"Renewlogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"12", projectText:	"Risex", projectType:	"Branding", src:	"Risex2logo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 18, projectClass:	"quad-project", projectId:	"14", projectText:	"Rosemark", projectType:	"Branding", src:	"Rosemarklogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"15", projectText:	"Rymer", projectType:	"Branding", src:	"Rymerlogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"16", projectText:	"Smoke on the Snake", projectType:	"Branding", src:	"Smokelogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 21, projectClass:	"quad-project", projectId:	"17", projectText:	"Snake River Animal Shelter", projectType:	"Branding", src:	"SRASlogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"18", projectText:	"Sleepy Ridge Golf", projectType:	"Branding", src:	"SRlogo-design" },
        { customerId: "logos", customerName:	"Logos", projectClass:	"quad-project", projectId:	"19", projectText:	"Strategic Social Partners", projectType:	"Branding", src:	"SSPlogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 24, projectClass:	"quad-project", projectId:	"20", projectText:	"Tallman", projectType:	"Branding", src:	"Tallmanlogo-design" },
        { customerId: "logos", customerName:	"Logos", portfolio: 24, projectClass:	"quad-project", projectId:	"21", projectText:	"Ufandi", projectType:	"Branding", src:	"Ufandilogo-design" }
      ]
    },
    {
      customerId: "stones", 
      customerName:	"Stone's Kia",	
      customerSummary: "Stone's Kia wanted to show off their new facility with a TV commercial that highlighted the best features.", 
      projects:	[
        { customerId: "stones", customerName:	"Stone's Kia", portfolio: 1, projectClass:	"qtr-project", projectId:	"6", projectText:	"Television Ad", projectType:	"TV & Radio", src:	"stones-kia-tv", video:	"stones-kia" }
      ] 
    },
    {
      customerId: "tallman", 
      customerName:	"Tallman Construction",	
      customerSummary: "Tallman was a new construction company wanting to highlight their attention to detail and quality craftsmanship in their branding. The business identity was created to highlight the craftsmanship aspect through the “draft” style graphics. The online responsive presence was created to focus on their quality craftsmanship and exquisite attention to detail in their homes.", 
      projects:	[
        { customerId: "tallman", customerName:	"Tallman Construction", portfolio: 25,	projectClass: "qtr-project",	projectId: "4", projectText:	"Responsive Website", projectType:	"Web Design",	src: "tallman-website"},
        { customerId: "tallman", customerName:	"Tallman Construction", projectClass: "qtr-project",	projectId: "13", projectText:	"Responsive Website", projectType:	"Home Page",	src: "tallman_home_website"},
        { customerId: "tallman", customerName:	"Tallman Construction", projectClass: "qtr-project",	projectId: "14", projectText:	"Responsive Website", projectType:	"About Page",	src: "tallman_about_website"},
        { customerId: "tallman", customerName:	"Tallman Construction", portfolio: 27,	projectClass: "qtr-project",	projectId: "15", projectText:	"Responsive Website", projectType:	"Stationary Package",	src: "tallman_stationery_branding"},
      ] 
    },
    {
      customerId: "txtwire", 
      customerName:	"TxtWire",	
      customerSummary: "TxtWire is an international SMS messaging service. They wanted to make sure that their branding matched their reach as a company serving much of the world. Strong colors, graphics and strategic use of people in imagery provided the brand identity they needed.", 
      projects:	[
        {	customerId: "txtwire", customerName:	"TxtWire", portfolio: 4, projectClass:	"tall-project", projectId:	"3", projectText:	"Infographic", projectType:	"Print Design", src: "txtwire-infographic" },
        {	customerId: "txtwire", customerName:	"TxtWire", projectClass:	"tall-project", projectId:	"16", projectText:	"Advertisement", projectType:	"Print Design", src: "txtwire_print_ad_baloons" },
        {	customerId: "txtwire", customerName:	"TxtWire", projectClass:	"tall-project", projectId:	"17", projectText:	"Advertisement", projectType:	"Print Design", src: "txtwire_print_ad" },
        {	customerId: "txtwire", customerName:	"TxtWire", projectClass:	"tall-project", projectId:	"18", projectText:	"White Paper", projectType:	"Print Design", src: "txtwire_branding_whitepaper" },
        {	customerId: "txtwire", customerName:	"TxtWire", projectClass:	"tall-project", projectId:	"19", projectText:	"Responsive Website", projectType:	"Web Design", src: "txtwire-responsive-web-design" },
        {	customerId: "txtwire", customerName:	"TxtWire", projectClass:	"tall-project", projectId:	"20", projectText:	"Web Design", projectType:	"Web Design", src: "txtwire-home-website" },
      ]
    }
  ];
  private baseurl = 'https://us-central1-glaciermark.cloudfunctions.net/webApi/api/v1';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private seoData = {
    title: 'Glacier Marketing Company - Idaho Falls - Customer: ' + this.currentCustomerId,
    description: 'Check out our portfolio of print design, digital &amp; website design,'
    + ' marketing or branding services. We have the experience to help your business with any'
    + ' nmarketing needs - all in one team! No need to parsel out your business marketing when'
    + ' you can get the Glacier Marketing services from one company. Call today 208-557-9114.',
    url: 'https://glaciermark.com/project?customer=' + this.currentCustomerId + '&project=' + this.currentProjectId
  };

  constructor(
    private http: HttpClient,
    private seo: SeoService,
    private location: Location
    ) {
    this.defaultProject = new Project();
    this.defaultProject.projectId = '-1';
    this.defaultProject.projectClass = 'default';
    this.defaultProject.projectType = 'default';
    this.defaultProject.projectText = 'loading';
    this.defaultProject.customerName = 'Please Wait';
    this.defaultProject.src = 'default-project';
    this.defaultCustomer = new Customer();
    this.defaultCustomer.customerId = 'loading';
    this.defaultCustomer.customerName = 'Loading';
    this.defaultCustomer.customerSummary = '';
    this.defaultCustomer.projects = [this.defaultProject];

    this.allCustomersBS = new BehaviorSubject<Array<Customer>>([this.defaultCustomer]);
    this.currentCustomerBS = new BehaviorSubject(this.defaultCustomer);
    this.currentProjectBS = new BehaviorSubject(this.defaultProject);
    this.portfolioBS = new BehaviorSubject<Array<Project>>([this.defaultProject]);
    this.allCustomers$ = this.allCustomersBS.asObservable();
    this.currentCustomer$ = this.currentCustomerBS.asObservable();
    this.currentProject$ = this.currentProjectBS.asObservable();
    this.portfolio$ = this.portfolioBS.asObservable();
  }

  public initialize(): Observable<object> {
    return this.getClients().pipe(
      map(() => {
        return {};
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public getClients(): Observable<Customer[]> {
        const clientsData: Customer[] = [];
        const projectsArray: Project[] = [];
        this.clientsData.map((item: Customer, index: number) => {
          item.projects.map((project: Project) => {
            if (project.portfolio) {
              projectsArray.push(project)
            }
          });
          // if (item.customerId === 'logos') {
          //   item.projects.shift();
          // }
          clientsData.push(item);
        });
        this.allCustomersBS.next(clientsData);
        this.portfolioBS.next(projectsArray);
    return of(this.clientsData)
  }

  public setCustomerProjects(customerId: string): void {
    this.currentCustomerId = customerId;
    this.allCustomers$.subscribe((clients: Array<Customer>) => {
      clients.forEach((client: Customer, index: number) => {
        if (client.customerId === this.currentCustomerId) {
          this.currentCustomerBS.next(client);
        }
      });
      takeUntil(this.destroy$);
    });
  }

  public setCurrentProject(projectId: string = 'first'): void {
    const projects = this.currentCustomerBS.getValue().projects;
    if (projectId === 'first') {
      projectId = projects[0].projectId;
      this.currentProjectIndex = 0;
    } else if (projectId === 'last') {
      projectId = projects[projects.length - 1].projectId;
    }
    this.currentProjectId = projectId;
    this.currentCustomer$.subscribe((client: Customer) => {
      client.projects.map((project: Project, index: number) => {
        if (this.currentProjectId === project.projectId) {
          this.currentProjectBS.next(project);
          this.currentProjectIndex = index;
          this.updateSeo();
          this.updateUrl();
        }
      });
      takeUntil(this.destroy$);
    });
  }
  public setDefault(): void {
    this.currentProjectBS.next(this.defaultProject);
  }

  public setNextProject(customerId): void {
    const projects = this.currentCustomerBS.getValue().projects;
    this.currentProjectIndex++;
    if (this.currentProjectIndex >= projects.length) {
      this.setNextCustomer();
      this.setCurrentProject('first');
    } else {
      this.currentProjectBS.next(projects[this.currentProjectIndex]);
      this.currentProjectId = projects[this.currentProjectIndex].projectId;
    }
    this.updateSeo();
    this.updateUrl();
  }

  public setPreviousProject(): void {
    const projects = this.currentCustomerBS.getValue().projects;
    this.currentProjectIndex--;
    if (this.currentProjectIndex < 0) {
      this.setPreviousCustomer();
      this.setCurrentProject('last');
    } else {
      this.currentProjectBS.next(projects[this.currentProjectIndex]);
      this.currentProjectId = projects[this.currentProjectIndex].projectId;
    }
    this.updateSeo();
    this.updateUrl();
  }

  private updateSeo(): void {
    this.seoData.title = 'Glacier Marketing Company - Idaho Falls - Customer: '
    + this.currentCustomerId + ' Project: '
    + this.currentProjectBS.getValue().projectText;
    this.seo.update(this.seoData);
  }

  private updateUrl(): void {
    this.location.replaceState('/project/?customer=' + this.currentCustomerId + '&project=' + this.currentProjectId);
  }

  public setPreviousCustomer(): void {
    const customers = this.allCustomersBS.getValue();
    let index = customers.indexOf(this.currentCustomerBS.getValue()) - 1;

    if (index < 0) {
      index = customers.length - 1;
    } 
    this.currentCustomerBS.next(customers[index])
    this.setCurrentProject('last')
    this.setCustomerProjects(customers[index].customerId);
  }

  public setNextCustomer(): void {
    const customers = this.allCustomersBS.getValue();
    let index = customers.indexOf(this.currentCustomerBS.getValue()) + 1;
    if (index >= customers.length) {
      index = 0;
    }
    this.currentCustomerBS.next(customers[index])
    this.setCustomerProjects(customers[index].customerId);
    this.setCurrentProject('first');
  }
}
