import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export function run(): Promise<void> {
  return bootstrapApplication(AppComponent, appConfig)
    .then(() => {})
    .catch(err => console.error(err));
}

export default run;
