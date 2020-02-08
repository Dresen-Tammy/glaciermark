import { OfferingSection } from './../../models/offering-section';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {

  public offerings: OfferingSection[] = [
    {
      offeringHeader: {
        headerTitle: 'DESIGN & BRANDING',
        headerImg: 'design-icons',
        // tslint:disable-next-line: max-line-length
        headerText: 'A creative and precisely implemented brand strategy touches all aspects of your business, and is directly connected to your customer’s perception of your business. We begin by clearly understanding your customers, business objectives, competition and vision, which is the framework for us to build your successful identity.',
        headerImgWidth: '145px',
        headerBackground: 'rgb(107, 99, 131)',
        anchor: 'design'
      },
      offeringTiles: [
        {
          src: 'Boost',
          alt: 'Boost Your Brand',
          header: 'Branding',
          // tslint:disable-next-line: max-line-length
          text: 'We work closely with you to help define your brand strategy, to identity, and most importantly, deliver your promise through execution. The solutions we design will ensure that across every touch point of your business, that promise is evident.',
          // tslint:disable-next-line: max-line-length
          text2: 'Whether you are creating or growing a business, we can help you connect with your customers through custom designed experiences and solutions that bring your brand to life.',
          text3: ['BRAND STRATEGY', 'BRAND IDENTITY', 'BRAND EXECUTION', 'BRAND CONSULTATION']
        },
        {
          src: 'Innovation',
          alt: 'Innovation',
          header: 'Experience Design',
          // tslint:disable-next-line: max-line-length
          text: 'Our focus on the customer is the first step in designing the right solution. We use a human-centered design approach that combines the users needs, your business strategy, and technological capabilities to create an innovation focal point where creativity thrives.',
          // tslint:disable-next-line: max-line-length
          text2: 'By using this strategy, we ensure that the experiences we design compliment your brand, start with your customer, and focus on innovation.',
          text3: ['CUSTOMER RESEARCH', 'DIGITAL DESIGN', 'COMMUNICATIONS DESIGN', 'MOBILE DESIGN']
        },
        {
          src: 'Creative',
          alt: 'Creative Thinking',
          header: 'Marketing Design',
          // tslint:disable-next-line: max-line-length
          text: 'The successful design and implementation of your marketing strategy all play out in your collateral. If your designs do not meet your business objectives, support your brand promise, meet your customers’ expectations, and wow them, you are missing the mark.',
          // tslint:disable-next-line: max-line-length
          text3: ['MARKET RESEARCH', 'CONTENT STRATEGY', 'MOBILE DESIGN', 'CREATIVE DESIGN']
        },
      ]
    },
    {
      offeringHeader: {
        headerTitle: 'MEDIA & MARKETING',
        headerImg: 'media-icons',
        // tslint:disable-next-line: max-line-length
        headerText: 'Building a relationship with your customers is one of the hardest things to do in marketing. If you don’t understand what your customers do on a day-to-day basis, you have no chance. We can help you make that connection that will keep them coming back.',
        headerImgWidth: '145px',
        headerBackground: 'rgb(195, 135, 65)',
        anchor: 'media'
      },
      offeringTiles: [
        {
          src: 'Media',
          alt: 'Media Channels',
          header: 'Media Placement',
          // tslint:disable-next-line: max-line-length
          text: 'The world is changing rapidly, as technology continues to evolve. This ever changing landscape can be difficult to manage and costly to maintain. Our experience and expertise can help you manage all your media channels to ensure you are optimizing your budget.',
          // tslint:disable-next-line: max-line-length
          text2: 'Our team can also handle your marketing needs for promotions and events, with over 30 years of award winning experience. Our understanding of today’s marketplace, along with the ability to think outside the box, provides our clients with cost effective marketing campaigns that are memorable and deliver results.',
        },
        {
          src: 'Relevant',
          alt: 'Relevant Marketing',
          header: 'Social & Mobile Marketing',
          // tslint:disable-next-line: max-line-length
          text: 'Today, social marketing is no longer a question, it’s an absolute necessity. Unlike traditional marketing avenues, social marketing provides a direct link to and from your customers, bringing critical feedback for your business to adjust and grow.',
          // tslint:disable-next-line: max-line-length
          text2: 'As unique as each marketplace and business may be, each solution is equally customizable, and complete with analysis and reports. As a team, we will work together in keeping you in the loop with your customers and your customers actively engaged with your business.',
        },
        {
          src: 'Target',
          alt: 'Hit Your Target',
          header: 'Campaign Management',
          // tslint:disable-next-line: max-line-length
          text: 'We will help you target and manage your multi-channel marketing, ensuring you are optimizing your budgets and efforts, as well as providing a consistent voice to your customers.',
          // tslint:disable-next-line: max-line-length
          text2: 'Our team works closely with you to insure all of the critical elements are captured, then conveyed consistently through each media outlet. We have the knowledge and understanding to plan, design, and execute the perfect solution for your business.',
        },
        {
          src: 'Optimization',
          alt: 'Optimization',
          header: 'SEO/PPC',
          // tslint:disable-next-line: max-line-length
          text: 'You can have an award winning website, but if no one can find you, it doesn’t matter. At Glacier Marketing, we’ll make sure your website is beautiful, functional, and discoverable by your customers!',
          // tslint:disable-next-line: max-line-length
          text2: 'Our developers understand how the framework, or “back-end,” directly affects the ability to be found by your customers. They work seamlessly with our SEO specialists to assure your site is search and user friendly, as well as usable (responsive) across all mobile platforms. With one of our aggressive SEO packages, plus the ability to add PPC campaigns, there truly is an SEO/PPC solution for every budget. Plus, we provide regular analytics, reports and support whenever you need it.',
        },
      ]
    },
    {
      offeringHeader: {
        headerTitle: 'CONSULTING',
        headerImg: 'consulting-icons',
        // tslint:disable-next-line: max-line-length
        headerText: 'Whether you are missing the mark in your marketing campaigns, or your brand has lost its identity, we can help. Building off of the foundation of a human-centered design approach, we combine insights, collaboration, and exceptional execution to come up with a strategy that will get you ahead of your competition.',
        headerImgWidth: '100px',
        headerBackground: 'rgb(112, 130, 107)',
        anchor: 'consulting'
      },
      offeringTiles: [
        {
          src: 'Boost',
          alt: 'Boost Your Brand',
          header: 'Branding',
          // tslint:disable-next-line: max-line-length
          text: 'Your brand speaks volumes in the first few seconds a customer is introduced to it, and first impressions can be either positive or negative. We have the expertise to help you make a positive first impression that lasts.',
          // tslint:disable-next-line: max-line-length
          text2: 'We can help you find the right solution whether you are an established company looking to stay ahead of the competition or a new business eyeing the top.',
        },
        {
          src: 'Innovation',
          alt: 'Innovation',
          header: 'Experience',
          // tslint:disable-next-line: max-line-length
          text: 'If your customers are not having delightful experiences, you are not engaging with them correctly.',
          // tslint:disable-next-line: max-line-length
          text2: 'Through our human-centered design approach and our innovative process, we can evaluate what you are providing to your customers and identify what your customers are expecting. Then we can help you create those experiences that will build lasting relationships.',
        },
        {
          src: 'Creative',
          alt: 'Creative Thinking',
          header: 'Marketing',
          // tslint:disable-next-line: max-line-length
          text: 'We leverage insights, customer understanding, and experience to define what marketing plans should be utilized and how you enable them to target your customers.'
        }
      ]
    }
  ];

  public constructor() { }

  public getOfferings(): OfferingSection[] {
    return this.offerings;
  }

}
