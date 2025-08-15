// Shared logos configuration for use across the application
export interface LogoConfig {
  name: string;
  imageUrl: string;
  category?: string;
  guidelinesUrl?: string;
}

// Partner/Integration logos from Wikimedia Commons - REPLACE with OFFICIAL assets later!
export const partnerLogos: LogoConfig[] = [
  {
    name: "OpenAI",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    guidelinesUrl: "https://openai.com/brand/",
  },
  {
    name: "AWS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    guidelinesUrl: "https://aws.amazon.com/architecture/icons/",
  },
  {
    name: "Google Cloud",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    guidelinesUrl: "https://cloud.google.com/terms/logos",
  },
  {
    name: "Microsoft",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    guidelinesUrl: "https://news.microsoft.com/presskits/microsoft-logo/",
  },
  {
    name: "IBM",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    guidelinesUrl: "https://www.ibm.com/design/language/brand/",
  },
  {
    name: "NVIDIA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg",
    guidelinesUrl: "https://www.nvidia.com/en-us/about-nvidia/corporate-brand-guidelines/",
  },
  {
    name: "Salesforce",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    guidelinesUrl: "https://www.salesforce.com/company/news-press/brand-assets/",
  },
  {
    name: "Oracle",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    guidelinesUrl: "https://www.oracle.com/corporate/pressroom/logo-guidelines.html",
  },
  {
    name: "Anthropic",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    guidelinesUrl: "https://www.anthropic.com/",
  },
];

// Integration logos with categories for Product page
export const integrationLogos: LogoConfig[] = [
  {
    name: "Salesforce",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
    category: "CRM",
  },
  {
    name: "Microsoft",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    category: "Productivity",
  },
  {
    name: "AWS",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    category: "Cloud",
  },
  {
    name: "Google Cloud",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    category: "Cloud",
  },
  {
    name: "Oracle",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    category: "Database",
  },
  {
    name: "Anthropic",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg",
    category: "AI",
  },
  {
    name: "Microsoft OneDrive",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Microsoft_Office_OneDrive_%282019%E2%80%93present%29.svg",
    category: "Productivity",
  },
  {
    name: "Microsoft Outlook",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg",
    category: "Productivity",
  },
  {
    name: "Microsoft Excel",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
    category: "Productivity",
  },
  {
    name: "Microsoft Word",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
    category: "Productivity",
  },
  {
    name: "Microsoft PowerPoint",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg",
    category: "Productivity",
  },
  {
    name: "PDF",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg",
    category: "Productivity",
  },
]; 

