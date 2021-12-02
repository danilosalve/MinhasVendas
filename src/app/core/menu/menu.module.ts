import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [SharedModule],
  exports: [MenuComponent],
})
export class MenuModule {}
