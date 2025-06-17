"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, ExternalLink, Search } from "lucide-react"

type VROffice = {
  state: string
  stateName: string
  agency: string
  mainOffice: {
    name: string
    address: string
    phone: string
    email: string
    website: string
  }
  regionalOffices?: {
    name: string
    address: string
    phone: string
    email?: string
  }[]
  specialPrograms: string[]
  vrVendorProgram: boolean
  cbtacAvailable: boolean
}

const vrOffices: VROffice[] = [
  {
    state: "AL",
    stateName: "Alabama",
    agency: "Alabama Department of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "602 S. Lawrence St., Montgomery, AL 36104",
      phone: "(334) 293-7500",
      email: "info@rehab.alabama.gov",
      website: "https://www.rehab.alabama.gov",
    },
    regionalOffices: [
      {
        name: "Birmingham Regional Office",
        address: "3000 Independence Dr., Birmingham, AL 35209",
        phone: "(205) 290-4400",
      },
      {
        name: "Mobile Regional Office",
        address: "2129 E South Blvd., Montgomery, AL 36116",
        phone: "(334) 293-7500",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "AK",
    stateName: "Alaska",
    agency: "Alaska Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "801 W 10th St., Juneau, AK 99801",
      phone: "(907) 465-2814",
      email: "dvr@alaska.gov",
      website: "https://labor.alaska.gov/dvr",
    },
    regionalOffices: [
      {
        name: "Anchorage Office",
        address: "3301 Eagle St., Anchorage, AK 99503",
        phone: "(907) 269-3497",
      },
      {
        name: "Fairbanks Office",
        address: "675 7th Ave., Fairbanks, AK 99701",
        phone: "(907) 451-2850",
      },
    ],
    specialPrograms: ["Rural Services", "Native American Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "AZ",
    stateName: "Arizona",
    agency: "Arizona Rehabilitation Services Administration",
    mainOffice: {
      name: "State Office",
      address: "1789 W Jefferson St., Phoenix, AZ 85007",
      phone: "(602) 542-3332",
      email: "info@azdes.gov",
      website: "https://des.az.gov/services/disabilities/rehabilitation-services",
    },
    regionalOffices: [
      {
        name: "Phoenix District Office",
        address: "4205 N 7th Ave., Phoenix, AZ 85013",
        phone: "(602) 542-6049",
      },
      {
        name: "Tucson District Office",
        address: "2717 N 4th Ave., Tucson, AZ 85705",
        phone: "(520) 628-6961",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Transition Services"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "AR",
    stateName: "Arkansas",
    agency: "Arkansas Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "26 Corporate Hill Dr., Little Rock, AR 72205",
      phone: "(501) 296-1616",
      email: "dhs.ars@arkansas.gov",
      website: "https://humanservices.arkansas.gov/about-dhs/dds/ars",
    },
    regionalOffices: [
      {
        name: "Northwest Arkansas Office",
        address: "614 E Emma Ave., Springdale, AR 72764",
        phone: "(479) 751-4734",
      },
      {
        name: "Southeast Arkansas Office",
        address: "2 Financial Centre, Little Rock, AR 72201",
        phone: "(501) 296-1669",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "CA",
    stateName: "California",
    agency: "California Department of Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "721 Capitol Mall, Sacramento, CA 95814",
      phone: "(916) 324-1313",
      email: "info@dor.ca.gov",
      website: "https://www.dor.ca.gov",
    },
    regionalOffices: [
      {
        name: "Los Angeles District Office",
        address: "3580 Wilshire Blvd., Los Angeles, CA 90010",
        phone: "(213) 736-6500",
      },
      {
        name: "San Francisco District Office",
        address: "120 Howard St., San Francisco, CA 94105",
        phone: "(415) 904-5849",
      },
      {
        name: "San Diego District Office",
        address: "4575 Ruffin Rd., San Diego, CA 92123",
        phone: "(858) 694-5900",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment", "Transition Services"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "CO",
    stateName: "Colorado",
    agency: "Colorado Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "633 17th St., Denver, CO 80202",
      phone: "(303) 866-4150",
      email: "dvr@state.co.us",
      website: "https://www.colorado.gov/dvr",
    },
    regionalOffices: [
      {
        name: "Denver Metro Office",
        address: "600 Grant St., Denver, CO 80203",
        phone: "(303) 866-4150",
      },
      {
        name: "Colorado Springs Office",
        address: "1575 Garden of the Gods Rd., Colorado Springs, CO 80907",
        phone: "(719) 444-2800",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "CT",
    stateName: "Connecticut",
    agency: "Connecticut Bureau of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "55 Farmington Ave., Hartford, CT 06105",
      phone: "(860) 424-4844",
      email: "brs.dss@ct.gov",
      website: "https://portal.ct.gov/DSS/Services/Disability-Services/Bureau-of-Rehabilitation-Services",
    },
    regionalOffices: [
      {
        name: "New Haven Office",
        address: "1 State St., New Haven, CT 06511",
        phone: "(203) 974-8700",
      },
      {
        name: "Waterbury Office",
        address: "15 Holmes Ave., Waterbury, CT 06710",
        phone: "(203) 596-4020",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "DE",
    stateName: "Delaware",
    agency: "Delaware Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "4425 N Market St., Wilmington, DE 19802",
      phone: "(302) 761-8275",
      email: "dvr@delaware.gov",
      website: "https://www.delawareworks.com/dvr",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "FL",
    stateName: "Florida",
    agency: "Florida Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "4070 Esplanade Way, Tallahassee, FL 32399",
      phone: "(850) 245-3399",
      email: "info@vr.fldoe.org",
      website: "https://www.rehabworks.org",
    },
    regionalOffices: [
      {
        name: "Miami-Dade District Office",
        address: "9890 SW 107th Ave., Miami, FL 33176",
        phone: "(305) 275-1500",
      },
      {
        name: "Tampa District Office",
        address: "1313 Tampa Park Plaza, Tampa, FL 33605",
        phone: "(813) 272-6670",
      },
      {
        name: "Orlando District Office",
        address: "1405 Silver Star Rd., Orlando, FL 32804",
        phone: "(407) 245-0440",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment", "CBTAC Services"],
    vrVendorProgram: true,
    cbtacAvailable: true,
  },
  {
    state: "GA",
    stateName: "Georgia",
    agency: "Georgia Vocational Rehabilitation Agency",
    mainOffice: {
      name: "State Office",
      address: "148 Andrew Young International Blvd NE, Atlanta, GA 30303",
      phone: "(404) 232-1998",
      email: "info@gvra.georgia.gov",
      website: "https://gvra.georgia.gov",
    },
    regionalOffices: [
      {
        name: "Atlanta Regional Office",
        address: "148 Andrew Young International Blvd NE, Atlanta, GA 30303",
        phone: "(404) 232-1998",
      },
      {
        name: "Savannah Regional Office",
        address: "214 State St., Savannah, GA 31401",
        phone: "(912) 356-2226",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "HI",
    stateName: "Hawaii",
    agency: "Hawaii Vocational Rehabilitation Division",
    mainOffice: {
      name: "State Office",
      address: "1390 Miller St., Honolulu, HI 96813",
      phone: "(808) 586-5366",
      email: "vrd@dhs.hawaii.gov",
      website: "https://humanservices.hawaii.gov/vr",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "ID",
    stateName: "Idaho",
    agency: "Idaho Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "650 W State St., Boise, ID 83702",
      phone: "(208) 334-3390",
      email: "info@vr.idaho.gov",
      website: "https://vr.idaho.gov",
    },
    regionalOffices: [
      {
        name: "Boise Regional Office",
        address: "650 W State St., Boise, ID 83702",
        phone: "(208) 334-3390",
      },
      {
        name: "Coeur d'Alene Office",
        address: "1120 Ironwood Dr., Coeur d'Alene, ID 83814",
        phone: "(208) 769-1506",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "IL",
    stateName: "Illinois",
    agency: "Illinois Division of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "100 S Grand Ave E, Springfield, IL 62762",
      phone: "(217) 782-2093",
      email: "dhs.drs@illinois.gov",
      website: "https://www.dhs.state.il.us/page.aspx?item=29737",
    },
    regionalOffices: [
      {
        name: "Chicago Regional Office",
        address: "160 N LaSalle St., Chicago, IL 60601",
        phone: "(312) 793-2929",
      },
      {
        name: "Rockford Regional Office",
        address: "4302 N Main St., Rockford, IL 61103",
        phone: "(815) 987-7200",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "IN",
    stateName: "Indiana",
    agency: "Indiana Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "402 W Washington St., Indianapolis, IN 46204",
      phone: "(317) 232-1319",
      email: "vrs@fssa.in.gov",
      website: "https://www.in.gov/fssa/ddrs/vocational-rehabilitation-services",
    },
    regionalOffices: [
      {
        name: "Indianapolis District Office",
        address: "402 W Washington St., Indianapolis, IN 46204",
        phone: "(317) 232-1319",
      },
      {
        name: "Fort Wayne District Office",
        address: "3840 Calhoun St., Fort Wayne, IN 46807",
        phone: "(260) 482-4462",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "IA",
    stateName: "Iowa",
    agency: "Iowa Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "510 E 12th St., Des Moines, IA 50319",
      phone: "(515) 281-4211",
      email: "ivrs@iowa.gov",
      website: "https://ivrs.iowa.gov",
    },
    regionalOffices: [
      {
        name: "Des Moines District Office",
        address: "510 E 12th St., Des Moines, IA 50319",
        phone: "(515) 281-4211",
      },
      {
        name: "Cedar Rapids District Office",
        address: "3850 Merle Hay Rd., Des Moines, IA 50310",
        phone: "(515) 281-7999",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "KS",
    stateName: "Kansas",
    agency: "Kansas Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "915 SW Harrison St., Topeka, KS 66612",
      phone: "(785) 368-7471",
      email: "rehab@dcf.ks.gov",
      website: "https://www.dcf.ks.gov/services/RS",
    },
    regionalOffices: [
      {
        name: "Wichita District Office",
        address: "3745 S Seneca St., Wichita, KS 67217",
        phone: "(316) 337-7000",
      },
      {
        name: "Kansas City District Office",
        address: "2947 SW Wanamaker Dr., Topeka, KS 66614",
        phone: "(785) 368-7471",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "KY",
    stateName: "Kentucky",
    agency: "Kentucky Office of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "209 St Clair St., Frankfort, KY 40601",
      phone: "(502) 564-4440",
      email: "ovr.mail@ky.gov",
      website: "https://ovr.ky.gov",
    },
    regionalOffices: [
      {
        name: "Louisville District Office",
        address: "600 W Cedar St., Louisville, KY 40202",
        phone: "(502) 595-4173",
      },
      {
        name: "Lexington District Office",
        address: "1900 Capital Plaza Tower, Frankfort, KY 40601",
        phone: "(502) 564-4440",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "LA",
    stateName: "Louisiana",
    agency: "Louisiana Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "8225 Florida Blvd., Baton Rouge, LA 70806",
      phone: "(225) 219-2225",
      email: "lrs@la.gov",
      website: "https://www.laworks.net/LRS/LRS_Main.asp",
    },
    regionalOffices: [
      {
        name: "New Orleans District Office",
        address: "2250 Hickory Ave., Harahan, LA 70123",
        phone: "(504) 736-7100",
      },
      {
        name: "Shreveport District Office",
        address: "1525 Fairfield Ave., Shreveport, LA 71101",
        phone: "(318) 676-7100",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "ME",
    stateName: "Maine",
    agency: "Maine Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "150 State House Station, Augusta, ME 04333",
      phone: "(207) 623-6799",
      email: "dvr@maine.gov",
      website: "https://www.maine.gov/rehab/dvr",
    },
    regionalOffices: [
      {
        name: "Portland District Office",
        address: "35 Anthony Ave., Augusta, ME 04330",
        phone: "(207) 623-6799",
      },
      {
        name: "Bangor District Office",
        address: "45 Commerce Dr., Augusta, ME 04330",
        phone: "(207) 624-5950",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MD",
    stateName: "Maryland",
    agency: "Maryland Division of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "2301 Argonne Dr., Baltimore, MD 21218",
      phone: "(410) 554-9385",
      email: "dors@maryland.gov",
      website: "https://www.dors.maryland.gov",
    },
    regionalOffices: [
      {
        name: "Baltimore District Office",
        address: "2301 Argonne Dr., Baltimore, MD 21218",
        phone: "(410) 554-9385",
      },
      {
        name: "Rockville District Office",
        address: "16 Francis St., Annapolis, MD 21401",
        phone: "(410) 767-5160",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MA",
    stateName: "Massachusetts",
    agency: "Massachusetts Rehabilitation Commission",
    mainOffice: {
      name: "State Office",
      address: "600 Washington St., Boston, MA 02111",
      phone: "(617) 204-3600",
      email: "info@mrc.state.ma.us",
      website: "https://www.mass.gov/orgs/massachusetts-rehabilitation-commission",
    },
    regionalOffices: [
      {
        name: "Boston Area Office",
        address: "600 Washington St., Boston, MA 02111",
        phone: "(617) 204-3600",
      },
      {
        name: "Springfield Area Office",
        address: "1 Federal St., Springfield, MA 01105",
        phone: "(413) 452-3186",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MI",
    stateName: "Michigan",
    agency: "Michigan Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "201 N Washington Square, Lansing, MI 48913",
      phone: "(517) 373-3390",
      email: "mdhhs-mrs@michigan.gov",
      website: "https://www.michigan.gov/mdhhs/assistance-programs/disability-services/mrs",
    },
    regionalOffices: [
      {
        name: "Detroit District Office",
        address: "3024 W Grand Blvd., Detroit, MI 48202",
        phone: "(313) 456-4200",
      },
      {
        name: "Grand Rapids District Office",
        address: "3215 Eaglecrest Dr NE, Grand Rapids, MI 49525",
        phone: "(616) 356-0040",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MN",
    stateName: "Minnesota",
    agency: "Minnesota Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "332 Minnesota St., St. Paul, MN 55101",
      phone: "(651) 259-7366",
      email: "vrs@state.mn.us",
      website: "https://mn.gov/deed/job-seekers/disabilities",
    },
    regionalOffices: [
      {
        name: "Minneapolis District Office",
        address: "332 Minnesota St., St. Paul, MN 55101",
        phone: "(651) 259-7366",
      },
      {
        name: "Duluth District Office",
        address: "1st National Bank Bldg., Duluth, MN 55802",
        phone: "(218) 302-8400",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MS",
    stateName: "Mississippi",
    agency: "Mississippi Department of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "1281 Highway 51, Madison, MS 39110",
      phone: "(601) 853-5100",
      email: "info@mdrs.ms.gov",
      website: "https://www.mdrs.ms.gov",
    },
    regionalOffices: [
      {
        name: "Jackson District Office",
        address: "1281 Highway 51, Madison, MS 39110",
        phone: "(601) 853-5100",
      },
      {
        name: "Hattiesburg District Office",
        address: "1000 Jerry St., Hattiesburg, MS 39401",
        phone: "(601) 582-2273",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MO",
    stateName: "Missouri",
    agency: "Missouri Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "3024 Dupont Circle, Jefferson City, MO 65109",
      phone: "(573) 751-3251",
      email: "info@vr.dese.mo.gov",
      website: "https://dese.mo.gov/adult-learning-rehabilitation-services/vocational-rehabilitation",
    },
    regionalOffices: [
      {
        name: "Kansas City District Office",
        address: "3024 Dupont Circle, Jefferson City, MO 65109",
        phone: "(573) 751-3251",
      },
      {
        name: "St. Louis District Office",
        address: "4040 Seven Hills Dr., Florissant, MO 63033",
        phone: "(314) 877-2045",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "MT",
    stateName: "Montana",
    agency: "Montana Vocational Rehabilitation Program",
    mainOffice: {
      name: "State Office",
      address: "111 N Sanders St., Helena, MT 59604",
      phone: "(406) 444-2590",
      email: "dphhs@mt.gov",
      website: "https://dphhs.mt.gov/detd/vocrehab",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NE",
    stateName: "Nebraska",
    agency: "Nebraska Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "4600 Valley Rd., Lincoln, NE 68510",
      phone: "(402) 471-3644",
      email: "dhhs.vocrehab@nebraska.gov",
      website: "https://dhhs.ne.gov/Pages/Vocational-Rehabilitation.aspx",
    },
    regionalOffices: [
      {
        name: "Omaha District Office",
        address: "4600 Valley Rd., Lincoln, NE 68510",
        phone: "(402) 471-3644",
      },
      {
        name: "North Platte District Office",
        address: "3180 W Faidley Ave., Grand Island, NE 68803",
        phone: "(308) 385-6390",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NV",
    stateName: "Nevada",
    agency: "Nevada Bureau of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "3016 W Charleston Blvd., Las Vegas, NV 89102",
      phone: "(702) 486-5230",
      email: "bvr@detr.nv.gov",
      website: "https://detr.nv.gov/Page/Bureau_of_Vocational_Rehabilitation_(BVR)",
    },
    regionalOffices: [
      {
        name: "Las Vegas District Office",
        address: "3016 W Charleston Blvd., Las Vegas, NV 89102",
        phone: "(702) 486-5230",
      },
      {
        name: "Reno District Office",
        address: "1325 Corporate Blvd., Reno, NV 89502",
        phone: "(775) 688-1500",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NH",
    stateName: "New Hampshire",
    agency: "New Hampshire Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "21 S Fruit St., Concord, NH 03301",
      phone: "(603) 271-3471",
      email: "vocrehab@dhhs.nh.gov",
      website: "https://www.dhhs.nh.gov/programs-services/disability-services/vocational-rehabilitation",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NJ",
    stateName: "New Jersey",
    agency: "New Jersey Division of Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "135 E State St., Trenton, NJ 08625",
      phone: "(609) 292-5987",
      email: "dvrs@dol.nj.gov",
      website: "https://www.nj.gov/labor/career-services/vocational-rehabilitation",
    },
    regionalOffices: [
      {
        name: "Newark District Office",
        address: "135 E State St., Trenton, NJ 08625",
        phone: "(609) 292-5987",
      },
      {
        name: "Camden District Office",
        address: "2 Executive Campus, Cherry Hill, NJ 08002",
        phone: "(856) 968-7000",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NM",
    stateName: "New Mexico",
    agency: "New Mexico Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "435 St Michaels Dr., Santa Fe, NM 87505",
      phone: "(505) 954-8500",
      email: "dvr@state.nm.us",
      website: "https://www.dvr.state.nm.us",
    },
    regionalOffices: [
      {
        name: "Albuquerque District Office",
        address: "435 St Michaels Dr., Santa Fe, NM 87505",
        phone: "(505) 954-8500",
      },
      {
        name: "Las Cruces District Office",
        address: "2905 Rodeo Park Dr E, Santa Fe, NM 87505",
        phone: "(505) 476-4479",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NY",
    stateName: "New York",
    agency: "New York State Office of Vocational and Educational Services for Individuals with Disabilities",
    mainOffice: {
      name: "State Office",
      address: "89 Washington Ave., Albany, NY 12234",
      phone: "(518) 474-2714",
      email: "vesid@nysed.gov",
      website: "https://www.acces.nysed.gov/vr",
    },
    regionalOffices: [
      {
        name: "New York City District Office",
        address: "116 W 32nd St., New York, NY 10001",
        phone: "(212) 630-2300",
      },
      {
        name: "Buffalo District Office",
        address: "295 Main St., Buffalo, NY 14203",
        phone: "(716) 847-3309",
      },
      {
        name: "Syracuse District Office",
        address: "333 E Washington St., Syracuse, NY 13202",
        phone: "(315) 428-4021",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "NC",
    stateName: "North Carolina",
    agency: "North Carolina Division of Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "2801 Mail Service Center, Raleigh, NC 27699",
      phone: "(919) 855-3500",
      email: "dvrs@dhhs.nc.gov",
      website: "https://www.ncdhhs.gov/divisions/vocational-rehabilitation-services",
    },
    regionalOffices: [
      {
        name: "Charlotte District Office",
        address: "2801 Mail Service Center, Raleigh, NC 27699",
        phone: "(919) 855-3500",
      },
      {
        name: "Greensboro District Office",
        address: "2514 Mail Service Center, Raleigh, NC 27699",
        phone: "(919) 855-3576",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "ND",
    stateName: "North Dakota",
    agency: "North Dakota Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "1237 W Divide Ave., Bismarck, ND 58501",
      phone: "(701) 328-8950",
      email: "dhseo@nd.gov",
      website: "https://www.nd.gov/dhs/services/disabilities/vocrehab",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "OH",
    stateName: "Ohio",
    agency: "Ohio Opportunities for Ohioans with Disabilities",
    mainOffice: {
      name: "State Office",
      address: "400 E Campus View Blvd., Columbus, OH 43235",
      phone: "(614) 438-1200",
      email: "ood@ood.ohio.gov",
      website: "https://ood.ohio.gov",
    },
    regionalOffices: [
      {
        name: "Cleveland District Office",
        address: "615 W Superior Ave., Cleveland, OH 44113",
        phone: "(216) 787-0200",
      },
      {
        name: "Cincinnati District Office",
        address: "36 E 7th St., Cincinnati, OH 45202",
        phone: "(513) 946-2300",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "OK",
    stateName: "Oklahoma",
    agency: "Oklahoma Department of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "3535 NW 58th St., Oklahoma City, OK 73112",
      phone: "(405) 951-3400",
      email: "info@okdrs.gov",
      website: "https://www.okdrs.gov",
    },
    regionalOffices: [
      {
        name: "Oklahoma City District Office",
        address: "3535 NW 58th St., Oklahoma City, OK 73112",
        phone: "(405) 951-3400",
      },
      {
        name: "Tulsa District Office",
        address: "1845 S Yale Ave., Tulsa, OK 74112",
        phone: "(918) 794-1200",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "OR",
    stateName: "Oregon",
    agency: "Oregon Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "3945 Center St NE, Salem, OR 97301",
      phone: "(503) 945-5880",
      email: "vr.info@state.or.us",
      website: "https://www.oregon.gov/dhs/EMPLOYMENT/VR",
    },
    regionalOffices: [
      {
        name: "Portland District Office",
        address: "3945 Center St NE, Salem, OR 97301",
        phone: "(503) 945-5880",
      },
      {
        name: "Eugene District Office",
        address: "1895 Mission St SE, Salem, OR 97302",
        phone: "(503) 378-2046",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "PA",
    stateName: "Pennsylvania",
    agency: "Pennsylvania Office of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "1521 N 6th St., Harrisburg, PA 17102",
      phone: "(717) 787-5244",
      email: "ovr@pa.gov",
      website: "https://www.dli.pa.gov/Individuals/Disability-Services",
    },
    regionalOffices: [
      {
        name: "Philadelphia District Office",
        address: "444 N 3rd St., Philadelphia, PA 19123",
        phone: "(215) 560-5800",
      },
      {
        name: "Pittsburgh District Office",
        address: "300 Liberty Ave., Pittsburgh, PA 15222",
        phone: "(412) 565-5758",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "RI",
    stateName: "Rhode Island",
    agency: "Rhode Island Office of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "40 Fountain St., Providence, RI 02903",
      phone: "(401) 421-7005",
      email: "ors@ors.ri.gov",
      website: "https://www.ors.ri.gov",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "SC",
    stateName: "South Carolina",
    agency: "South Carolina Vocational Rehabilitation Department",
    mainOffice: {
      name: "State Office",
      address: "1410 Boston Ave., West Columbia, SC 29170",
      phone: "(803) 896-6500",
      email: "info@scvrd.state.sc.us",
      website: "https://www.scvrd.net",
    },
    regionalOffices: [
      {
        name: "Charleston Area Office",
        address: "4360 Dorchester Rd., North Charleston, SC 29405",
        phone: "(843) 740-1600",
      },
      {
        name: "Greenville Area Office",
        address: "105 Parkins Mill Rd., Greenville, SC 29607",
        phone: "(864) 297-3066",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "SD",
    stateName: "South Dakota",
    agency: "South Dakota Division of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "3800 E Highway 34, Pierre, SD 57501",
      phone: "(605) 773-3195",
      email: "infodrs@state.sd.us",
      website: "https://dhs.sd.gov/drs",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "TN",
    stateName: "Tennessee",
    agency: "Tennessee Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "400 Deaderick St., Nashville, TN 37243",
      phone: "(615) 313-4700",
      email: "vr.services@tn.gov",
      website: "https://www.tn.gov/humanservices/disability-services/vocational-rehabilitation-services.html",
    },
    regionalOffices: [
      {
        name: "Memphis District Office",
        address: "400 Deaderick St., Nashville, TN 37243",
        phone: "(615) 313-4700",
      },
      {
        name: "Knoxville District Office",
        address: "706 Walnut St., Knoxville, TN 37902",
        phone: "(865) 594-6200",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "TX",
    stateName: "Texas",
    agency: "Texas Workforce Solutions - Vocational Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "101 E 15th St., Austin, TX 78778",
      phone: "(800) 628-5115",
      email: "vr.services@twc.texas.gov",
      website: "https://twc.texas.gov/jobseekers/vocational-rehabilitation-services",
    },
    regionalOffices: [
      {
        name: "Houston District Office",
        address: "9001 Airport Blvd., Houston, TX 77061",
        phone: "(713) 643-6000",
      },
      {
        name: "Dallas District Office",
        address: "1100 Commerce St., Dallas, TX 75242",
        phone: "(214) 290-1000",
      },
      {
        name: "San Antonio District Office",
        address: "615 NW Loop 410, San Antonio, TX 78216",
        phone: "(210) 340-1060",
      },
      {
        name: "Austin District Office",
        address: "9001 IH-35 North, Austin, TX 78753",
        phone: "(512) 491-4000",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment", "CBTAC Services"],
    vrVendorProgram: true,
    cbtacAvailable: true,
  },
  {
    state: "UT",
    stateName: "Utah",
    agency: "Utah State Office of Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "195 N 1950 W, Salt Lake City, UT 84116",
      phone: "(801) 538-7530",
      email: "usor@utah.gov",
      website: "https://jobs.utah.gov/usor",
    },
    regionalOffices: [
      {
        name: "Salt Lake City District Office",
        address: "195 N 1950 W, Salt Lake City, UT 84116",
        phone: "(801) 538-7530",
      },
      {
        name: "Ogden District Office",
        address: "1385 S State St., Salt Lake City, UT 84115",
        phone: "(801) 468-0047",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "VT",
    stateName: "Vermont",
    agency: "Vermont Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "103 S Main St., Waterbury, VT 05671",
      phone: "(802) 241-2186",
      email: "vr@vermont.gov",
      website: "https://vocrehab.vermont.gov",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "VA",
    stateName: "Virginia",
    agency: "Virginia Department for Aging and Rehabilitative Services",
    mainOffice: {
      name: "State Office",
      address: "8004 Franklin Farms Dr., Richmond, VA 23229",
      phone: "(804) 662-7000",
      email: "dars@dars.virginia.gov",
      website: "https://www.vadars.org",
    },
    regionalOffices: [
      {
        name: "Richmond District Office",
        address: "8004 Franklin Farms Dr., Richmond, VA 23229",
        phone: "(804) 662-7000",
      },
      {
        name: "Norfolk District Office",
        address: "5850 Harbour View Blvd., Suffolk, VA 23435",
        phone: "(757) 518-4000",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "WA",
    stateName: "Washington",
    agency: "Washington Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "150 Israel Rd SE, Tumwater, WA 98501",
      phone: "(360) 725-3636",
      email: "dvr@dshs.wa.gov",
      website: "https://www.dshs.wa.gov/dvr",
    },
    regionalOffices: [
      {
        name: "Seattle District Office",
        address: "150 Israel Rd SE, Tumwater, WA 98501",
        phone: "(360) 725-3636",
      },
      {
        name: "Spokane District Office",
        address: "1063 W Gardner Ave., Spokane, WA 99201",
        phone: "(509) 329-2942",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "WV",
    stateName: "West Virginia",
    agency: "West Virginia Division of Rehabilitation Services",
    mainOffice: {
      name: "State Office",
      address: "107 Capitol St., Charleston, WV 25301",
      phone: "(304) 356-2060",
      email: "drs@wv.gov",
      website: "https://drs.wv.gov",
    },
    regionalOffices: [
      {
        name: "Charleston District Office",
        address: "107 Capitol St., Charleston, WV 25301",
        phone: "(304) 356-2060",
      },
      {
        name: "Morgantown District Office",
        address: "1 Players Club Dr., Charleston, WV 25311",
        phone: "(304) 558-0304",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "WI",
    stateName: "Wisconsin",
    agency: "Wisconsin Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "201 E Washington Ave., Madison, WI 53707",
      phone: "(608) 261-0050",
      email: "dvr@dwd.wisconsin.gov",
      website: "https://dwd.wisconsin.gov/dvr",
    },
    regionalOffices: [
      {
        name: "Milwaukee District Office",
        address: "818 W Badger Rd., Madison, WI 53713",
        phone: "(608) 243-5600",
      },
      {
        name: "Green Bay District Office",
        address: "200 N Jefferson St., Green Bay, WI 54301",
        phone: "(920) 448-5267",
      },
    ],
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
  {
    state: "WY",
    stateName: "Wyoming",
    agency: "Wyoming Division of Vocational Rehabilitation",
    mainOffice: {
      name: "State Office",
      address: "1100 Herschler Bldg., Cheyenne, WY 82002",
      phone: "(307) 777-7389",
      email: "dvr@wyo.gov",
      website: "https://www.wyomingworkforce.org/workers/vocational-rehabilitation",
    },
    specialPrograms: ["Deaf Services", "Blind Services", "Self-Employment"],
    vrVendorProgram: false,
    cbtacAvailable: true,
  },
]

export default function VRContacts() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const filteredOffices = vrOffices.filter((office) => {
    const matchesSearch =
      office.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.specialPrograms.some((program) => program.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const handleStateSelect = (office: VROffice) => {
    setSelectedState(selectedState === office.state ? null : office.state)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by state, agency, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("")
            setSelectedState(null)
          }}
        >
          Clear
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredOffices.map((office) => (
          <Card key={office.state} className="transition-all hover:shadow-md">
            <CardHeader className="cursor-pointer" onClick={() => handleStateSelect(office)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{office.stateName}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    {office.vrVendorProgram && <Badge className="bg-blue-600 text-white">VR Vendor Program</Badge>}
                    {office.cbtacAvailable && <Badge variant="secondary">CBTAC Available</Badge>}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  {selectedState === office.state ? "Hide Details" : "Show Details"}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{office.agency}</p>
            </CardHeader>

            {selectedState === office.state && (
              <CardContent className="space-y-6">
                {/* Main Office */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Main Office</h4>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{office.mainOffice.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{office.mainOffice.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a
                        href={`tel:${office.mainOffice.phone}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {office.mainOffice.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${office.mainOffice.email}`}
                        className="text-sm hover:text-primary transition-colors"
                      >
                        {office.mainOffice.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                      <a
                        href={office.mainOffice.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-primary transition-colors"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>

                {/* Regional Offices */}
                {office.regionalOffices && office.regionalOffices.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Regional Offices</h4>
                    <div className="grid gap-3">
                      {office.regionalOffices.map((regional, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-sm">{regional.name}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{regional.address}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-gray-500" />
                            <a href={`tel:${regional.phone}`} className="text-xs hover:text-primary transition-colors">
                              {regional.phone}
                            </a>
                          </div>

                          {regional.email && (
                            <div className="flex items-center gap-2 mt-1">
                              <Mail className="h-3 w-3 text-gray-500" />
                              <a
                                href={`mailto:${regional.email}`}
                                className="text-xs hover:text-primary transition-colors"
                              >
                                {regional.email}
                              </a>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Programs */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Special Programs & Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {office.specialPrograms.map((program, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <Button size="sm" asChild>
                    <a href={`tel:${office.mainOffice.phone}`}>
                      <Phone className="h-3 w-3 mr-1" />
                      Call Main Office
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`mailto:${office.mainOffice.email}`}>
                      <Mail className="h-3 w-3 mr-1" />
                      Send Email
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={office.mainOffice.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredOffices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No VR offices found matching your search criteria.</p>
            <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
