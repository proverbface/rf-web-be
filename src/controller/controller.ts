import { Router } from "express";

interface Controller {
  router: Router,
  initRoutes(): any;
}

export default Controller;
