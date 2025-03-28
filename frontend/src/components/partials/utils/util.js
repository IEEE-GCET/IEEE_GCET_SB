import {
  Bolt,
  CalendarClock,
  CalendarCheck,
  CalendarArrowDownIcon,
} from "lucide-react";
import { ShoppingBag } from "lucide-react";
import { BellDot } from "lucide-react";
import { BookOpenText } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { CircleHelp } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { Users } from "lucide-react";
import { Lock } from "lucide-react";
import { Dessert } from "lucide-react";
import { ShieldPlus } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Images } from "lucide-react";
import { Figma } from "lucide-react";
import { Play } from "lucide-react";
import { MapPin } from "lucide-react";
import { Database } from "lucide-react";
import { PanelsTopLeft } from "lucide-react";
import { PanelTop } from "lucide-react";
import { Link } from "react-router-dom";

export const Menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Societies",
    path: "/society",
    subMenuHeading: ["Society", "Council"],
    subMenu: [
      {
        name: "Enterprise",
        desc: "Overview",
        icon: ShieldPlus,
        type: "Society",
        path: "/enterprise",
      },
      {
        name: "Collaboration",
        desc: "Design together",
        icon: Users,
        type: "Society",
        path: "/collaboration",
      },
      {
        name: "Customers",
        desc: "Stories",
        icon: Dessert,
        type: "Society",
        path: "/customers",
      },
      {
        name: "Security",
        desc: "Your site secured",
        icon: Lock,
        type: "Council",
        path: "/security",
      },
    ],
    gridCols: 1,
  },
  {
    name: "Events",
    path: "/event",
    subMenuHeading: ["Events", "News"],
    subMenu: [
      {
        name: "Upcoming",
        desc: "Events",
        icon: CalendarClock,
        type: "Events",
        path: "/upcoming",
      },
      {
        name: "Past",
        desc: "Events",
        icon: CalendarCheck,
        type: "Events",
        path: "/past",
      },
      {
        name: "My Events",
        desc: "Saved and Uploaded Events",
        icon: CalendarArrowDownIcon,
        type: "Events",
        path: "/myEvents",
      },
    ],
    gridCols: 1,
  },

  // {
  //   name: "Support",
  //   path: "/support",
  //   subMenuHeading: ["Support", "Help"],
  //   subMenu: [
  //     {
  //       name: "Help",
  //       desc: "Center",
  //       icon: CircleHelp,
  //       type: "Help",
  //       path: "/help",
  //     },
  //     {
  //       name: "Community",
  //       desc: "Project help",
  //       icon: MessageCircle,
  //       type: "Support",
  //       path: "/community",
  //     },
  //     {
  //       name: "Emergency",
  //       desc: "Urgent issues",
  //       icon: TriangleAlert,
  //       type: "Support",
  //       path: "/emergency",
  //     },
  //   ],
  //   gridCols: 1,
  // },
  {
    name: "Contact",
  },
];
