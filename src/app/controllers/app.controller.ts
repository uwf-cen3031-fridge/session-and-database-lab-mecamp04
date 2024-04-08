import { Request, Response, Router } from "express";
import path from "path";
import { pino } from 'pino';

export class AppController {
  public router: Router = Router();
  private log: pino.Logger = pino();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter() {
    this.router.get("/login", (req: Request, res: Response)=> {
      res.render("login");
    });
    this.router.post("/login", (req: any, res: Response)=> {
      req.session.user = req.body.username;
      res.redirect("/");
    });
    this.router.get('/signup', (req: any, res: Response) => {
      res.sendFile(path.join('views', 'signup.hbs'));
  });

    this.router.get("/logout", (req: any, res: Response) => {
      req.session.destroy(() => {
        res.redirect("/");
      });
    });

    //Protect the homepage
    this.router.use((req: any, res: Response, next) => {
      if(req.session.user){
        next();
      }
      else {
        res.redirect("/login");
      }
    });
    const enforceLogin= (req: any, res: Response, next: any) => {
      if(req.session.user){
        next();
      }
      else {
        res.redirect("/login");
      }
    }
    this.router.use(enforceLogin);

    // Serve the home page
    this.router.get("/", (req: any, res: Response) => {
      try {
        // Render the "home" template as HTML
        res.render("home", {
          user: req.session.user
        });
      } catch (err) {
        this.log.error(err);
      }
    });
    
  }
}
