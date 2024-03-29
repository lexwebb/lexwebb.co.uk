import { IconType } from "react-icons/lib";
import {
  RiFileList2Line,
  RiGamepadFill,
  RiHomeLine,
  RiPencilRuler2Line,
} from "react-icons/ri";

interface RouteConfig {
  name: string;
  icon: IconType;
}

export const routes: { [path: string]: RouteConfig } = {
  "/": {
    name: "Home",
    icon: RiHomeLine,
  },
  "/cv": {
    name: "CV",
    icon: RiFileList2Line,
  },
  "/sketches": {
    name: "Sketch",
    icon: RiPencilRuler2Line,
  },
  "/games": {
    name: "Game Dev",
    icon: RiGamepadFill,
  },
};
