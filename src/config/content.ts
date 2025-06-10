// Easy Content Management Configuration
// Edit this file to update all the content on your business card

import { Globe, Instagram, Phone, Mail, Building2, MapPin, Facebook, Linkedin, } from 'lucide-react';

export interface ContactInfo {
  // Personal Information
  name: string;
  role: string;
  phone: string;
  email: string;
  
  // Company Information
  company: string;
  location: string;
  mainOffice: string;
  customerService: string;
  
  // Websites (you can add more by adding objects to this array)
  websites: Array<{
    url: string;
    display: string;
    icon: any; // Lucide React icon component
  }>;
  
  // Social Media (you can add more platforms by adding objects to this array)
  socials: Array<{
    platform: string;
    handle: string;
    display: string;
    url: string;
    icon: any; // Lucide React icon component
  }>;
}

// 🎯 EDIT THIS SECTION TO UPDATE YOUR BUSINESS CARD CONTENT
export const contactInfo: ContactInfo = {
  // === PERSONAL INFORMATION ===
  name: "Kareem Khalid Al Said",
  role: "Co-Founder", 
  phone: "+968 9417 6872",
  email: "kareemalsaid@finlandeyecenter.com",
  
  // === COMPANY INFORMATION ===
  company: "Finland Medical Center",
  location: "Location",
  mainOffice: "+968 2456 4488",
  customerService: "+968 2456 1132",
  
  // === WEBSITES ===
  // To add more websites, just add another object like this:
  // { url: "www.example.com", display: "Example Site", icon: Globe }
  websites: [
    {
      url: "www.finlandeyecenter.com",
      display: "Eye Center",
      icon: Globe
    }
    {
      url: "www.finlandeyecenter.com",
      display: "Linkedin",
      icon: Linkedin
    }
  ],
  
  // === SOCIAL MEDIA ===
  // To add more social platforms, just add another object like this:
  // { platform: "facebook", handle: "@yourpage", display: "Facebook", url: "https://facebook.com/yourpage", icon: Facebook }
  socials: [
    {
      platform: "instagram", 
      handle: "Finland Eye Center",
      display: "Instagram",
      url: "https://www.instagram.com/finlanddental",
    },
    {
      platform: "instagram", 
      handle: "Finland Dental Center",
      display: "Instagram",
      url: "https://www.instagram.com/povramos",
    },
    {
      platform: "linkedin", 
      handle: "Omar Al-said",
      display: "Linkedin",
      url: "https://www.linkedin.com/company/finland-eye-center",
      icon: Linkedin
    }
  ]
};

// UI Text Labels (you can also edit these if needed)
export const labels = {
  personal: "Personal",
  company: "Finland Medical Center",
  directLine: "Direct Line",
  workEmail: "Work Email", 
  website: "Website",
  mainOffice: "Main Office",
  customerService: "Customer Service",
  location: "Location",
  followUs: "Social Media",
  saveContact: "Save Contact"
};