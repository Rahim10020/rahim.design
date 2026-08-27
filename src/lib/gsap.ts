import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// import des plugins dont j'aurais besoin
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// enregistre les plugins une seule fois pour toute l'application
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);
